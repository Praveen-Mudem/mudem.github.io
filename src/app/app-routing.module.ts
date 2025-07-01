import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // {path:"", component:HomeComponent},
  {
    path: "home",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: "about",
    loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'overview',
    loadChildren: () => import('./components/overview/overview.module').then(m => m.OverviewModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-dashboard/:profileId',
    loadChildren: () => import('./profile/profile-dashboard/profile-dashboard.module').then(m => m.ProfileDashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-info-add-edit',
    loadChildren: () => import('./profile/profile-info-add-edit/profile-info-add-edit.module').then(m => m.ProfileInfoAddEditModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderModule),
    canActivate: [AuthGuard]
  },
  { path: '', 
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
    pathMatch: 'full'
   },
  //  {
  //   path: '**',
  //   loadChildren: () => import('./components/not-found/not-found.module').then(m => m.NotFoundModule)
  //  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
