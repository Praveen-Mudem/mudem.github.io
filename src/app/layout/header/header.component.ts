import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse!: ElementRef;

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
}
