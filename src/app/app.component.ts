import { Component } from '@angular/core';
import { LoginService } from './service/login.service';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  isLoading = false;
  constructor(public loginService: LoginService, public loaderService: LoaderService) {
    this.loaderService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }
}

