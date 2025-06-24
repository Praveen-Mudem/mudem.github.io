import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import CONFIG from './Const';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private profileListUrl = CONFIG.BASE_URL + 'api/User/getProfileList';
  private profileListSubject = new BehaviorSubject<any[]>([]);
  profileList$ = this.profileListSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProfileList(): Observable<any> {
    return this.http.get(this.profileListUrl).pipe(
      tap((result: any) => {
        const list = result?.ProfileList || result || [];
        this.profileListSubject.next(list);
      })
    );
  }

  setProfileList(list: any[]) {
    this.profileListSubject.next(list);
  }

  getProfileInfo(profileId: number): Observable<any> {
    return this.http.get(CONFIG.BASE_URL + 'api/User/getProfileInfo', { params: { profileId } });
  }

  deleteProfileInfo(profileId: number): Observable<any> {
    return this.http.get(CONFIG.BASE_URL + 'api/User/deleteProfileInfo/' + profileId);
  }

  saveProfileInfo(profile: any): Observable<any> {
    return this.http.post(CONFIG.BASE_URL + 'api/User/saveProfileInfo', profile);
  }
}
