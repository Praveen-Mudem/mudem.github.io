import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import CONFIG from './Const';
import { setToken, getToken, removeToken } from '../helpers/token.helper';

export interface UserInfo {
  name: string;
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = CONFIG.BASE_URL + 'api/Login/UserLogin';
  private subscriptions: Subscription[] = [];

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, {
      UserName: username,
      Password: password
    });
  }

  setToken(token: string) {
    setToken(token);
  }

  getToken(): string | null {
    return getToken();
  }

  isLoggedIn(): boolean {
    return !!getToken();
  }

  addSubscription(sub: Subscription) {
    this.subscriptions.push(sub);
  }

  clearSubscriptions() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  logout() {
    removeToken();
    localStorage.removeItem('userInfo');
    this.clearSubscriptions();
  }

  // Forgot Password API methods
  sendForgotPasswordInfo(payload: { Id: string }): Observable<any> {
    return this.http.post<any>(CONFIG.BASE_URL + 'api/Login/SendForgotPasswordInfo', payload);
  }

  validateForgotPasswordInfo(code: string): Observable<any> {
    return this.http.post<any>(CONFIG.BASE_URL + 'api/Login/ValidateForgotPasswordInfo', {
      Id: code
    });
  }

  resetForgotPwdInfo(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(CONFIG.BASE_URL + 'api/User/resetForgotPwdInfo', {
      NewPassword: newPassword,
      ConfirmPassword: confirmPassword
    });
  }

  // Reset Password API method (for authenticated users)
  resetPasswordInfo(currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(CONFIG.BASE_URL + 'api/User/resetPasswordInfo', {
      Password: currentPassword,
      NewPassword: newPassword,
      ConfirmPassword: confirmPassword
    });
  }

  /**
   * Returns the logged-in user's profile ID as a string, or null if not logged in.
   */
  static getLoggedInProfileId(): string | null {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      return user.ProfileId ? String(user.ProfileId) : null;
    }
    return null;
  }

  /**
   * Returns true if the given profileId is the logged-in user's profile.
   */
  static isLoggedInUserProfile(profileId: string | number): boolean {
    const loggedInId = LoginService.getLoggedInProfileId();
    return loggedInId !== null && String(profileId) === loggedInId;
  }
}
