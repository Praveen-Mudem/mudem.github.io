import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ScrollSpyDirective } from './customdirective/scroll-spy.directive';
import { AboutComponent } from './about/about.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from "ngx-bootstrap/modal";
import { VideopopComponent } from './components/videopop/videopop.component';
import { ImagepopupComponent } from './components/imagepopup/imagepopup.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadImgVideoComponent } from './components/upload-img-video/upload-img-video.component';
import { FormsModule } from '@angular/forms';
import { HomeMpkComponent } from './home-mpk/home-mpk.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { GalaryComponent } from './components/galary/galary.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DashboardHeaderComponent } from './layout/dashboard-header/dashboard-header.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationAddEditComponent } from './notification/notification-add-edit.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { ProfileInfoAddEditComponent } from './profile/profile-info-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScrollSpyDirective,
    AboutComponent,
    VideopopComponent,
    ImagepopupComponent,
    UploadImgVideoComponent,
    HomeMpkComponent,
    HeaderComponent,
    FooterComponent,
    ContactusComponent,
    GalaryComponent,
    LoginComponent,
    OverviewComponent,
    ProfileComponent,
    SidebarComponent,
    DashboardHeaderComponent,
    NotificationComponent,
    NotificationAddEditComponent,
    ConfirmDialogComponent,
    ProfileInfoAddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FaIconLibrary,
    FontAwesomeModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      toastClass: 'ngx-toastr custom-toastr'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }
