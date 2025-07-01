import { Component } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html'
})
export class ProfileDashboardComponent {
  constructor(public commonService: CommonService) {}

  get selectedProfileName(): string | null {
    return this.commonService.selectedProfileName;
  }
}