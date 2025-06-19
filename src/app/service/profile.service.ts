import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import CONFIG from './Const';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private profileListUrl = CONFIG.BASE_URL + 'api/User/getProfileList';

  constructor(private http: HttpClient) {}

  getProfileList(): Observable<any> {
    return this.http.get(this.profileListUrl);
  }
}
