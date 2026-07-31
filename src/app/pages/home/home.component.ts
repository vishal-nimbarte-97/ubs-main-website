import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { ProgrammeTrack, Counter, CalendarEvent, CalendarCell } from '../../models';
import {
  PROGRAMME_TRACKS,
  CENTRES,
  WHY_REASONS,
  COUNTERS,
  ACCREDITATION_LOGOS,
  PARTNER_LOGOS,
  CALENDAR_EVENTS,
  NEWS,
  BLOG_POSTS,
  TESTIMONIALS,
} from '../../data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private router = inject(Router);
  private routerSubscription?: Subscription;

  /* ================= HERO — tagline swapper over video ================= */
  taglineGroups: string[][] = [
    ['Welcome To UBS'],
    ['Servant-Leadership'],
    ['Become Part Of The'],
    ['71-Year Legacy Of UBS'],
  ];
  activeTaglineIndex = 0;
  private taglineTimer?: ReturnType<typeof setInterval>;

  /* ================= PROGRAMMES OFFERED BAR ================= */
  programmeSearch = '';

  /* ================= SCHOOLS / CENTRES TOGGLE ================= */
  activeTab: 'programmes' | 'centres' = 'programmes';

  programmeTracks: ProgrammeTrack[] = PROGRAMME_TRACKS;
  centres: ProgrammeTrack[] = CENTRES;

  /* ================= WHY UBS + COUNTERS ================= */
  whyReasons = WHY_REASONS;

  counters: Counter[] = COUNTERS;
  private countersAnimated = false;
  @ViewChild('countersSection') countersSection?: ElementRef<HTMLElement>;
  private countersObserver?: IntersectionObserver;

  /* ================= ACCREDITATION / PARTNER LOGO STRIPS ================= */
  accreditationLogos = ACCREDITATION_LOGOS;
  partnerLogos = PARTNER_LOGOS;

  /* ================= EVENTS CALENDAR ================= */
  calendarDate = new Date();
  calendarDays: CalendarCell[] = [];
  selectedEvents: CalendarEvent[] = [];
  selectedDateLabel = '';

  events: CalendarEvent[] = CALENDAR_EVENTS;

  /* ================= NEWS ================= */
  news = NEWS;

  /* ================= BLOG CAROUSEL ================= */
  blogPosts = BLOG_POSTS;
  blogScrollIndex = 0;

  /* ================= TESTIMONIALS CAROUSEL ================= */
  testimonials = TESTIMONIALS;
  testimonialIndex = 0;
  private testimonialTimer?: ReturnType<typeof setInterval>;

  /* ================= ENQUIRY TAB + FLOATING CALL ================= */
  enquiryOpen = false;
  enquiryName = '';
  enquiryEmail = '';
  enquiryPhone = '';
  enquirySubmitted = false;

  /** Angular sets this to 'browser' or 'server' depending on which pass is
   *  currently rendering. Used to skip DOM/timer-only APIs during SSR/SSG. */
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    this.buildCalendar();

    // Timers, scroll position, and observers only make sense in a real
    // browser tab — running them during SSR would throw (no window/setInterval
    // persistence on the server) or leak timers that never get cleared.
    if (!this.isBrowser) return;

    this.routerSubscription = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.scrollToCurrentRouteSection());

    this.taglineTimer = setInterval(() => {
      this.activeTaglineIndex = (this.activeTaglineIndex + 1) % this.taglineGroups.length;
    }, 3200);

    this.testimonialTimer = setInterval(() => this.nextTestimonial(), 6000);

    this.scrollToCurrentRouteSection();
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    if (this.countersSection && 'IntersectionObserver' in window) {
      this.countersObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.countersAnimated) {
              this.countersAnimated = true;
              this.animateCounters();
            }
          });
        },
        { threshold: 0.4 }
      );
      this.countersObserver.observe(this.countersSection.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    if (this.taglineTimer) clearInterval(this.taglineTimer);
    if (this.testimonialTimer) clearInterval(this.testimonialTimer);
    this.countersObserver?.disconnect();
  }

  /* ---------- helpers ---------- */
  private scrollToCurrentRouteSection(): void {
    if (!this.isBrowser) return;

    const rawPath = this.router.url.split('?')[0].split('#')[0];
    const section = rawPath.replace(/^\//, '') || 'home';

    setTimeout(() => {
      if (section === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 80);
  }

  setTab(tab: 'programmes' | 'centres'): void {
    this.activeTab = tab;
  }

  private animateCounters(): void {
    const duration = 1600;
    const start = performance.now();
    const from = this.counters.map(() => 0);
    const to = this.counters.map((c) => c.target);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.counters.forEach((c, i) => {
        c.value = Math.round(from[i] + (to[i] - from[i]) * eased);
      });
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- calendar ---------- */
  buildCalendar(): void {
    const year = this.calendarDate.getFullYear();
    const month = this.calendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const eventDates = new Set(this.events.map((e) => e.date));

    const cells: CalendarCell[] = [];
    for (let i = 0; i < firstDay; i++) cells.push({ date: null, iso: '', hasEvent: false });
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = new Date(year, month, d).toISOString().slice(0, 10);
      cells.push({ date: d, iso, hasEvent: eventDates.has(iso) });
    }
    this.calendarDays = cells;
  }

  get calendarMonthLabel(): string {
    return this.calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  prevMonth(): void {
    this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() - 1, 1);
    this.buildCalendar();
  }

  nextMonth(): void {
    this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 1);
    this.buildCalendar();
  }

  selectDay(cell: CalendarCell): void {
    if (!cell.date) return;
    this.selectedEvents = this.events.filter((e) => e.date === cell.iso);
    this.selectedDateLabel = new Date(cell.iso).toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }

  closeSelectedDay(): void {
    this.selectedEvents = [];
    this.selectedDateLabel = '';
  }

  /* ---------- blog carousel ---------- */
  scrollBlog(dir: number): void {
    const max = this.blogPosts.length - 1;
    this.blogScrollIndex = Math.min(Math.max(this.blogScrollIndex + dir, 0), max);
  }

  /* ---------- testimonials ---------- */
  nextTestimonial(): void {
    this.testimonialIndex = (this.testimonialIndex + 1) % this.testimonials.length;
  }
  prevTestimonial(): void {
    this.testimonialIndex =
      (this.testimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  /* ---------- enquiry ---------- */
  toggleEnquiry(): void {
    this.enquiryOpen = !this.enquiryOpen;
  }

  submitEnquiry(): void {
    if (!this.enquiryName || !this.enquiryEmail) return;
    this.enquirySubmitted = true;
    this.enquiryName = '';
    this.enquiryEmail = '';
    this.enquiryPhone = '';
    setTimeout(() => {
      this.enquirySubmitted = false;
      this.enquiryOpen = false;
    }, 2500);
  }
}
