import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedFolderAccessService } from './shared-folder-access.service';
import { ToastService } from '../../service/toast.service';
import { CookieService } from '../../service/cookie.service';
import { SharedFolderService } from 'src/app/service/shared-folder.service';
import { DocumentInfo, FolderInfo, getSharedFolderInfoResponse, SharedFolderFilesInfoResponse, ValidationResponse } from 'src/app/model/folder.module';

@Component({
  selector: 'app-shared-folder',
  templateUrl: "./shared-folder.component.html",
  styleUrls: ["./shared-folder.component.scss"]
})
export class SharedFolderComponent implements OnInit {
  isLogedIn: boolean = false;
  password: string = '';
  errorMessage: string = '';
  documents: DocumentInfo[] = [];
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
      const folderId = this.folderId = this.folderId = params['folderId'];

      if (!folderId) {
        this.errorMessage = 'No folder ID provided in URL.';
        return;
      }
      const folderInfo = this.getStoredFolderInfo();
      if (folderInfo && folderInfo.UniqueId === folderId && !!folderInfo.Password) {
        this.isLogedIn = true;
        this.getSharedFolderFilesInfo(folderInfo);
        return;
      } else {
        this.isLogedIn = false;
        this.getSharedFolderInfo(folderId);
      }
    });
  }

  getSharedFolderInfo(folderId: string) {
    if (folderId) {
      this.sharedFolderService.getSharedFolderInfo(folderId)
        .subscribe({
          next: (res: getSharedFolderInfoResponse) => {
            if (res && res.FolderInfo) {
              
              this.storeSharedFolderInfo(res.FolderInfo);
              this.toast.show('Shared folder info retrieved successfully', 'success');
            } else {
              this.toast.show('Failed to retrieve shared folder info', 'error');
            }
          },
          error: () => this.toast.show('Error retrieving shared folder info', 'error')
        });
    } else {
      this.toast.show('No folder ID found to retrieve info', 'error');
    }
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

  // storeDocumentList(documents: DocumentInfo[]) {
  //   this.cookieService.setObject('sharedFolderDocuments', documents, 1);
  //   console.log('Stored shared folder documents:', documents);
  // }

  // getStoredDocumentList() {
  //   return this.cookieService.getObject('sharedFolderDocuments');
  // }

  // Method to get stored shared folder info
  getStoredFolderInfo() {
    return this.cookieService.getObject('sharedFolderInfo');
  }

  // Method to clear stored folder info
  clearStoredFolderInfo() {
    this.cookieService.eraseCookie('sharedFolderInfo');
    this.cookieService.eraseCookie('currentSharedFolderId');
    
    // Reset component state
    this.isLogedIn = false;
    this.password = '';
    this.errorMessage = '';
    this.documents = [];
    
    this.toast.show('Logged out successfully', 'success');
    console.log('Cleared stored folder info and reset component state');
  }

  validateSharedFolder() {
    if (this.folderId && this.password.trim()) {
      const sharedFolderInfo: FolderInfo = this.cookieService.getObject('sharedFolderInfo');
      const updatedFolderInfo: FolderInfo = {
        ...sharedFolderInfo,
        Password: this.password.trim()
      };
      this.sharedFolderAccessService.validateSharedFolder(updatedFolderInfo)
        .subscribe((result: ValidationResponse) => {
          if (result.IsSaved) {
            // Store the validated folder info in cookies
            this.storeSharedFolderInfo(result.FolderInfo);
            
            // Set login status to true
            this.isLogedIn = true;
            this.getSharedFolderFilesInfo(result.FolderInfo);
            this.toast.show('Shared folder accessed successfully', 'success');
            
            // Clear the password field
            this.password = '';
            
            console.log('Folder validated and stored:', result.FolderInfo);
          } else {
            this.toast.show(result.ErrorMessage || 'Invalid password for shared folder', 'error');
          }
        },
        (error) => {
          console.error('Error accessing shared folder:', error);
          this.toast.show(error.message || 'Failed to access shared folder', 'error');
        }
      );
    } else {
      if (!this.folderId) {
        this.toast.show('No folder ID found to access', 'error');
      } else {
        this.toast.show('Please enter a password', 'error');
      }
    }
  }

  getSharedFolderFilesInfo(folderData: FolderInfo) {
    this.sharedFolderService.getSharedFolderFilesInfo(folderData)
      .subscribe({
        next: (res: SharedFolderFilesInfoResponse) => {
          // If API returns an object with a property (e.g. DocumentList), use that
          if (res?.DocumentList) {
            this.documents = res.DocumentList;
            // this.storeDocumentList(this.documents);
          } else {
            this.documents = [];
            //  this.storeDocumentList([]);
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

  // New properties for file viewer functionality
  isFileViewerVisible: boolean = false;
  selectedDocument: DocumentInfo | null = null;

  // New method to open file viewer
  viewDocument(document: DocumentInfo) {
    this.selectedDocument = document;
    this.isFileViewerVisible = true;
  }

  // New method to close file viewer
  closeFileViewer() {
    this.isFileViewerVisible = false;
    this.selectedDocument = null;
  }

  // New method to download file
  downloadDocument(document: DocumentInfo) {
    if (document?.Filepath) {
      const link = window.document.createElement('a');
      link.href = document.Filepath;
      link.download = document.FileName || 'download';
      link.target = '_blank';
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    }
  }

  // New method to get file extension
  getFileExtension(fileName: string): string {
    return fileName ? fileName.split('.').pop()?.toLowerCase() || '' : '';
  }

  // New method to get file size display
  getFileSizeDisplay(sizeInBytes: number): string {
    if (!sizeInBytes) return 'Unknown size';
    
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = sizeInBytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  // New method to check if file is viewable
  isViewableFile(fileType: string): boolean {
    return this.isImageFile(fileType) || this.isVideoFile(fileType) || this.isPdfFile(fileType);
  }

  // TrackBy function for better performance
  trackByDocumentId(index: number, document: DocumentInfo): any {
    return document.DocumentId || document.FileName || index;
  }
}
