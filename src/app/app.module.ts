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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ScrollSpyDirective,
    AboutComponent,
    VideopopComponent,
    ImagepopupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FaIconLibrary,
    FontAwesomeModule,
    ModalModule.forRoot(),
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
