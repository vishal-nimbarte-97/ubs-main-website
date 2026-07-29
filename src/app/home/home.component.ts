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

interface ProgrammeTrack {
  icon: string;
  title: string;
  image: string;
  description: string;
  link: string;
}

interface Counter {
  label: string;
  target: number;
  value: number;
  suffix: string;
}

interface CalendarEvent {
  date: string; // yyyy-mm-dd
  title: string;
  description: string;
}

interface NewsItem {
  title: string;
  excerpt: string;
}

interface BlogPost {
  image: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

interface Testimonial {
  quote: string;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  /* ================= NAV ================= */
  isScrolled = false;
  mobileMenuOpen = false;
  announcementOpen = false;

  announcements = [
    'Applications open for the 2026–27 academic year — Bachelor of Divinity, M.Th. & D.Th.',
    'UBS Foundation Day Celebration — 12th September 2026',
  ];

  /* ================= ADMISSION COUNTDOWN ================= */
  admissionDeadline = new Date('2026-09-30T23:59:59');
  countdownText = '';
  private countdownTimer?: ReturnType<typeof setInterval>;

  /* ================= HERO — tagline swapper over video ================= */
  taglineGroups: string[][] = [
    ['Welcome to UBS'], ['Servant-Leadership'],
    ['Become part of the'],
    ['71-Year Legacy of UBS'],
  ];
  activeTaglineIndex = 0;
  private taglineTimer?: ReturnType<typeof setInterval>;

  /* ================= PROGRAMMES OFFERED BAR ================= */
  programmeSearch = '';

  /* ================= SCHOOLS / CENTRES TOGGLE ================= */
  activeTab: 'programmes' | 'centres' = 'programmes';

  programmeTracks: ProgrammeTrack[] = [
    {
      icon: 'fa-book',
      title: 'Long Term Courses (Residential)',
      image: 'assets/img/track-longterm.jpg',
      description:
        'Bachelor of Divinity, Master of Theology, and Doctor of Theology — full-time residential formation combining biblical scholarship with spiritual and community life.',
      link: '/programmes/long-term',
    },
    {
      icon: 'fa-child',
      title: 'Short Term Courses (Residential)',
      image: 'assets/img/track-shortterm.jpg',
      description:
        'Centre for Children\u2019s Ministry and Comprehensive Training tracks, built for focused, intensive equipping in specific areas of ministry.',
      link: '/programmes/short-term',
    },
    {
      icon: 'fa-globe',
      title: 'Distance Courses (Non-Residential)',
      image: 'assets/img/track-distance.jpg',
      description:
        'Master of Divinity (ATA) offered in English, Hindi, and Marathi — theological training for those serving while studying from home.',
      link: '/programmes/distance',
    },
  ];

  centres: ProgrammeTrack[] = [
    {
      icon: 'fa-book',
      title: 'Centre for Biblical Studies',
      image: 'assets/img/centre-biblical.jpg',
      description:
        'Supports exegetical and biblical-language research across all UBS residential programmes.',
      link: '/centres/biblical-studies',
    },
    {
      icon: 'fa-users',
      title: 'Centre for Children\u2019s Ministry',
      image: 'assets/img/centre-children.jpg',
      description:
        'Trains practitioners for ministry with children, from curriculum design to hands-on field placement.',
      link: '/centres/childrens-ministry',
    },
    {
      icon: 'fa-hands-praying',
      title: 'Centre for Contextual Mission',
      image: 'assets/img/centre-mission.jpg',
      description:
        'Rural-bias mission training rooted in UBS\u2019s founding commitment to bibliocentric, contextually relevant ministry.',
      link: '/centres/contextual-mission',
    },
  ];

  /* ================= WHY UBS + COUNTERS ================= */
  whyReasons = [
    { icon: 'fa-book', text: 'Bibliocentric, Christ-Centred Teaching' },
    { icon: 'fa-users', text: 'Unity in Diversity Across India' },
    { icon: 'fa-child', text: 'Holistic, Community-Rooted Formation' },
    { icon: 'fa-book-open', text: 'Academic Excellence & Contextual Relevance' },
  ];

  counters: Counter[] = [
    { label: 'Graduates', target: 10000, value: 0, suffix: '+' },
    { label: 'Indian States Represented', target: 21, value: 0, suffix: '' },
    { label: 'Years of Formation', target: 71, value: 0, suffix: '+' },
    { label: 'Residential & Distance Tracks', target: 6, value: 0, suffix: '' },
    { label: 'Nations Represented', target: 12, value: 0, suffix: '+' },
    { label: 'Faculty & Staff', target: 40, value: 0, suffix: '+' },
  ];
  private countersAnimated = false;
  @ViewChild('countersSection') countersSection?: ElementRef<HTMLElement>;
  private countersObserver?: IntersectionObserver;

  /* ================= ACCREDITATION / PARTNER LOGO STRIPS ================= */
  accreditationLogos = [
    'assets/img/logo-senate-serampore.png',
    'assets/img/logo-ata.png',
    'assets/img/logo-ugc.png',
  ];
  partnerLogos = [
    'assets/img/partner-1.png',
    'assets/img/partner-2.png',
    'assets/img/partner-3.png',
    'assets/img/partner-4.png',
    'assets/img/partner-5.png',
  ];

  /* ================= EVENTS CALENDAR ================= */
  calendarDate = new Date();
  calendarDays: { date: number | null; iso: string; hasEvent: boolean }[] = [];
  selectedEvents: CalendarEvent[] = [];
  selectedDateLabel = '';

  events: CalendarEvent[] = [
    {
      date: this.isoInCurrentMonth(12),
      title: 'UBS Foundation Day',
      description: 'Chapel service and campus-wide celebration marking the seminary\u2019s founding.',
    },
    {
      date: this.isoInCurrentMonth(20),
      title: 'Convocation Ceremony',
      description: 'Graduating class from residential and distance programmes commissioned for ministry.',
    },
    {
      date: this.isoInCurrentMonth(25),
      title: 'Open Day for Prospective Students',
      description: 'Campus tours, faculty Q&A, and admissions guidance for the 2026\u201327 intake.',
    },
  ];

  /* ================= NEWS ================= */
  news: NewsItem[] = [
    {
      title: 'UBS Convocation Welcomes New Graduating Class',
      excerpt:
        'Graduates commissioned for ministry across residential and distance programmes this academic year.',
    },
    {
      title: 'Faculty Lecture Series on Contextual Theology',
      excerpt:
        'Visiting scholars joined UBS faculty for a series on holistic, contextually relevant ministry formation.',
    },
    {
      title: 'Admissions Open for Residential Programmes',
      excerpt:
        'Applications now open for Bachelor of Divinity, Master of Theology, and Doctor of Theology tracks.',
    },
  ];

  /* ================= BLOG CAROUSEL ================= */
  blogPosts: BlogPost[] = [
    {
      image: 'assets/img/blog-1.jpg',
      date: 'Jul 2026',
      title: 'What Does Servant-Leadership Actually Look Like in Ministry?',
      excerpt: 'A look at how UBS\u2019s formation pillars shape graduates for real church contexts...',
      link: '/blog/servant-leadership-in-ministry',
    },
    {
      image: 'assets/img/blog-2.jpg',
      date: 'Jun 2026',
      title: 'Choosing Between Residential and Distance Theological Study',
      excerpt: 'How to weigh the Master of Divinity (ATA) distance track against residential formation...',
      link: '/blog/residential-vs-distance-study',
    },
    {
      image: 'assets/img/blog-3.jpg',
      date: 'May 2026',
      title: 'Inside the Centre for Children\u2019s Ministry',
      excerpt: 'Why hands-on field placement is central to UBS\u2019s short-term ministry training...',
      link: '/blog/centre-for-childrens-ministry',
    },
    {
      image: 'assets/img/blog-4.jpg',
      date: 'Apr 2026',
      title: '71 Years of Bibliocentric Teaching with a Rural Bias',
      excerpt: 'Tracing UBS\u2019s founding vision from Dr. Frank Kline to today\u2019s faculty...',
      link: '/blog/71-years-of-ubs',
    },
  ];
  blogScrollIndex = 0;

  /* ================= TESTIMONIALS CAROUSEL ================= */
  testimonials: Testimonial[] = [
    {
      quote:
        'Studying at UBS shaped not just what I know, but who I am as a servant-leader. The community life formation was as formative as the classroom.',
      name: 'B.D. Graduate, 2024',
    },
    {
      quote:
        'Unity in diversity isn\u2019t a slogan here — I studied alongside classmates from a dozen states and several countries, and it changed how I read Scripture.',
      name: 'M.Th. Graduate, 2023',
    },
    {
      quote:
        'The distance M.Div. let me stay in ministry while studying. UBS met me where I was.',
      name: 'M.Div. (ATA) Graduate',
    },
  ];
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
    // Date-only logic is safe on the server, so this always runs.
    this.updateCountdown();
    this.buildCalendar();

    // Timers, scroll position, and observers only make sense in a real
    // browser tab — running them during SSR would throw (no window/setInterval
    // persistence on the server) or leak timers that never get cleared.
    if (!this.isBrowser) return;

    this.countdownTimer = setInterval(() => this.updateCountdown(), 1000);

    this.taglineTimer = setInterval(() => {
      this.activeTaglineIndex = (this.activeTaglineIndex + 1) % this.taglineGroups.length;
    }, 3200);

    this.testimonialTimer = setInterval(() => this.nextTestimonial(), 6000);
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
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    if (this.taglineTimer) clearInterval(this.taglineTimer);
    if (this.testimonialTimer) clearInterval(this.testimonialTimer);
    this.countersObserver?.disconnect();
  }

  /* ---------- helpers ---------- */
  private isoInCurrentMonth(day: number): string {
    const d = new Date();
    d.setDate(day);
    return d.toISOString().slice(0, 10);
  }

  onWindowScroll(): void {
    if (!this.isBrowser) return;
    this.isScrolled = window.scrollY > 40;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (!this.isBrowser) return;
    try {
      if (this.mobileMenuOpen) document.body.classList.add('menu-open');
      else document.body.classList.remove('menu-open');
    } catch (e) {
      // ignore server-side or strict environments
    }
  }

  toggleAnnouncement(): void {
    this.announcementOpen = !this.announcementOpen;
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

    const cells: { date: number | null; iso: string; hasEvent: boolean }[] = [];
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

  selectDay(cell: { date: number | null; iso: string; hasEvent: boolean }): void {
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

  closeMobileMenu(): void {
    if (!this.isBrowser) return;
    this.mobileMenuOpen = false;
    try {
      document.body.classList.remove('menu-open');
    } catch (e) { }
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