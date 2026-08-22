import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  PLATFORM_ID,
  inject,
  HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface DayMoment {
  time: string;
  title: string;
  desc: string;
  img: string;
  heroImg: string;
}

interface FacilityGroup {
  label: string;
  heading: string;
  blurb: string;
  items: string[];
  images: string[]; // multiple photos now, shown in the popup gallery
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

  @ViewChild('heroVideoRef') heroVideoRef?: ElementRef<HTMLVideoElement>;

  // ---- facilities popup ----
  activeFacility: FacilityGroup | null = null;

  // ---- day-in-the-life auto-advancing timeline ----
  activeDayIndex = 0;
  dayExpanded = false;
  private dayAutoplayTimer?: ReturnType<typeof setInterval>;
  private dayAutoplayPaused = false;
  private readonly dayAutoplayDelayMs = 5000;

  dayMoments: DayMoment[] = [
    {
      time: '6:00 AM',
      title: 'Morning Chapel',
      desc: 'The whole community gathers in the chapel before sunrise — a quiet, unhurried half hour of prayer and scripture that sets the tone before lectures, assignments and the rest of the day begin. Students take turns leading worship through the term, so no two mornings sound quite the same.',
      img: 'https://ubs.ac.in/Admin/assets/img/1_Chapel.jpg',
      heroImg: 'https://ubs.ac.in/Admin/assets/img/25648c736fd22fdbb08cb2f9c29ca9cf.JPG',
    },
    {
      time: '9:00 AM',
      title: 'Classes & Study',
      desc: 'Lectures run through the late morning in bright, modern classrooms, followed by hours of reading and writing in the private study cubicles that ring the library. It\u2019s this daily rhythm — four hours a day under the Word, students say — that shapes a person more than any single class.',
      img: 'https://ubs.ac.in/Admin/assets/img/DSC_0263.JPG',
      heroImg: 'https://ubs.ac.in/Admin/assets/img/f454c22f66ec8accf2fcdaa4e2494093.JPG',
    },
    {
      time: '5:00 PM',
      title: 'Sports Ground',
      desc: 'Books close and the grounds open up. Football, badminton and volleyball games run most evenings on the shared courts, mixing years and departments into the same teams. It\u2019s less about competition than about unwinding together before dinner.',
      img: 'https://ubs.ac.in/Admin/assets/img/1_athyal_court.jpg',
      heroImg: 'https://ubs.ac.in/Admin/assets/img/c532653745b71fa500f5bc1228fcdab1.JPG',
    },
    {
      time: '7:30 PM',
      title: 'Singspiration',
      desc: 'The day closes the way it opened — together. Singspiration gathers the whole campus for an evening of music and worship, student-led and open to anyone who wants to bring an instrument, or just their voice.',
      img: 'https://ubs.ac.in/Admin/assets/img/c59fff473aaa506fd8270edc71a82690.jpg',
      heroImg: 'https://ubs.ac.in/Admin/assets/img/cd793155f49d7cb81deba9c27adc428c.JPG',
    },
  ];

  facilityGroups: FacilityGroup[] = [
    {
      label: 'Academic & Worship',
      heading: 'Classrooms, chapel, and quiet corners to study',
      blurb: 'Built around focused study and unhurried worship, side by side.',
      items: ['Modern classrooms', 'A dedicated, well-structured chapel', 'Private study cubicles', 'A campus studio'],
      images: [
        'https://ubs.ac.in/Admin/assets/img/c59fff473aaa506fd8270edc71a82690.jpg',
        'https://ubs.ac.in/Admin/assets/img/DSC_0263.JPG',
        'https://ubs.ac.in/Admin/assets/img/1_Chapel.jpg',
      ],
    },
    {
      label: 'Residential',
      heading: 'Hostel life, built for the long haul',
      blurb: 'Shared and attached-washroom hostels for B.D. and M.Th. students.',
      items: ['Hostels — shared washrooms (B.D.)', 'Hostels — attached washrooms (M.Th.)', 'Furnished rooms with common kitchen', 'On-site washing machines & refrigerator'],
      images: [
        'https://ubs.ac.in/Admin/assets/img/Student_Housing_Render_Outside_Wide.jpg',
        'https://ubs.ac.in/Admin/assets/img/25648c736fd22fdbb08cb2f9c29ca9cf.JPG',
        'https://ubs.ac.in/Admin/assets/img/f454c22f66ec8accf2fcdaa4e2494093.JPG',
      ],
    },
    {
      label: 'Recreation',
      heading: 'Grounds that get used, not just admired',
      blurb: 'Courts and fields five minutes from every hostel block.',
      items: ['Football ground', 'Outdoor badminton & basketball courts', 'Volleyball court', "Children's playground"],
      images: [
        'https://ubs.ac.in/Admin/assets/img/1_athyal_court.jpg',
        'https://ubs.ac.in/Admin/assets/img/c532653745b71fa500f5bc1228fcdab1.JPG',
        'https://ubs.ac.in/Admin/assets/img/cd793155f49d7cb81deba9c27adc428c.JPG',
      ],
    },
    {
      label: 'Wellness & Safety',
      heading: 'Looked after, day to day',
      blurb: 'Prayer huts, medical care and round-the-clock security.',
      items: ['Prayer huts', 'Weekly doctor visit (Wed, 5:30–6:30 p.m.)', 'First aid & hospital referral', '24/7 security with camera coverage'],
      images: [
        'https://ubs.ac.in/Admin/assets/img/baaf6089c10bc72c9a52ff0a957f0c97.jpg',
        'https://ubs.ac.in/Admin/assets/img/33012bd8c201b2b57e3fd4d1b106ca73.JPG',
        'https://ubs.ac.in/Admin/assets/img/1a5e2363eb91e2fbbbb35c99826e7f88.JPG',
      ],
    },
  ];

  // Former "Events" photos now live here too, so they surface in the Gallery.
  galleryImages: string[] = [
    'https://ubs.ac.in/Admin/assets/img/25648c736fd22fdbb08cb2f9c29ca9cf.JPG',
    'https://ubs.ac.in/Admin/assets/img/f454c22f66ec8accf2fcdaa4e2494093.JPG',
    'https://ubs.ac.in/Admin/assets/img/c532653745b71fa500f5bc1228fcdab1.JPG',
    'https://ubs.ac.in/Admin/assets/img/cd793155f49d7cb81deba9c27adc428c.JPG',
    'https://ubs.ac.in/Admin/assets/img/33012bd8c201b2b57e3fd4d1b106ca73.JPG',
    'https://ubs.ac.in/Admin/assets/img/1a5e2363eb91e2fbbbb35c99826e7f88.JPG',
    'https://ubs.ac.in/Admin/assets/img/baaf6089c10bc72c9a52ff0a957f0c97.jpg',
    'https://ubs.ac.in/Admin/assets/img/de0a3da350631c57856c5e2a4b2e730d.jpg',
    'https://ubs.ac.in/Admin/assets/img/1.png',
    'https://ubs.ac.in/Admin/assets/img/Untitled_design_(8).png',
    'https://ubs.ac.in/Admin/assets/img/2.png',
  ];

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.setupCommunityObserver();

    if (this.heroVideoRef) {
      const video = this.heroVideoRef.nativeElement;
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {});
    }

    this.startDayAutoplay();
  }

  openFacility(group: FacilityGroup): void {
    this.activeFacility = group;
  }

  closeFacility(): void {
    this.activeFacility = null;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activeFacility) this.closeFacility();
  }

  selectDayMoment(index: number): void {
    this.activeDayIndex = index;
    this.dayExpanded = false;
    this.restartDayAutoplay();
  }

  pauseDayAutoplay(): void {
    this.dayAutoplayPaused = true;
  }

  resumeDayAutoplay(): void {
    this.dayAutoplayPaused = false;
  }

  private startDayAutoplay(): void {
    if (!this.isBrowser) return;
    this.dayAutoplayTimer = setInterval(() => {
      if (this.dayAutoplayPaused) return;
      this.activeDayIndex = (this.activeDayIndex + 1) % this.dayMoments.length;
      this.dayExpanded = false;
    }, this.dayAutoplayDelayMs);
  }

  private restartDayAutoplay(): void {
    if (this.dayAutoplayTimer) clearInterval(this.dayAutoplayTimer);
    this.startDayAutoplay();
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

  ngOnDestroy(): void {
    this.communityObserver?.disconnect();
    if (this.dayAutoplayTimer) clearInterval(this.dayAutoplayTimer);
  }
}