import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollSpyDirective } from './customdirective/scroll-spy.directive';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from "ngx-bootstrap/modal";
import { VideopopComponent } from './components/videopop/videopop.component';
import { ImagepopupComponent } from './components/imagepopup/imagepopup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UploadImgVideoComponent } from './components/upload-img-video/upload-img-video.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DashboardHeaderComponent } from './layout/dashboard-header/dashboard-header.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { SharedFolderComponent } from './shared/shared-folder-access/shared-folder.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollSpyDirective,
    VideopopComponent,
    ImagepopupComponent,
    UploadImgVideoComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardHeaderComponent,
    ConfirmDialogComponent,
    SharedFolderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
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
  entryComponents: [ConfirmDialogComponent, SharedFolderComponent]
})
export class AppModule { }
