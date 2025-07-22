import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedFolderService } from '../../service/shared-folder.service';
import { CookieService } from 'src/app/service/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class SharedFolderAccessService {
  constructor(
    private modalService: BsModalService,
    private sharedFolderService: SharedFolderService,
    private cookieService: CookieService
  ) {}

  
  validateSharedFolder(folderId: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // First get the folder info
      this.sharedFolderService.getSharedFolderInfo(folderId).subscribe({
        next: (folderResponse) => {
          if (folderResponse && folderResponse.FolderInfo) {
            const folderInfo = folderResponse.FolderInfo;
            
            // Prepare validation data
            const validateData = {
              FolderId: folderInfo.FolderId,
              Name: folderInfo.Name,
              Description: folderInfo.Description,
              UniqueId: folderInfo.UniqueId,
              Password: password,
              CreatedOn: folderInfo.CreatedOn,
              UpdatedOn: folderInfo.UpdatedOn,
              ShareUrl: folderInfo.ShareUrl
            };

            // Validate the password
            this.sharedFolderService.validateSharedFolderInfo(validateData).subscribe({
              next: (validationResponse) => {
                if (validationResponse.IsSaved) {
                  // Get the files after successful validation
                  const folderData = {
                    ...validationResponse.FolderInfo
                  };

                  this.sharedFolderService.getSharedFolderFilesInfo(folderData).subscribe({
                    next: (filesResponse) => {
                      resolve({
                        isValid: true,
                        folderInfo: validationResponse.FolderInfo,
                        files: filesResponse.DocumentList || [],
                        message: 'Password validated successfully'
                      });
                    },
                    error: (filesError) => {
                      // Even if files fail, validation was successful
                      resolve({
                        isValid: true,
                        folderInfo: validationResponse.FolderInfo,
                        files: [],
                        message: 'Password validated successfully but failed to load files'
                      });
                    }
                  });
                } else {
                  resolve({
                    isValid: false,
                    message: validationResponse.ErrorMessage || 'Invalid password'
                  });
                }
              },
              error: (validationError) => {
                reject({
                  isValid: false,
                  message: 'Failed to validate password',
                  error: validationError
                });
              }
            });
          } else {
            reject({
              isValid: false,
              message: 'Invalid folder information',
              error: 'No folder info received'
            });
          }
        },
        error: (folderError) => {
          reject({
            isValid: false,
            message: 'Failed to get folder information',
            error: folderError
          });
        }
      });
    });
  }

  isHasAccess(folderId: string): boolean {
    // Check if the folderId is stored in cookies
    const storedFolderId = this.cookieService.getCookie('currentSharedFolderId');
    const getObject = this.cookieService.getObject('sharedFolderInfo');
    if (getObject && !!getObject.Password) {
      return storedFolderId === folderId && !!storedFolderId;
    }
    return false;
  }
}
