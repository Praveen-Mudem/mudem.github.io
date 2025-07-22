import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedFolderAccessService } from './shared-folder-access.service';
import { ToastService } from '../../service/toast.service';
import { CookieService } from '../../service/cookie.service';
import { FolderService } from 'src/app/service/folder.service';
import { SharedFolderService } from 'src/app/service/shared-folder.service';

@Component({
  selector: 'app-shared-folder',
  templateUrl: "./shared-folder.component.html",
  styleUrls: ["./shared-folder.component.scss"]
})
export class SharedFolderComponent implements OnInit {
  isLogedIn: boolean = false;
  password: string = '';
  errorMessage: string = '';
  documents: any[] = [];
  folderId: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private sharedFolderAccessService: SharedFolderAccessService,
    private toast: ToastService,
    private cookieService: CookieService,
    private sharedFolderService: SharedFolderService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const folderId = this.folderId = params['folderId'];
      
      if (folderId) {
        const storedFolderInfo = this.cookieService.getObject('sharedFolderInfo');
        this.password = storedFolderInfo.Password || '';
        this.validateSharedFolder()
        if (!storedFolderInfo || storedFolderInfo.UniqueId !== folderId) {
          this.cookieService.setCookie('currentSharedFolderId', folderId, 1);
          this.isLogedIn = false;
          // this.openSharedFolderModal(folderId);
        } else {
          this.isLogedIn = true;
          console.log('Folder info already stored:', storedFolderInfo);
          this.toast.show('Shared folder info already available', 'success');
        }
      } else {
        this.isLogedIn = false;
      }
    });
  }

  // Method to store shared folder info in cookies
  storeSharedFolderInfo(folderInfo: any) {
    const sharedFolderInfo = {
      FolderId: folderInfo.FolderId,
      Name: folderInfo.Name,
      Description: folderInfo.Description,
      UniqueId: folderInfo.UniqueId,
      Password: folderInfo.Password,
      CreatedOn: folderInfo.CreatedOn,
      UpdatedOn: folderInfo.UpdatedOn,
      ShareUrl: folderInfo.ShareUrl,
      ValidatedAt: new Date().toISOString() // Add validation timestamp
    };
    
    // Store the complete folder info object in cookies for 1 day
    this.cookieService.setObject('sharedFolderInfo', sharedFolderInfo, 1);
    console.log('Stored shared folder info:', sharedFolderInfo);
  }

  // Method to get stored shared folder info
  getStoredFolderInfo() {
    return this.cookieService.getObject('sharedFolderInfo');
  }

  // Method to clear stored folder info
  clearStoredFolderInfo() {
    this.cookieService.eraseCookie('sharedFolderInfo');
    this.cookieService.eraseCookie('currentSharedFolderId');
  }

  validateSharedFolder() {
    const folderId = this.cookieService.getCookie('currentSharedFolderId');
    if (folderId && this.password.trim()) {
      this.sharedFolderAccessService.validateSharedFolder(folderId, this.password.trim())
        .then((result) => {
          if (result.isValid) {
            // Store the validated folder info in cookies
            this.storeSharedFolderInfo(result.folderInfo);
            
            // Set login status to true
            this.isLogedIn = true;
            this.getSharedFolderFilesInfo(result.folderInfo);
            this.toast.show('Shared folder accessed successfully', 'success');
            
            // Clear the password field
            this.password = '';
            
            console.log('Folder validated and stored:', result.folderInfo);
            console.log('Files available:', result.files);
          } else {
            this.toast.show(result.message || 'Invalid password for shared folder', 'error');
          }
        })
        .catch((error) => {
          console.error('Error accessing shared folder:', error);
          this.toast.show(error.message || 'Failed to access shared folder', 'error');
        });
      
    } else {
      if (!folderId) {
        this.toast.show('No folder ID found to access', 'error');
      } else {
        this.toast.show('Please enter a password', 'error');
      }
    }
  }

  getSharedFolderFilesInfo(folderData) {
    this.sharedFolderService.getSharedFolderFilesInfo(folderData)
      .subscribe({
        next: (res: any) => {
          // If API returns an object with a property (e.g. DocumentList), use that
          if (Array.isArray(res)) {
            this.documents = res;
          } else if (res && Array.isArray(res.DocumentList)) {
            this.documents = res.DocumentList;
          } else if (res && Array.isArray(res.FolderDocuments)) {
            this.documents = res.FolderDocuments;
          } else {
            this.documents = [];
          }
        },
        error: () => this.errorMessage = 'Failed to load documents.'
      });
  }

  // Helper methods to check file types
  isImageFile(fileType: string): boolean {
    const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageTypes.includes(fileType?.toLowerCase());
  }

  isVideoFile(fileType: string): boolean {
    const videoTypes = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', 'mp4'];
    return videoTypes.includes(fileType?.toLowerCase());
  }

  isPdfFile(fileType: string): boolean {
    const pdfTypes = ['.pdf', 'pdf'];
    return pdfTypes.includes(fileType?.toLowerCase());
  }
}
