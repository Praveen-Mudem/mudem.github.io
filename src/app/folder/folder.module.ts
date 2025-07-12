import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FolderComponent } from './folder.component';
import { FolderRoutingModule } from './folder-routing.module';
import { FolderAddEditComponent } from './folder-add-edit/folder-add-edit.component';
import { FolderDocumentsComponent } from './folder-documents/folder-documents.component';

@NgModule({
  declarations: [FolderComponent, FolderAddEditComponent, FolderDocumentsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FolderRoutingModule]
})
export class FolderModule {}
