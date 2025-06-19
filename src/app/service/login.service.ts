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
}
