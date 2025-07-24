import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FolderService } from '../../service/folder.service';
import { LoginService } from '../../service/login.service';
import { ToastService } from '../../service/toast.service';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';

@Component({
  selector: 'app-folder-documents',
  templateUrl: './folder-documents.component.html',
  styleUrls: ['./folder-documents.component.scss']
})
export class FolderDocumentsComponent implements OnInit {
  folderId!: number;
  profileId!: number;
  documents: any[] = [];
  selectedFiles: File[] = [];
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  errorMsg = '';
  allowedTypes = ['mp4', 'pdf', 'jpg', 'jpeg', 'png'];

  constructor(
    private folderService: FolderService,
    private loginService: LoginService,
    private toast: ToastService,
    private confirmDialog: ConfirmDialogService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get folderId from route
    const urlParts = window.location.pathname.split('/');
    const folderIdx = urlParts.findIndex(part => part === 'folder');
    if (folderIdx !== -1 && urlParts[folderIdx + 1]) {
      this.folderId = +urlParts[folderIdx + 1];
    }
    // Get profileId from LoginService
    const pid = LoginService.getLoggedInProfileId();
    if (pid) {
      this.profileId = +pid;
    } else {
      this.errorMsg = 'User not logged in.';
      return;
    }
    if (this.folderId) {
      this.getDocuments();
    }
  }

  getDocuments() {
    this.folderService.getDocuments(this.folderId)
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
        error: () => this.errorMsg = 'Failed to load documents.'
      });
  }

  onFileSelected(event: any) {
    // Clear any previous error messages
    this.errorMsg = '';
    
    const file = event.target.files && event.target.files[0];
    this.selectedFile = file;
    this.selectedFiles = file ? [file] : [];
    
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!ext || !this.allowedTypes.includes(ext)) {
        this.errorMsg = 'Only .mp4, .pdf, .jpg, .jpeg, .png files are allowed.';
        this.selectedFile = null;
        this.selectedFiles = [];
        this.imageUrl = null;
        return;
      }
      
      // File is valid, set up preview for images
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (file.type.startsWith('image')) {
          this.imageUrl = e.target.result;
        } else {
          this.imageUrl = null;
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.imageUrl = null;
    }
  }

  uploadFiles() {
    if (!this.selectedFile) {
      this.toast.show('No file selected.', 'error');
      return;
    }
    
    // Clear any error messages
    this.errorMsg = '';
    
    this.folderService.uploadDocuments(this.profileId, this.folderId, [this.selectedFile])
      .subscribe({
        next: () => {
          this.getDocuments();
          this.selectedFile = null;
          this.selectedFiles = [];
          this.imageUrl = null;
          this.toast.show('Upload successful!', 'success');
          
          // Reset the file input
          const fileInput = document.getElementById('fileInput') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = '';
          }
        },
        error: (error) => {
          console.error('Upload error:', error);
          this.toast.show('Failed to upload files.', 'error');
        }
      });
  }

  async deleteDocument(doc: any) {
    const result = await this.confirmDialog.confirm(`Are you sure you want to delete the document "${doc.FileName || doc.filename || doc.name}"?`);
    if (result) {
      const payload = {
        DocumentId: doc.DocumentId,
        FileName: doc.FileName,
        FileType: doc.FileType
      };
      this.folderService.deleteDocument(payload)
        .subscribe({
          next: () => {
            this.getDocuments();
            this.toast.show('Document deleted successfully.', 'success');
          },
          error: () => this.toast.show('Failed to delete document.', 'error')
        });
    }
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

  goBack() {
    this.router.navigate(['/folder']);
  }
}
