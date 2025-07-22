import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { getToken } from '../helpers/token.helper';
import { LoaderService } from '../service/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    
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
    
    const token = getToken();
    let request = req;
    // Get ProfileId from localStorage
    let profileId = null;
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      profileId = user.ProfileId;
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
