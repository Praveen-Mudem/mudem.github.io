import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FolderComponent } from './folder.component';
import { FolderRoutingModule } from './folder-routing.module';
import { FolderAddEditComponent } from './folder-add-edit/folder-add-edit.component';
import { FolderDocumentsComponent } from './folder-documents/folder-documents.component';
import { FileCardComponent } from '../shared/file-card/file-card.component';

@NgModule({
  declarations: [FolderComponent, FolderAddEditComponent, FolderDocumentsComponent, FileCardComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    FolderRoutingModule,
    ModalModule.forRoot()
  ]
})
export class FolderModule {}
