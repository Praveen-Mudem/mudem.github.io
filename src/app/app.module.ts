import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { Ng7LargeFilesUploadLibComponent, Ng7LargeFilesUploadLibModule } from 'ng7-large-files-upload-lib';
import { FormsModule } from '@angular/forms';
import { HomeMpkComponent } from './home-mpk/home-mpk.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { GalaryComponent } from './components/galary/galary.component';

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
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FaIconLibrary,
    FontAwesomeModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AngularFileUploaderModule,
    // Ng7LargeFilesUploadLibModule,
    Ng7LargeFilesUploadLibModule.forRoot('http://localhost/MAPI/api/Home/uploadDocuments'),
    FormsModule,
  ],
  exports: [
		Ng7LargeFilesUploadLibComponent,
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
