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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private profileService: ProfileService
  ) {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      this.userName = user.name || 'User';
      this.userPhoto = user.photo || 'assets/images/default-avatar.png';
    } else {
      this.userName = 'User';
      this.userPhoto = 'assets/images/default-avatar.png';
    }
  }

  ngOnInit() {
    this.profileService.getProfileList().subscribe(result => {
      console.log('Profile List API result:', result);
    });
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
