import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  PLATFORM_ID,
  inject,
  HostListener,
  OnInit,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AdminContentService,
  PeopleProfile,
} from '../../services/admin/admin-content.service';
import { SafeRichTextPipe } from '../../shared/pipes/safe-rich-text.pipe';

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
  imports: [CommonModule, SafeRichTextPipe],
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss'],
})
export class CampusComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private adminContentService = inject(AdminContentService);
  principalProfile: PeopleProfile | null = null;

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
      time: '6:00 AM – 6:30 AM',
      title: 'Personal Devotion',
      desc: 'A dedicated, quiet time at the start of the day for spiritual focus, reflection, and connection with God. It grounds our mindset, priorities, and intentions before daily responsibilities begin.',
      img: 'assets/campus/day-devotion.png',
      heroImg: 'assets/campus/day-devotion.png',
    },
    {
      time: '8:10 AM – 12:55 PM',
      title: 'Classes',
      desc: 'Classes bring the community together for a morning of theological learning and formation.',
      img: 'assets/campus/image_10.png', // was: .../DSC_0263.JPG
      heroImg: 'assets/campus/image_7.jpg', // was: .../f454c22f66ec8accf2fcdaa4e2494093.JPG
    },
    {
      time: '10:05 AM – 10:45 AM',
      title: 'Chapel',
      desc: 'Worship is an integral part of theological education and spiritual formation. The UBS community comes together to spend time in God’s presence.',
      img: 'assets/campus/day-chapel.png',
      heroImg: 'assets/campus/day-chapel.png',
    },
    {
      time: '10:45 AM – 11:10 AM',
      title: 'Announcements',
      desc: 'All official announcements concerning the seminary are addressed during the tea break at the Dining Hall.',
      img: 'assets/campus/day-announcements.png',
      heroImg: 'assets/campus/day-announcements.png',
    },
    {
      time: '2:00–5:00 PM',
      title: 'Library',
      desc: 'The Library is the intellectual and spiritual laboratory of our seminary, with more than 70,000 volumes covering all departments of theological curricula, alongside online resources including EBSCO, SAGE Journals, JSTOR Collection, and Global Digital Theological Library.',
      img: 'assets/campus/day-library.png',
      heroImg: 'assets/campus/day-library.png',
    },
    {
      time: '5:00 PM – 7:00 PM',
      title: 'Sports',
      desc: 'Books close and the grounds open up. Football, badminton and volleyball games run on the shared courts, bringing the community together to unwind.',
      img: 'assets/campus/image_11.jpg', // was: .../1_athyal_court.jpg
      heroImg: 'assets/campus/image_6.jpg', // was: .../c532653745b71fa500f5bc1228fcdab1.JPG
    },
    {
      time: '8:00–10:00 PM',
      title: 'Library',
      desc: 'The Library is the intellectual and spiritual laboratory of our seminary, with more than 70,000 volumes covering all departments of theological curricula, alongside online resources including EBSCO, SAGE Journals, JSTOR Collection, and Global Digital Theological Library.',
      img: 'assets/campus/day-library.png',
      heroImg: 'assets/campus/day-library.png',
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

  ngOnInit(): void {
    this.adminContentService.getPeople().subscribe((people) => {
      this.principalProfile =
        people.find((person) => person.category?.toLowerCase() === 'principal') ?? null;
    });
  }

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
