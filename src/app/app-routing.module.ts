import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeMpkComponent } from './home-mpk/home-mpk.component';

const routes: Routes = [
  // {path:"", component:HomeComponent},
  {path:"home", component:HomeMpkComponent},
  {path:"about", component:AboutComponent},
  {path:'', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
