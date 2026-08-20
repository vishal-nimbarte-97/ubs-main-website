import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface DayMoment {
  time: string;
  title: string;
  desc: string;
  img: string;
}

interface FacilityGroup {
  label: string;
  heading: string;
  blurb: string;
  items: string[];
  img: string;
}

interface EventItem {
  img: string;
  title: string;
}

@Component({
  selector: 'app-campus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss'],
})
export class CampusComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // ---- community statement reveal ----
  @ViewChild('communitySection') communitySection!: ElementRef<HTMLElement>;
  communityInView = false;
  private communityObserver?: IntersectionObserver;

  // ---- events reveal ----
  @ViewChild('eventsSection') eventsSection!: ElementRef<HTMLElement>;
  eventsInView = false;
  private eventsObserver?: IntersectionObserver;

  // ---- facilities tabs ----
  activeFacilityIndex = 0;
  private autoplayTimer?: ReturnType<typeof setInterval>;
  private autoplayPaused = false;
  private readonly autoplayDelayMs = 5500;

  dayMoments: DayMoment[] = [
    {
      time: '6:00 AM',
      title: 'Morning Chapel',
      desc: 'The community gathers before the day begins.',
      img: 'https://ubs.ac.in/Admin/assets/img/1_Chapel.jpg',
    },
    {
      time: '9:00 AM',
      title: 'Classes & Study',
      desc: 'Modern classrooms and private cubicles for focused work.',
      img: 'https://ubs.ac.in/Admin/assets/img/DSC_0263.JPG',
    },
    {
      time: '5:00 PM',
      title: 'Sports Ground',
      desc: 'Football, badminton and volleyball, most evenings.',
      img: 'https://ubs.ac.in/Admin/assets/img/1_athyal_court.jpg',
    },
    {
      time: '7:30 PM',
      title: 'Singspiration',
      desc: 'Music and worship evenings that close out the day.',
      img: 'https://ubs.ac.in/Admin/assets/img/c59fff473aaa506fd8270edc71a82690.jpg',
    },
  ];

  facilityGroups: FacilityGroup[] = [
    {
      label: 'Academic & Worship',
      heading: 'Classrooms, chapel, and quiet corners to study',
      blurb: 'Built around focused study and unhurried worship, side by side.',
      items: ['Modern classrooms', 'A dedicated, well-structured chapel', 'Private study cubicles', 'A campus studio'],
      img: 'https://ubs.ac.in/Admin/assets/img/c59fff473aaa506fd8270edc71a82690.jpg',
    },
    {
      label: 'Residential',
      heading: 'Hostel life, built for the long haul',
      blurb: 'Shared and attached-washroom hostels for B.D. and M.Th. students.',
      items: ['Hostels — shared washrooms (B.D.)', 'Hostels — attached washrooms (M.Th.)', 'Furnished rooms with common kitchen', 'On-site washing machines & refrigerator'],
      img: 'https://ubs.ac.in/Admin/assets/img/Student_Housing_Render_Outside_Wide.jpg',
    },
    {
      label: 'Recreation',
      heading: 'Grounds that get used, not just admired',
      blurb: 'Courts and fields five minutes from every hostel block.',
      items: ['Football ground', 'Outdoor badminton & basketball courts', 'Volleyball court', "Children's playground"],
      img: 'https://ubs.ac.in/Admin/assets/img/1_athyal_court.jpg',
    },
    {
      label: 'Wellness & Safety',
      heading: 'Looked after, day to day',
      blurb: 'Prayer huts, medical care and round-the-clock security.',
      items: ['Prayer huts', 'Weekly doctor visit (Wed, 5:30–6:30 p.m.)', 'First aid & hospital referral', '24/7 security with camera coverage'],
      img: 'https://ubs.ac.in/Admin/assets/img/baaf6089c10bc72c9a52ff0a957f0c97.jpg',
    },
  ];

  eventItems: EventItem[] = [
    { img: 'https://ubs.ac.in/Admin/assets/img/1.png', title: 'Fete Day' },
    { img: 'https://ubs.ac.in/Admin/assets/img/Untitled_design_(8).png', title: 'Literary Day' },
    { img: 'https://ubs.ac.in/Admin/assets/img/2.png', title: 'Theme Presentation' },
  ];

  galleryImages: string[] = [
    'https://ubs.ac.in/Admin/assets/img/25648c736fd22fdbb08cb2f9c29ca9cf.JPG',
    'https://ubs.ac.in/Admin/assets/img/f454c22f66ec8accf2fcdaa4e2494093.JPG',
    'https://ubs.ac.in/Admin/assets/img/c532653745b71fa500f5bc1228fcdab1.JPG',
    'https://ubs.ac.in/Admin/assets/img/cd793155f49d7cb81deba9c27adc428c.JPG',
    'https://ubs.ac.in/Admin/assets/img/33012bd8c201b2b57e3fd4d1b106ca73.JPG',
    'https://ubs.ac.in/Admin/assets/img/1a5e2363eb91e2fbbbb35c99826e7f88.JPG',
    'https://ubs.ac.in/Admin/assets/img/baaf6089c10bc72c9a52ff0a957f0c97.jpg',
    'https://ubs.ac.in/Admin/assets/img/de0a3da350631c57856c5e2a4b2e730d.jpg',
  ];

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.setupCommunityObserver();
    this.setupEventsObserver();
    this.startAutoplay();
  }

  selectFacility(index: number): void {
    this.activeFacilityIndex = index;
    this.restartAutoplay();
  }

  pauseAutoplay(): void {
    this.autoplayPaused = true;
  }

  resumeAutoplay(): void {
    this.autoplayPaused = false;
  }

  private startAutoplay(): void {
    if (!this.isBrowser) return;
    this.autoplayTimer = setInterval(() => {
      if (this.autoplayPaused) return;
      this.activeFacilityIndex = (this.activeFacilityIndex + 1) % this.facilityGroups.length;
    }, this.autoplayDelayMs);
  }

  private restartAutoplay(): void {
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
    this.startAutoplay();
  }

  private setupCommunityObserver(): void {
    if (!this.communitySection || !('IntersectionObserver' in window)) return;

    this.communityObserver = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          this.communityInView = true;
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    this.communityObserver.observe(this.communitySection.nativeElement);
  }

  private setupEventsObserver(): void {
    if (!this.eventsSection || !('IntersectionObserver' in window)) return;

    this.eventsObserver = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          this.eventsInView = true;
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    this.eventsObserver.observe(this.eventsSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.communityObserver?.disconnect();
    this.eventsObserver?.disconnect();
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
  }
}