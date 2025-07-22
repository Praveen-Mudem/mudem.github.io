import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { ProfileService } from '../../service/profile.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {
  userPhoto = '';
  userName = '';
  profileList: any[] = [];
  loggedInProfileId: string | null = LoginService.getLoggedInProfileId();
  selectedProfileId: string | null = LoginService.getLoggedInProfileId();
  private subscription: Subscription = new Subscription();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private profileService: ProfileService,
    public commonService: CommonService
  ) {
    const userInfo = localStorage.getItem('userInfo');
    // debugger
    if (userInfo) {
      const user = JSON.parse(userInfo);
      this.userName = user.UserName;
      this.loggedInProfileId = user.ProfileId || null;
      this.userPhoto = user.photo || 'https://i.pravatar.cc/100?img=1';
    } else {
      this.userPhoto = 'https://i.pravatar.cc/100?img=1';
    }
  }

  ngOnInit() {
    // Only load profile list if it's empty
    const profileSub = this.profileService.profileList$.subscribe(list => {
      this.profileList = list;
      if (!this.selectedProfileId && this.loggedInProfileId && list.some(p => String(p.ProfileId) === this.loggedInProfileId)) {
        this.selectedProfileId = this.loggedInProfileId;
      }
      
      // Only fetch from API if we don't have any profiles yet
      if (list.length === 0) {
        this.profileService.getProfileList().subscribe();
      }
    });
    this.subscription.add(profileSub);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  onNotificationClick() {
    this.router.navigate(['/notification']);
  }

  onProfileChange() {
    const selectedProfile = this.profileList.find(p => String(p.ProfileId) === this.selectedProfileId);
    if (selectedProfile) {
      this.commonService.setSelectedProfileName(selectedProfile.Name, selectedProfile.ProfileId);
    }
    if (this.loggedInProfileId && this.loggedInProfileId === this.selectedProfileId) {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(
        ['/profile-dashboard', this.selectedProfileId],
      );
    }
  }
}
