import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeMpkComponent } from '../home-mpk/home-mpk.component';

const routes: Routes = [
  { path: '', component: HomeMpkComponent }
];

@NgModule({
  declarations: [HomeMpkComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class HomeModule {}
