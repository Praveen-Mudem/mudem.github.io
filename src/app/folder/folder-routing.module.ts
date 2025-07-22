import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FolderComponent } from './folder.component';

import { FolderAddEditComponent } from './folder-add-edit/folder-add-edit.component';

const routes: Routes = [
  { 
    path: '', 
    component: FolderComponent,
    // This will be used for /folder route
  },
  { path: 'add', component: FolderAddEditComponent },
  { path: 'edit/:id', component: FolderAddEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FolderRoutingModule {}
