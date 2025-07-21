import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FolderService } from '../service/folder.service';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { ToastService } from '../service/toast.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  folderList: any[] = [];
  loading = false;
  errorMsg = '';

  showDocuments = false;
  selectedFolderId: number|null = null;
  selectedProfileId: number|null = null; // Set this from your auth/user context

  // Modal properties
  @ViewChild('shareModal') shareModal!: TemplateRef<any>;
  modalRef?: BsModalRef;
  shareData = {
    folderId: 0,
    name: '',
    description: '',
    password: ''
  };

  constructor(
    private folderService: FolderService,
    private router: Router,
    private confirmDialog: ConfirmDialogService,
    private toast: ToastService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.loadFolders();
  }

  loadFolders() {
    this.loading = true;
    this.folderService.getAllFolderList().subscribe({
      next: (res) => {
        this.folderList = res.FolderListInfo || [];
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load folders';
        this.loading = false;
      }
    });
  }

  onAddFolder() {
    this.router.navigate(['folder/add']);
  }

  onEditFolder(folder: any) {
    this.router.navigate(['folder/edit', folder.FolderId]);
  }

  async onDeleteFolder(folderId: number) {
    const folder = this.folderList.find(f => f.FolderId === folderId);
    const result = await this.confirmDialog.confirm(`Are you sure you want to delete the folder "${folder?.Name || folderId}"?`);
    if (result) {
      this.folderService.deleteFolderInfo(folderId).subscribe({
        next: () => {
          this.loadFolders();
          this.toast.show('Folder deleted successfully.', 'success');
        },
        error: () => {
          this.toast.show('Failed to delete folder.', 'error');
        }
      });
    }
  }

  onShareFolder(folder: any) {
    this.shareData = {
      folderId: folder.FolderId,
      name: folder.Name,
      description: folder.Description || '',
      password: ''
    };
    this.modalRef = this.modalService.show(this.shareModal, {
      class: 'modal-md',
      backdrop: 'static',
      keyboard: false
    });
  }

  closeShareModal() {
    this.modalRef?.hide();
    this.shareData = {
      folderId: 0,
      name: '',
      description: '',
      password: ''
    };
  }

  confirmShare() {
    if (!this.shareData.password.trim()) {
      this.toast.show('Please enter a password to share the folder.', 'error');
      return;
    }

    const shareRequest = {
      FolderId: this.shareData.folderId,
      Name: this.shareData.name,
      Description: this.shareData.description,
      Password: this.shareData.password
    };

    this.folderService.shareFolderInfo(shareRequest).subscribe({
      next: (response) => {
        this.toast.show('Folder shared successfully!', 'success');
        this.closeShareModal();
        this.loadFolders();
      },
      error: (error) => {
        this.toast.show('Failed to share folder. Please try again.', 'error');
      }
    });
  }

  removeShare(folderId: number) {
    this.folderService.removeFolderShareInfo(folderId).subscribe(() => this.loadFolders());
  }

  shareFolder(folder: any, password: string) {
    const data = { ...folder, Password: password };
    this.folderService.shareFolderInfo(data).subscribe(() => this.loadFolders());
  }

  onFolderCardClick(folder: any) {
    this.router.navigate(['folder', folder.FolderId, 'documents']);
  }

  closeDocuments() {
    this.showDocuments = false;
    this.selectedFolderId = null;
  }
}