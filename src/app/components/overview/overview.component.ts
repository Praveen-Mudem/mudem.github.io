import { Component } from '@angular/core';
import { UserInfo } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  user: UserInfo | null = null;

  constructor(private router: Router) {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
