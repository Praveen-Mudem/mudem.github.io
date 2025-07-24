import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { validateLogin } from '../../utils/validation.util';
import { setToken } from '../../helpers/token.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    const validationError = validateLogin(this.email, this.password);
    if (validationError) {
      this.errorMsg = validationError;
      return;
    }
    this.loginService.login(this.email, this.password).subscribe({
      next: (user) => {
        if (user && user.Token) {         
          setToken(user.Token);
          localStorage.setItem('userInfo', JSON.stringify(user));
          this.router.navigate(['/profile']);
        } else {
          this.errorMsg = 'Invalid credentials';
        }
      },
      error: () => {
        this.errorMsg = 'Login failed. Please try again.';
      }
    });
  }
}
