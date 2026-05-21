import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactusComponent } from './contactus.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ContactusComponent }
];

@NgModule({
  declarations: [ContactusComponent],
  imports: [CommonModule, FormsModule,RouterModule.forChild(routes)]
})
export class ContatusModule {}
