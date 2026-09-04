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
      img: 'assets/campus/image_3.jpg', // was: https://ubs.ac.in/Admin/assets/img/1_Chapel.jpg
      heroImg: 'assets/campus/image_8.jpg', // was: .../25648c736fd22fdbb08cb2f9c29ca9cf.JPG
    },
    {
      time: '9:00 AM',
      title: 'Classes & Study',
      desc: 'Lectures run through the late morning in bright, modern classrooms, followed by hours of reading and writing in the private study cubicles that ring the library. It\u2019s this daily rhythm — four hours a day under the Word, students say — that shapes a person more than any single class.',
      img: 'assets/campus/image_10.png', // was: .../DSC_0263.JPG
      heroImg: 'assets/campus/image_7.jpg', // was: .../f454c22f66ec8accf2fcdaa4e2494093.JPG
    },
    {
      time: '5:00 PM',
      title: 'Sports Ground',
      desc: 'Books close and the grounds open up. Football, badminton and volleyball games run most evenings on the shared courts, mixing years and departments into the same teams. It\u2019s less about competition than about unwinding together before dinner.',
      img: 'assets/campus/image_11.jpg', // was: .../1_athyal_court.jpg
      heroImg: 'assets/campus/image_6.jpg', // was: .../c532653745b71fa500f5bc1228fcdab1.JPG
    },
    {
      time: '7:30 PM',
      title: 'Singspiration',
      desc: 'The day closes the way it opened — together. Singspiration gathers the whole campus for an evening of music and worship, student-led and open to anyone who wants to bring an instrument, or just their voice.',
      img: 'assets/campus/image_5.jpg', // was: .../c59fff473aaa506fd8270edc71a82690.jpg
      heroImg: 'assets/campus/image_3.jpg', // was: .../cd793155f49d7cb81deba9c27adc428c.JPG
    },
  ];

  facilityGroups: FacilityGroup[] = [
    {
      label: 'Academic & Worship',
      heading: 'Classrooms, chapel, and quiet corners to study',
      blurb: 'Built around focused study and unhurried worship, side by side.',
      items: [
        'Modern classrooms',
        'A dedicated, well-structured chapel',
        'Private study cubicles',
        'A campus studio',
      ],
      images: [
        'assets/campus/image_5.jpg',
        'assets/campus/image_10.png',
        'assets/campus/image_3.jpg',
      ],
    },
    {
      label: 'Residential',
      heading: 'Hostel life, built for the long haul',
      blurb:
        'Shared and attached-washroom hostels for B.D. and M.Th. students.',
      items: [
        'Hostels — shared washrooms (B.D.)',
        'Hostels — attached washrooms (M.Th.)',
        'Furnished rooms with common kitchen',
        'On-site washing machines & refrigerator',
      ],
      images: [
        'assets/campus/image_9.jpg', // was: Student_Housing_Render_Outside_Wide.jpg
        'assets/campus/image_8.jpg',
        'assets/campus/image_7.jpg',
      ],
    },
    {
      label: 'Recreation',
      heading: 'Grounds that get used, not just admired',
      blurb: 'Courts and fields five minutes from every hostel block.',
      items: [
        'Football ground',
        'Outdoor badminton & basketball courts',
        'Volleyball court',
        "Children's playground",
      ],
      images: [
        'assets/campus/image_11.jpg',
        'assets/campus/image_6.jpg',
        'assets/campus/image_3.jpg',
      ],
    },
    {
      label: 'Wellness & Safety',
      heading: 'Looked after, day to day',
      blurb: 'Prayer huts, medical care and round-the-clock security.',
      items: [
        'Prayer huts',
        'Weekly doctor visit (Wed, 5:30–6:30 p.m.)',
        'First aid & hospital referral',
        '24/7 security with camera coverage',
      ],
      images: [
        'assets/campus/image_5.jpg',
        'assets/campus/image_11.jpg',
        'assets/campus/image_2.jpg',
      ],
    },
  ];

  // Former "Events" photos now live here too, so they surface in the Gallery.
  galleryImages: string[] = [
    'assets/campus/image_8.jpg',
    'assets/campus/image_7.jpg',
    'assets/campus/image_6.jpg',
    'assets/campus/image_3.jpg',
    'assets/campus/image_11.jpg',
    'assets/campus/image_2.jpg',
    'assets/campus/image_5.jpg',
    'assets/campus/image_4.jpg',
    'assets/campus/image_12.png',
    'assets/campus/image_9.jpg',
    'assets/campus/image_10.png',
    'assets/campus/image_13.png',
    'assets/campus/image_14.png',
    'assets/campus/image_15.png',
  ];

  ngAfterViewInit(): void {
    // Start browser-only media and timeline behavior after the view exists.
    if (!this.isBrowser) return;

    if (this.heroVideoRef) {
      const video = this.heroVideoRef.nativeElement;
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch(() => {});
    }

    this.startDayAutoplay();
  }

  openFacility(group: FacilityGroup): void {
    // Open the selected facility group in the detail popup.
    this.activeFacility = group;
  }

  closeFacility(): void {
    // Remove the active facility so the popup is hidden.
    this.activeFacility = null;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    // Let keyboard users close the facility popup without using the mouse.
    if (this.activeFacility) this.closeFacility();
  }

  selectDayMoment(index: number): void {
    // Show the requested point in the daily schedule and restart its rotation.
    this.activeDayIndex = index;
    this.dayExpanded = false;
    this.restartDayAutoplay();
  }

  pauseDayAutoplay(): void {
    // Keep the current schedule item visible while the user is reading it.
    this.dayAutoplayPaused = true;
  }

  resumeDayAutoplay(): void {
    // Allow the schedule to continue advancing after the pointer leaves.
    this.dayAutoplayPaused = false;
  }

  private startDayAutoplay(): void {
    // Rotate through the daily schedule while the page is open in a browser.
    if (!this.isBrowser) return;
    this.dayAutoplayTimer = setInterval(() => {
      if (this.dayAutoplayPaused) return;
      this.activeDayIndex = (this.activeDayIndex + 1) % this.dayMoments.length;
      this.dayExpanded = false;
    }, this.dayAutoplayDelayMs);
  }

  private restartDayAutoplay(): void {
    // Replace the existing timer so manual selection resets the viewing interval.
    if (this.dayAutoplayTimer) clearInterval(this.dayAutoplayTimer);
    this.startDayAutoplay();
  }

  ngOnDestroy(): void {
    if (this.dayAutoplayTimer) clearInterval(this.dayAutoplayTimer);
  }
}
