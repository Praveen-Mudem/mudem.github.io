import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { LoaderService } from './service/loader.service';
import { SharedFolderAccessService } from './shared/shared-folder-access/shared-folder-access.service';
import { CookieService } from './service/cookie.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  isLoading = false;
  isAccessingFolder = false;
  folderId: string | null = null;
  
  constructor(
    public loginService: LoginService, 
    public loaderService: LoaderService, 
    public folderAccessService: SharedFolderAccessService,
    public cookieService: CookieService,
    public router: Router
  ) {
    this.loaderService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
    this.folderId = this.cookieService.getObject('sharedFolderInfo')?.UniqueId || null;
  }

  ngOnInit() {
    // Listen to router events to detect shared folder access
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkSharedFolderUrl(event.url);
    });
    
    // Check initial URL once
    this.checkSharedFolderUrl(this.router.url);
  }
  
  private checkSharedFolderUrl(url: string) {
    if (url.includes('/sharedFolder') && url.includes('folderId=')) {
      this.isAccessingFolder = true;
    } else {
      this.isAccessingFolder = false;
    }
    
  }
}

