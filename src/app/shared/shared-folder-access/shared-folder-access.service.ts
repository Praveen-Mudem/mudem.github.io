import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedFolderService } from '../../service/shared-folder.service';
import { CookieService } from 'src/app/service/cookie.service';
import { Observable, of } from 'rxjs';
import { FolderInfo } from 'src/app/model/folder.module';

@Injectable({
  providedIn: 'root'
})
export class SharedFolderAccessService {
  constructor(
    private modalService: BsModalService,
    private sharedFolderService: SharedFolderService,
    private cookieService: CookieService
  ) {}


  validateSharedFolder(folderInfo: FolderInfo): Observable<any> {
    if (!folderInfo || !folderInfo.Password) {
      return of({ isValid: false, message: 'No password provided' });
    }
    return this.sharedFolderService.validateSharedFolderInfo(folderInfo);
  }

  isHasAccess(folderId: string): Observable<boolean> {
    // Check if the folderId is stored in cookies
    const storedFolderId = this.cookieService.getCookie('currentSharedFolderId');
    const getObject = this.cookieService.getObject('sharedFolderInfo');
    if (getObject && !!getObject.Password) {
      return of(storedFolderId === folderId && !!storedFolderId);
    }
    return of(false);
  }
}
