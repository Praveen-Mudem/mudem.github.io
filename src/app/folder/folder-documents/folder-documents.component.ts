import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FolderService } from '../../service/folder.service';
import { LoginService } from '../../service/login.service';
import { ToastService } from '../../service/toast.service';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';
import { DocumentInfo } from 'src/app/model/folder.module';

@Component({
  selector: 'app-folder-documents',
  templateUrl: './folder-documents.component.html',
  styleUrls: ['./folder-documents.component.scss']
})
export class FolderDocumentsComponent implements OnInit {
  folderId!: number;
  profileId!: number;
  //documents: any[] = [];
  selectedFiles: File[] = [];
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  errorMsg = '';
  allowedTypes = ['mp4', 'pdf', 'jpg', 'jpeg', 'png'];
  progress = 0;
  isLoading = false;
  documents: DocumentInfo[] = [];

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
    this.selectedFiles = [];
    this.selectedFile = null;
    this.imageUrl = null;
    const files: FileList = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split('.').pop()?.toLowerCase();
        if (!ext || !this.allowedTypes.includes(ext)) {
          this.errorMsg = 'Only .mp4, .pdf, .jpg, .jpeg, .png files are allowed.';
          continue;
        }
        this.selectedFiles.push(file);
        // Only preview the first image file
        if (!this.imageUrl && file.type.startsWith('image')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageUrl = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
      // For backward compatibility, set selectedFile to first valid file
      this.selectedFile = this.selectedFiles.length ? this.selectedFiles[0] : null;
      if (!this.selectedFiles.length) {
        this.imageUrl = null;
      }
    }
  }

  async uploadFiles() {
    this.isLoading = true;
    if (!this.selectedFiles || !this.selectedFiles.length) {
      this.toast.show('No files selected.', 'error');
      return;
    }
    this.errorMsg = '';
    for (const file of this.selectedFiles) {
      if (file.size > 50 * 1024 * 1024) {
        // Use chunked upload for large files
        try {
          await this.folderService.uploadDocumentInChunks(file, this.folderId, progress => {
            this.progress = progress;
          });
          this.getDocuments();
          this.toast.show(`Large file uploaded successfully: ${file.name}`, 'success');
        } catch (err) {
          this.toast.show(`Failed to upload large file: ${file.name}`, 'error');
        }
      } else {
        // Use normal upload for small files
        this.folderService.uploadDocuments(this.profileId, this.folderId, [file])
          .subscribe({
            next: () => {
              this.toast.show(`Upload successful: ${file.name}`, 'success');
              this.getDocuments();
              this.isLoading = false;
            },
            error: (error) => {
              console.error('Upload error:', error);
              this.toast.show(`Failed to upload file: ${file.name}`, 'error');
              this.isLoading = false;
            }
          });
      }
    }
    this.getDocuments();
    this.selectedFiles = [];
    this.imageUrl = null;
    this.progress = 0;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
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
    
  // Helper methods to check file types
  isImageFile(fileType: string): boolean {
    const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageTypes.includes(fileType?.toLowerCase());
  }

  isVideoFile(fileType: string): boolean {
    const videoTypes = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', 'mp4', 'video/mp4'];
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
