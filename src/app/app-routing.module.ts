import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeMpkComponent } from './home-mpk/home-mpk.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { GalaryComponent } from './components/galary/galary.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  // {path:"", component:HomeComponent},
  {path:"home", component:HomeMpkComponent},
  {path:"about", component:AboutComponent},
  {path:'login', component: LoginComponent},
  {path:'overview', component: OverviewComponent},
  {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path:'', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
