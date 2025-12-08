import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { FileCardComponent } from './file-card/file-card.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedFolderComponent } from './shared-folder-access/shared-folder.component';

@NgModule({
  declarations: [
    FileViewerComponent,
    FileCardComponent,
    ConfirmDialogComponent,
    // SharedFolderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FileViewerComponent,
    FileCardComponent,
    ConfirmDialogComponent,
    // SharedFolderComponent
  ]
})
export class SharedModule { }
