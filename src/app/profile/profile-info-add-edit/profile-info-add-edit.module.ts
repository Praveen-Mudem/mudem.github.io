import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileInfoAddEditComponent } from './profile-info-add-edit.component';

const routes: Routes = [
  { path: '', component: ProfileInfoAddEditComponent }
];

@NgModule({
  declarations: [ProfileInfoAddEditComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class ProfileInfoAddEditModule {}
