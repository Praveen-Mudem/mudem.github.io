import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDashboardComponent } from './profile-dashboard.component';

const routes: Routes = [
  { path: '', component: ProfileDashboardComponent }
];

@NgModule({
  declarations: [ProfileDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ProfileDashboardModule { }
