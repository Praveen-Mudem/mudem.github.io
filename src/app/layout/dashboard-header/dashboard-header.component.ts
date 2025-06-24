import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  userPhoto = '';
  userName = '';
  profileList: any[] = [];
  selectedProfileId: number | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private profileService: ProfileService
  ) {
    const userInfo = localStorage.getItem('userInfo');
    // debugger
    if (userInfo) {
      const user = JSON.parse(userInfo);
      this.userName = user.UserName;
      this.selectedProfileId = user.ProfileId || null;
      this.userPhoto = user.photo || 'https://i.pravatar.cc/100?img=1';
    } else {
      this.userPhoto = 'https://i.pravatar.cc/100?img=1';
    }
  }

  ngOnInit() {
    this.profileService.getProfileList().subscribe(); // fetch and cache
    this.profileService.profileList$.subscribe(list => {
      this.profileList = list;
    });
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  onNotificationClick() {
    this.router.navigate(['/notification']);
  }
}
