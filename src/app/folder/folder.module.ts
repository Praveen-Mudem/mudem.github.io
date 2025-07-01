import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FolderComponent } from './folder.component';
import { FolderRoutingModule } from './folder-routing.module';

@NgModule({
  declarations: [FolderComponent],
  imports: [CommonModule, FormsModule, FolderRoutingModule]
})
export class FolderModule {}
