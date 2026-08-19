import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  mobileMenuOpen = false;
  openDropdown: 'about' | 'administration' | null = null;
  announcementOpen = false;

  announcements = [
    'Applications open for the 2026–27 academic year — Bachelor of Divinity, M.Th. & D.Th.',
    'UBS Foundation Day Celebration — 12th September 2026',
  ];

  admissionDeadline = new Date('2026-09-30T23:59:59');
  countdownText = '';
  private countdownTimer?: ReturnType<typeof setInterval>;

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    this.updateCountdown();
    if (!this.isBrowser) return;

    this.countdownTimer = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  }

  onWindowScroll(): void {
    if (!this.isBrowser) return;
    this.isScrolled = window.scrollY > 40;
  }

  // Guard against a stuck scroll-lock / open panel if the mobile menu was
  // left open and the viewport is then resized/rotated past the 836px
  // breakpoint into desktop layout.
  onWindowResize(): void {
    if (!this.isBrowser) return;
    if (this.mobileMenuOpen && window.innerWidth >= 837) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
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
          const firstLink = document.querySelector('#primary-nav-links a') as HTMLElement | null;
          firstLink?.focus();
        } catch {
          // ignore
        }
      }, 350);
    } else {
      setTimeout(() => {
        try {
          const toggle = document.getElementById('mobile-menu-toggle') as HTMLElement | null;
          toggle?.focus();
        } catch {
          // ignore
        }
      }, 0);
    }
  }

  openDropdownMenu(menu: 'about' | 'administration'): void {
    this.openDropdown = menu;
  }

  closeDropdownMenu(menu: 'about' | 'administration'): void {
    if (this.openDropdown === menu) this.openDropdown = null;
  }

  onEscapeKey(): void {
    if (this.mobileMenuOpen) this.closeMobileMenu();
  }

  toggleAnnouncement(): void {
    this.announcementOpen = !this.announcementOpen;
  }

  closeMobileMenu(): void {
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
        const toggle = document.getElementById('mobile-menu-toggle') as HTMLElement | null;
        toggle?.focus();
      } catch {
        // ignore
      }
    }, 0);
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(_event: KeyboardEvent): void {
    if (this.mobileMenuOpen) this.closeMobileMenu();
  }


  private updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.admissionDeadline.getTime() - now;
    if (distance <= 0) {
      this.countdownText = 'Admissions closed';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.countdownText = `Time left to apply: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}
