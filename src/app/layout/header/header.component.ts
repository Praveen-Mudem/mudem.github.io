import { Component, ElementRef, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse!: ElementRef;

  constructor(public loginService: LoginService, private router: Router) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const isNavbarOpen = this.navbarCollapse?.nativeElement.classList.contains('show');
    const isClickInsideNavbar = this.navbarCollapse?.nativeElement.contains(clickedElement);
    const isClickOnToggler = clickedElement.closest('.navbar-toggler');

    if (isNavbarOpen && !isClickInsideNavbar && !isClickOnToggler) {
      // manually remove 'show' class to collapse navbar
      this.navbarCollapse.nativeElement.classList.remove('show');
    }
  }

  onLogout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.loginService.clearSubscriptions();
  }
}
