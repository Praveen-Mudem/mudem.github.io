import { Component } from '@angular/core';
import { LoginService } from './service/login.service';
import { LoaderService } from './service/loader.service';
import { SharedFolderAccessService } from './shared/shared-folder-access/shared-folder-access.service';
import { CookieService } from './service/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  isLoading = false;
  isAccessingFolder = false;
  folderId: string | null = null;
  constructor(
    public loginService: LoginService, 
    public loaderService: LoaderService, 
    public folderAccessService: SharedFolderAccessService,
    public cookieService: CookieService
  ) {
    this.loaderService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
    this.folderId = this.cookieService.getObject('sharedFolderInfo')?.UniqueId || null;
    this.isAccessingFolder = this.folderAccessService.isHasAccess(this.folderId);
  }
}

