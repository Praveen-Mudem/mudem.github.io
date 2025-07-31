import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordRequest, AuthResponse } from '../../../model/auth.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid) {
      this.isLoading = true;
      const payload: ResetPasswordRequest = {
        currentPassword: this.resetPasswordForm.value.currentPassword,
        newPassword: this.resetPasswordForm.value.newPassword,
        confirmPassword: this.resetPasswordForm.value.confirmPassword
      };
      this.loginService.resetPasswordInfo(payload.currentPassword!, payload.newPassword, payload.confirmPassword).subscribe({
        next: (response: AuthResponse) => {
          this.isLoading = false;
          if (response.IsSaved) {
            this.toastr.success(response.Message || response.SuccessMessage || 'Password reset successfully');
            this.resetPasswordForm.reset();
            this.goBack();
          } else {
            this.toastr.error(response.ErrorMessage || 'Failed to reset password');
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error(error?.error?.ErrorMessage || 'Failed to reset password. Please check your current password and try again.');
        }
      });
    }
  }

  goBack() {
    // Navigate back to profile or previous page
    this.router.navigate(['/profile']);
  }

  onCancel() {
    this.resetPasswordForm.reset();
    this.goBack();
  }
}
