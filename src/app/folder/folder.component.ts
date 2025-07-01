import { Component, OnInit } from '@angular/core';
import { FolderService } from '../service/folder.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  // Stub for Add Folder button
  onAddFolder() {
    // TODO: Open add folder modal/dialog
    alert('Add Folder clicked (to be implemented)');
  }

  // Stub for Edit Folder button
  onEditFolder(folder: any) {
    // TODO: Open edit folder modal/dialog with folder data
    alert('Edit Folder clicked for: ' + folder.Name);
  }

  // Stub for Share Folder button
  onShareFolder(folder: any) {
    // TODO: Open share folder modal/dialog
    alert('Share Folder clicked for: ' + folder.Name);
  }
  folderList: any[] = [];
  loading = false;
  errorMsg = '';

  constructor(private folderService: FolderService) {}

  ngOnInit() {
    this.loadFolders();
  }

  loadFolders() {
    this.loading = true;
    this.folderService.getAllFolderList().subscribe({
      next: (res) => {
        this.folderList = res || [];
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load folders';
        this.loading = false;
      }
    });
  }

  deleteFolder(folderId: number) {
    this.folderService.deleteFolderInfo(folderId).subscribe(() => this.loadFolders());
  }

  removeShare(folderId: number) {
    this.folderService.removeFolderShareInfo(folderId).subscribe(() => this.loadFolders());
  }

  shareFolder(folder: any, password: string) {
    const data = { ...folder, Password: password };
    this.folderService.shareFolderInfo(data).subscribe(() => this.loadFolders());
  }

  saveFolder(folder: any) {
    this.folderService.saveFolderInfo(folder).subscribe(() => this.loadFolders());
  }
}