import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '../components/login/reset-password/reset-password.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
