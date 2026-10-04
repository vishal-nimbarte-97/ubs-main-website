import {
  Component,
  inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

/** Site navigation and its responsive interaction state. */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  auth = inject(AuthService);
  isScrolled = false;
  mobileMenuOpen = false;
  openDropdown: 'about' | 'administration' | 'academics' | null = null;

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  onWindowScroll(): void {
    // Add the compact header state after the user scrolls past the top area.
    if (!this.isBrowser) return;
    this.isScrolled = window.scrollY > 40;
  }

  // Guard against a stuck scroll-lock / open panel if the mobile menu was
  // left open and the viewport is then resized/rotated past the 836px
  // breakpoint into desktop layout.
  onWindowResize(): void {
    // Close the mobile drawer when the viewport changes to desktop width.
    if (!this.isBrowser) return;
    if (this.mobileMenuOpen && window.innerWidth >= 837) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    // Open or close the mobile drawer and keep the document scroll state in sync.
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (!this.isBrowser) return;
    try {
      if (this.mobileMenuOpen) document.body.classList.add('menu-open');
      else document.body.classList.remove('menu-open');
    } catch {
      // ignore server-side or strict environments
    }

    // Accessibility: when opening, focus the first link inside the menu;
    // when closing, return focus to the toggle button. Delay slightly to
    // allow the CSS transition to complete before shifting focus.
    if (this.mobileMenuOpen) {
      setTimeout(() => {
        try {
          const firstLink = document.querySelector(
            '#primary-nav-links a',
          ) as HTMLElement | null;
          firstLink?.focus();
        } catch {
          // ignore
        }
      }, 350);
    } else {
      setTimeout(() => {
        try {
          const toggle = document.getElementById(
            'mobile-menu-toggle',
          ) as HTMLElement | null;
          toggle?.focus();
        } catch {
          // ignore
        }
      }, 0);
    }
  }

  openDropdownMenu(menu: 'about' | 'administration' | 'academics'): void {
    // Hover and focus open submenus on desktop only. On mobile, the parent
    // button below owns this state so one tap always opens the selected menu.
    if (this.isMobileViewport()) return;
    this.openDropdown = menu;
  }

  /** Parent navigation items expand submenus only in the mobile drawer. */
  toggleMobileDropdownMenu(
    menu: 'about' | 'administration' | 'academics',
  ): void {
    if (!this.isBrowser || window.innerWidth > 836) return;
    this.openDropdown = this.openDropdown === menu ? null : menu;
  }

  closeDropdownMenu(menu: 'about' | 'administration' | 'academics'): void {
    // Close only the dropdown currently being hovered or focused.
    if (this.isMobileViewport()) return;
    if (this.openDropdown === menu) this.openDropdown = null;
  }

  closeMobileMenu(): void {
    // Reset mobile navigation state and restore normal document scrolling.
    this.mobileMenuOpen = false;
    this.openDropdown = null;
    if (!this.isBrowser) return;
    try {
      document.body.classList.remove('menu-open');
    } catch {
      // ignore server-side or strict environments
    }

    // Return focus to the toggle for keyboard users
    setTimeout(() => {
      try {
        const toggle = document.getElementById(
          'mobile-menu-toggle',
        ) as HTMLElement | null;
        toggle?.focus();
      } catch {
        // ignore
      }
    }, 0);
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.mobileMenuOpen) this.closeMobileMenu();
  }

  private isMobileViewport(): boolean {
    return this.isBrowser && window.innerWidth <= 836;
  }

  logout(): void { // 👈 NEW
    this.auth.logout();
    this.closeMobileMenu();
    if (this.isBrowser) window.location.href = '/';
  }
}
