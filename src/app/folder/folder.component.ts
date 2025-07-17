import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FolderService } from '../service/folder.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  folderList: any[] = [];
  loading = false;
  errorMsg = '';

  showAddEdit = false;
  addEditFolder: any = { FolderId: 0, Name: '', Description: '' };
  isEdit = false;

  constructor(private folderService: FolderService, private router: Router) {}

  ngOnInit() {
    this.loadFolders();
  }

  loadFolders() {
    this.loading = true;
    this.folderService.getAllFolderList().subscribe({
      next: (res) => {
        this.folderList = res.FolderListInfo || [];
         console.log("Vikas");
        console.log(this.folderList);
        console.log("Enddd");
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

  onSaveFolder(folder: any) {
    this.folderService.saveFolderInfo(folder).subscribe(() => {
      this.showAddEdit = false;
      this.loadFolders();
    });
  }

  onCancelFolder() {
    this.showAddEdit = false;
  }

  onDeleteFolder(folderId: number) {
    this.folderService.deleteFolderInfo(folderId).subscribe(() => {
      this.showAddEdit = false;
      this.loadFolders();
    });
  }

  onShareFolder(folder: any) {
    // TODO: Open share folder modal/dialog
    alert('Share Folder clicked for: ' + folder.Name);
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
}