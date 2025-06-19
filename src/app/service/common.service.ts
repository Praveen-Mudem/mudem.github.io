import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ContactViewInfo,  FileInfo } from '../model/common.model';
import CONFIG from './Const';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public isUserLoggedIn:boolean = false;
  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isBrowser = false;
  private loggedInSource = new Subject();
  IsLoggedIn$ = this.loggedInSource.asObservable();
  readonly baseUrl = CONFIG.BASE_URL+'api/Home';
  formData:FileInfo = new FileInfo();
  ContactViewInfo:ContactViewInfo = new ContactViewInfo();

  constructor(private http:HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    // this.CheckLoggedInStatus();
    
   }
   getmyvideofiles(){
    return this.http.get(this.baseUrl+'/getmyvideofiles');
   }
   getmyimagefiles(){
    return this.http.get(this.baseUrl+'/getmyimagefiles');
   }
   savecontactinfo(){
    return this.http.post(this.baseUrl+'/savecontactinfo',this.ContactViewInfo);
   }
   uploadDocument(formData: FormData) {
    return this.http.post(this.baseUrl + '/uploadDocuments', formData);
  }
}
