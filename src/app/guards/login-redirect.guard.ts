import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LoginService } from '../service/login.service';

@Injectable({ providedIn: 'root' })
export class LoginRedirectGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.loginService.isLoggedIn()) {
      // User is already logged in, redirect to profile
      return this.router.createUrlTree(['/profile']);
    }
    // User is not logged in, allow access to login page
    return true;
  }
}
