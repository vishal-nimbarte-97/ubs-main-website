import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  navbarTransparent = false;
  mobileMenuOpen = false;
  announcementOpen = false;

  private router = inject(Router);
  private routerSubscription?: Subscription;

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
    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateTransparency());
    this.updateTransparency();
  }

  ngOnDestroy(): void {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.routerSubscription?.unsubscribe();
  }

  onWindowScroll(): void {
    if (!this.isBrowser) return;
    this.isScrolled = window.scrollY > 40;
    this.updateTransparency();
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
  }

  toggleAnnouncement(): void {
    this.announcementOpen = !this.announcementOpen;
  }

  closeMobileMenu(): void {
    if (!this.isBrowser) return;
    this.mobileMenuOpen = false;
    try {
      document.body.classList.remove('menu-open');
    } catch {
      // ignore server-side or strict environments
    }
  }

  private updateTransparency(): void {
    // Keep navbar always opaque and use the standard scrolled state for shadowing.
    // This ensures the header background and text colors remain the same at all
    // times regardless of the hero/video presence.
    this.navbarTransparent = false;
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
