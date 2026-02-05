import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { FileCardComponent } from './file-card/file-card.component';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

@NgModule({
  declarations: [
    FileViewerComponent,
    FileCardComponent,
    // ConfirmDialogComponent,
    SafeUrlPipe,
    // SharedFolderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FileViewerComponent,
    FileCardComponent,
    // ConfirmDialogComponent,
    SafeUrlPipe,
    // SharedFolderComponent
  ]
})
export class SharedModule { }
