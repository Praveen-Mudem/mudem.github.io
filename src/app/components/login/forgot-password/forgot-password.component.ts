import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { ForgotPasswordRequest, AuthResponse } from '../../../model/auth.model';
import { setResetToken } from '../../../helpers/token.helper';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  isLoading = false;
  resetToken = '';
  isResetFlow = false;
  showResetForm = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['Token'];
      if (token) {
        this.isResetFlow = true;
        this.isLoading = true;
        this.loginService.validateForgotPasswordInfo(token, token).subscribe({
          next: (response: AuthResponse & { IsValidUser?: boolean; Token?: string }) => {
            this.isLoading = false;
            if (response.IsValidUser) {
              if (response.Token) {
                this.resetToken = response.Token;
                setResetToken(this.resetToken);
              }
              this.toastr.success('Link is valid. You can reset your password.');
              this.showResetForm = true;
            } else {
              this.toastr.error(response.ErrorMessage || 'Invalid or expired reset link');
              this.router.navigate(['/login']);
            }
          },
          error: (error) => {
            this.isLoading = false;
            this.toastr.error(error?.error?.ErrorMessage || 'Invalid or expired reset link');
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }

  onSendForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      const payload = { Id: this.forgotPasswordForm.value.email };
      this.loginService.sendForgotPasswordInfo(payload).subscribe({
        next: (response: AuthResponse) => {
          this.isLoading = false;
          if (response.IsSaved) {
            this.toastr.success(response.Message || response.SuccessMessage || 'Reset link sent to your email');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error(response.ErrorMessage || 'Failed to send reset link');
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error(error?.error?.ErrorMessage || 'Failed to send reset link. Please try again.');
        }
      });
    }
  }

  onResetPassword() {
    if (this.resetPasswordForm.valid && this.isResetFlow) {
      this.isLoading = true;
      const newPassword = this.resetPasswordForm.value.newPassword;
      const confirmPassword = this.resetPasswordForm.value.confirmPassword;
      this.loginService.resetForgotPwdInfo(this.resetToken, newPassword, confirmPassword).subscribe({
        next: (response: AuthResponse) => {
          this.isLoading = false;
          if (response.IsSaved) {
            // Clear reset token from localStorage
            import('../../../helpers/token.helper').then(helper => {
              helper.removeResetToken();
            });
            this.toastr.success(response.Message || response.SuccessMessage || 'Password reset successfully');
            this.router.navigate(['/login']);
          } else {
            this.toastr.error(response.ErrorMessage || 'Failed to reset password');
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error(error?.error?.ErrorMessage || 'Failed to reset password. Please try again.');
        }
      });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
