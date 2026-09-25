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

import {
  ProgrammeTrack,
  Counter,
  CalendarEvent,
  CalendarCell,
} from '../../models';
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
import { LiveStatusService } from '../../services/dashboard/live-status.service';
import {
  AdminContentService,
  NotificationItem,
  PeopleProfile,
} from '../../services/admin/admin-content.service';
import { SiteContentService } from '../../services/admin/site-content.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private router = inject(Router);
  private liveStatusService = inject(LiveStatusService);
  private siteContentService = inject(SiteContentService);
  private adminContentService = inject(AdminContentService);
  private routerSubscription?: Subscription;

  @ViewChild('countersSection') countersSection?: ElementRef<HTMLElement>;
  @ViewChild('campusVideoRef') campusVideoRef?: ElementRef<HTMLVideoElement>;

  /* ================= HERO — tagline swapper over video ================= */
  taglineGroups: string[][] = [
    ['Welcome To UBS'],
    ['Servant-Leadership'],
    ['Become Part Of The'],
    ['71-Year Legacy Of UBS'],
  ];
  activeTaglineIndex = 0;
  private taglineTimer?: ReturnType<typeof setInterval>;

  /* ================= LIVE YOUTUBE MODULE ================= */
  // Controlled entirely by the backend now — no more localStorage,
  // no more visitor-entered URLs. Admin flips it on/off from /admin/dashboard.
  liveIsLive = false;
  liveChannelUrl = 'https://www.youtube.com/@unionbsmedia';
  private liveStatusTimer?: ReturnType<typeof setInterval>;

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

  /* ================= PEOPLE / PRINCIPAL ================= */
  principalProfile: PeopleProfile | null = null;

  /* ================= OFFICIAL NOTIFICATIONS ================= */
  officialNotifications: NotificationItem[] = [];

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

  @ViewChild('aboutIntroSection')
  aboutIntroSection!: ElementRef;
  introInView = false;

  title = 'Welcome to ubs';
  paragraph1 = `Union Biblical Seminary commits itself to train, equip, nurture and instill in those called by God,
    a Christ-like lifestyle, Biblical teaching and holistic formation for becoming servant leaders
    and scholar-saints in the church's mission in the contemporary world. UBS represents evangelical
    Christians from almost all the major Indian ethnic, linguistic and cultural groups, as well as from
    other countries. Its faculty, staff and students come from various cultural, regional, language
    backgrounds and church traditions.`;

  paragraph2 = `The dynamic principle of 'unity in diversity' finds its expression in everyday experience based on the
    solid foundation of the person of Jesus Christ, to whom every member of the UBS is committed.
    The variegated character of the community provides rich opportunities for cultural interchange and
    interdenominational understanding.`;

  displayedTitle = '';
  displayedParagraph1 = '';
  displayedParagraph2 = '';

  started = false;

  /** Reveal the introductory title and paragraphs one character at a time. */
  async startTyping(): Promise<void> {
    await this.typeText(this.title, (value) => {
      this.displayedTitle = value;
    });

    await this.typeText(this.paragraph1, (value) => {
      this.displayedParagraph1 = value;
    });

    await this.typeText(this.paragraph2, (value) => {
      this.displayedParagraph2 = value;
    });
  }

  /** Run a typewriter animation and report each intermediate value. */
  typeText(text: string, callback: (value: string) => void): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;

      const timer = setInterval(() => {
        callback(text.substring(0, index + 1));

        index++;

        if (index >= text.length) {
          clearInterval(timer);
          resolve();
        }
      }, 5); // typing speed
    });
  }

  formatNotificationDate(value?: string): string {
    if (!value) {
      return 'Recently';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return 'Recently';
    }

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  getNotificationType(notification: NotificationItem): 'NOTICE' | 'ANNOUNCEMENT' {
    const title = notification.title?.toLowerCase() ?? '';
    return title.includes('announcement') ? 'ANNOUNCEMENT' : 'NOTICE';
  }

  ngOnInit(): void {
    this.events = this.siteContentService.getEvents();
    this.news = this.siteContentService.getNews();
    this.adminContentService.getPeople().subscribe((people) => {
      this.principalProfile =
        people.find((person) => person.category?.toLowerCase() === 'principal') ?? null;
    });
    this.adminContentService.getNotifications().subscribe((items) => {
      this.officialNotifications = items.filter((item) => item.isActive !== false);
    });

    // Build static calendar data before the first template render.
    this.buildCalendar();

    // Timers, scroll position, and observers only make sense in a real
    // browser tab — running them during SSR would throw (no window/setInterval
    // persistence on the server) or leak timers that never get cleared.
    if (!this.isBrowser) return;

    // Live status: fetch immediately, then re-check every 20s.
    this.pollLiveStatus();
    this.liveStatusTimer = setInterval(() => this.pollLiveStatus(), 20000);

    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe(() => this.scrollToCurrentRouteSection());

    this.taglineTimer = setInterval(() => {
      this.activeTaglineIndex =
        (this.activeTaglineIndex + 1) % this.taglineGroups.length;
    }, 3200);

    this.testimonialTimer = setInterval(() => this.nextTestimonial(), 6000);

    this.scrollToCurrentRouteSection();

    this.createLegacySlides();

    setInterval(() => {
      this.nextLegacySlide();
    }, 5000);
  }

  ngAfterViewInit(): void {
    // Browser-only observers and video playback require rendered DOM elements.
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
        { threshold: 0.4 },
      );
      this.countersObserver.observe(this.countersSection.nativeElement);
    }

    if (this.aboutIntroSection && 'IntersectionObserver' in window) {
      const introObserver = new IntersectionObserver(
        (entries, obs) => {
          if (entries[0].isIntersecting) {
            this.introInView = true;
            obs.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      introObserver.observe(this.aboutIntroSection.nativeElement);
    }

    if (this.campusVideoRef) {
      const video = this.campusVideoRef.nativeElement;
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {});
    }
  }

  ngOnDestroy(): void {
    // Release subscriptions, timers, and observers when the home page is removed.
    this.routerSubscription?.unsubscribe();
    if (this.taglineTimer) clearInterval(this.taglineTimer);
    if (this.testimonialTimer) clearInterval(this.testimonialTimer);
    if (this.liveStatusTimer) clearInterval(this.liveStatusTimer);
    this.countersObserver?.disconnect();
  }

  /* ---------- helpers ---------- */
  private scrollToCurrentRouteSection(): void {
    // Scroll to the matching home section when navigation uses a section route.
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
    // Switch the data set displayed in the programmes/centres section.
    this.activeTab = tab;
  }

  /** Called when the hero "Live" button is clicked. Only navigates when actually live —
   *  uses window.open() directly instead of relying on the anchor's href binding, since
   *  that can be unreliable with SSR/hydration timing. */
  onLiveButtonClick(): void {
    if (!this.liveIsLive || !this.liveChannelUrl) return;
    if (this.isBrowser) {
      window.open(this.liveChannelUrl, '_blank', 'noopener,noreferrer');
    }
  }

  /** Ask the backend whether the admin has gone live, and what the channel link is. */
  private pollLiveStatus(): void {
    this.liveStatusService.getStatus().subscribe({
      next: (res) => {
        this.liveIsLive = res.isLive;
        if (res.channelUrl) {
          this.liveChannelUrl = res.channelUrl;
        }
      },
      error: () => {
        // Fail quietly on the public homepage — don't break the page if the API is down.
        this.liveIsLive = false;
      },
    });
  }

  private animateCounters(): void {
    // Animate each statistic from zero to its configured target with easing.
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
  /** Build the visible month grid and mark days that contain events. */
  buildCalendar(): void {
    const year = this.calendarDate.getFullYear();
    const month = this.calendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const eventDates = new Set(this.events.map((e) => e.date));

    const cells: CalendarCell[] = [];
    for (let i = 0; i < firstDay; i++)
      cells.push({ date: null, iso: '', hasEvent: false });
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = new Date(year, month, d).toISOString().slice(0, 10);
      cells.push({ date: d, iso, hasEvent: eventDates.has(iso) });
    }
    this.calendarDays = cells;
  }

  get calendarMonthLabel(): string {
    return this.calendarDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }

  prevMonth(): void {
    this.calendarDate = new Date(
      this.calendarDate.getFullYear(),
      this.calendarDate.getMonth() - 1,
      1,
    );
    this.buildCalendar();
  }

  nextMonth(): void {
    this.calendarDate = new Date(
      this.calendarDate.getFullYear(),
      this.calendarDate.getMonth() + 1,
      1,
    );
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
    this.blogScrollIndex = Math.min(
      Math.max(this.blogScrollIndex + dir, 0),
      max,
    );
  }

  /* ---------- testimonials ---------- */
  nextTestimonial(): void {
    this.testimonialIndex =
      (this.testimonialIndex + 1) % this.testimonials.length;
  }
  prevTestimonial(): void {
    this.testimonialIndex =
      (this.testimonialIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
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

  /* ================= LEGACY / GENESIS OF UBS ================= */
  legacyMilestones = [
    {
      image: '../../assets/genesis-ubs/image_1.png',
      title: 'The First Graduates of 1953',
      caption: 'The Forerunners in Christian Ministry',
      portrait: true,
    },
    {
      image: '../../assets/genesis-ubs/image_2.png',
      title: 'The First BD Class 1955-58',
      caption: 'The First fruits of Academic Excellence',
      portrait: true,
    },
    {
      image: '../../assets/genesis-ubs/image_3.png',
      title: 'Rev. V B Samudre',
      caption: 'The First Indian Faculty and Director of Studies',
      portrait: true,
    },
    {
      image: '../../assets/genesis-ubs/image_4.png',
      title: 'Miss Zoe Ann Alford',
      caption: 'The First Librarian: A Gentle Facilitator',
      portrait: true,
    },
    {
      image: '../../assets/genesis-ubs/image_5.png',
      title: 'The First Divine Service',
      caption: 'Library Ground Floor, Pune',
      portrait: true,
    },
    {
      image: '../../assets/genesis-ubs/image_6.png',
      title: 'Prayer of Dedication',
      caption: "Students' wives for Joint-Venture with their partners",
      portrait: true,
    },
    {
      image: '../../assets/genesis-ubs/image_6.png',
      title: 'Historic Gathering',
      caption: 'Founding Members',
      portrait: true,
    },
    {
      image: '../../assets/genesis-ubs/image_6.png',
      title: 'Campus Prayer',
      caption: 'Faith & Fellowship',
      portrait: true,
    },
    {
      image: '../../assets/genesis-ubs/image_6.png',
      title: 'Campus Prayer',
      caption: 'Faith & Fellowship',
      portrait: true,
    },
  ];

  legacySlides: any[] = [];
  currentLegacySlide = 0;

  createLegacySlides(): void {
    this.legacySlides = [];
    for (let i = 0; i < this.legacyMilestones.length; i += 3) {
      this.legacySlides.push(this.legacyMilestones.slice(i, i + 3));
    }
  }

  nextLegacySlide(): void {
    this.currentLegacySlide =
      (this.currentLegacySlide + 1) % this.legacySlides.length;
  }

  prevLegacySlide(): void {
    this.currentLegacySlide =
      (this.currentLegacySlide - 1 + this.legacySlides.length) %
      this.legacySlides.length;
  }

  connectBannerImage = 'https://picsum.photos/seed/ubs-foliage/1600/700';

  legacyVoices = [
    {
      avatar: 'https://picsum.photos/seed/frank-kline/160/160',
      name: 'Dr. Frank Kline',
      role: 'The First Principal, UBS',
      quote:
        'UBS was founded on the conviction that biblical scholarship and rural service are not opposites, but two halves of one calling.',
      gallery: [
        '../../assets/dr-frank-kline/image_1.png',
        '../../assets/dr-frank-kline/image_2.png',
        '../../assets/dr-frank-kline/image_3.png',
        '../../assets/dr-frank-kline/image_4.png',
      ],
    },
  ];
  legacyVoiceIndex = 0;

  nextLegacyVoice(): void {
    this.legacyVoiceIndex =
      (this.legacyVoiceIndex + 1) % this.legacyVoices.length;
  }
  prevLegacyVoice(): void {
    this.legacyVoiceIndex =
      (this.legacyVoiceIndex - 1 + this.legacyVoices.length) %
      this.legacyVoices.length;
  }
}