import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { getForgotToken, getToken } from '../helpers/token.helper';
import { LoaderService } from '../service/loader.service';
import { CommonService } from '../service/common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService, private commonService: CommonService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.headers.has('X-No-Loader')) {
    //   return next.handle(req);
    // }
    this.loaderService.show(req.url.includes('uploadChunckFileInfo') ? false : true);
    
    // Skip authentication for shared folder APIs
    const isSharedFolderAPI = req.url.includes('GetSharedFolderInfo') || 
                              req.url.includes('ValidateSharedFolderInfo') || 
                              req.url.includes('GetSharedFolderFilesInfo');

    if (isSharedFolderAPI) {
      // Don't add auth headers for shared folder APIs
      return next.handle(req).pipe(
        finalize(() => this.loaderService.hide())
      );
    }

    // Use forgot token for reset password API
    const isForgotPasswordAPI = req.url.includes('resetForgotPwdInfo');
    let token = null;
    if (isForgotPasswordAPI) {
      token = getForgotToken();
    } else {
      token = getToken();
    }
    let request = req;
    // Get selectedProfileId from CommonService, fallback to logged-in profileId
    let profileId = null;
    if (this.commonService.selectedProfileId) {
      profileId = this.commonService.selectedProfileId;
    } else {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        const user = JSON.parse(userInfo);
        profileId = user.ProfileId;
      }
    }
    const setHeaders: any = {};
    if (token) {
      setHeaders['Authorization'] = `Bearer ${token}`;
    }
    if (profileId) {
      setHeaders['ProfileId'] = profileId.toString();
      // setHeaders['FolderId'] = '6'; // Default FolderId, can be overridden in specific requests
    }
    // debugger;
    if (Object.keys(setHeaders).length > 0) {
      request = req.clone({ setHeaders });
    }
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
