import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ProfileService } from '../../service/profile.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  userPhoto = '';
  userName = '';
  profileList: any[] = [];
  loggedInProfileId: string | null = LoginService.getLoggedInProfileId();
  selectedProfileId: string | null = LoginService.getLoggedInProfileId();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private profileService: ProfileService,
    private commonService: CommonService
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
    this.profileService.getProfileList().subscribe(); 
    this.profileService.profileList$.subscribe(list => {
      this.profileList = list;
      if (!this.selectedProfileId && this.loggedInProfileId && list.some(p => String(p.ProfileId) === this.loggedInProfileId)) {
        this.selectedProfileId = this.loggedInProfileId;
      }
    });
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
      this.commonService.setSelectedProfileName = selectedProfile.Name;
      this.commonService.selectedProfileId = selectedProfile.ProfileId;
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
