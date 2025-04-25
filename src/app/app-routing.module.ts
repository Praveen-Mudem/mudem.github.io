import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeMpkComponent } from './home-mpk/home-mpk.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { GalaryComponent } from './components/galary/galary.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  // {path:"", component:HomeComponent},
  {path:"home", component:HomeMpkComponent},
  {path:"about", component:AboutComponent},
  {path:"contact", component:ContactusComponent},
  {path:"galary", component:GalaryComponent},
  {path:"login", component:LoginComponent},
  {path:'', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
