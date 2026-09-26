import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LiveStatusService } from '../../services/dashboard/live-status.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { SiteContentService } from '../../services/admin/site-content.service';
import {
  AdminContentService,
  AdmissionsConfig,
  GalleryItem,
  NotificationItem,
  PeopleProfile,
  PublicationItem,
  SiteConfig,
  TuitionFeeRow,
} from '../../services/admin/admin-content.service';
import { AdminShellComponent } from './components/admin-shell/admin-shell.component';
import { AdminSidebarComponent, AdminSidebarItem } from './components/admin-sidebar/admin-sidebar.component';
import { DashboardOverviewComponent } from './components/overview/dashboard-overview.component';
import { LiveBroadcastComponent } from './components/live-broadcast/live-broadcast.component';

type SectionId =
  | 'overview'
  | 'live'
  | 'updates'
  | 'site-config'
  | 'people'
  | 'tuition'
  | 'admissions'
  | 'publications'
  | 'gallery'
  | 'community'
  | 'student-zone';

interface AdminSection {
  id: SectionId;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminShellComponent, AdminSidebarComponent, DashboardOverviewComponent, LiveBroadcastComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLive = false;
  sidebarOpen = false;
  announcements: string[] = [];
  notifications: NotificationItem[] = [];
  people: PeopleProfile[] = [];
  tuitionRows: TuitionFeeRow[] = [];
  admissions: AdmissionsConfig = {
    programmeType: 'residential',
    academicYear: '2026-27',
    fees: [],
    deadlines: [],
    contacts: [],
  };
  publications: PublicationItem[] = [];
  gallery: GalleryItem[] = [];
  studentZone: GalleryItem[] = [];
  communityImages: GalleryItem[] = [];

  siteConfig: SiteConfig = {
    admissionsEmail: '',
    registrarEmail: '',
    principalEmail: '',
    libraryEmail: '',
    supportPhone: '',
    youtubeChannelUrl: '',
  };

  newNotification: NotificationItem = {
    title: '',
    description: '',
    link: '',
    isActive: true,
    type: 'announcement',
  };

  newPerson: PeopleProfile = {
    name: '',
    designation: '',
    category: 'principal',
    imageUrl: '',
    quote: '',
    bio: '',
    isActive: true,
    email: '',
    department: '',
    qualificationTitle: '',
    qualification: [],
    specialization: [],
    books: [],
    research: [],
    articles: [],
    journals: [],
    pdfPath: '',
  };

  facultyQualificationText = '';
  facultySpecializationText = '';
  facultyBooksText = '';
  facultyResearchText = '';
  facultyArticlesText = '';
  facultyJournalsText = '';
  facultyTypeSelection = '';

  facultyDepartmentOptions = [
    'Biblical Studies: Old Testament',
    'Biblical Studies: New Testament',
    'Christian Theology',
    'History of Christianity',
    'Christian Ministry',
    'Missiology',
  ];
  customFacultyType = '';

  newTuitionRow: TuitionFeeRow = {
    programmeType: 'residential',
    course: '',
    singleStudent: '',
    marriedStudentWithQuarters: '',
    english: '',
    hindi: '',
    marathi: '',
    academicYear: '2026-27',
    isActive: true,
  };

  newPublication: PublicationItem = {
    title: '',
    description: '',
    status: 'Draft',
    category: 'Research',
    coverImageUrl: '',
    publishedDate: new Date().toISOString().slice(0, 10),
    link: '',
    isFeatured: false,
    isActive: true,
  };

  newGalleryItem: GalleryItem = {
    title: '',
    category: 'Campus',
    imageUrl: '',
    altText: '',
    isActive: true,
  };

  communityName = '';
  communityImageUrls: string[] = [];
  communityTypeSelection = '';
  customCommunityType = '';
  communityTypeOptions = [
    'Prayer Committee',
    'Missionary Project Committee',
    'Social and Cultural Committee',
    'Handicraft Committee',
    'Literary, Debate, and Publication Committee',
    'Service Committee',
    'Sports and Games Committee',
    'Missionary Conference Committee',
    'Campus Care Committee',
    'Days of Challenge Committee',
  ];

  sections: AdminSidebarItem[] = [
    { id: 'overview', label: 'Overview', icon: 'fa-gauge-high' },
    { id: 'live', label: 'Live Broadcast', icon: 'fa-video' },
    { id: 'updates', label: 'Updates', icon: 'fa-bell' },
    // { id: 'site-config', label: 'Site Config', icon: 'fa-gear' },
    { id: 'people', label: 'People', icon: 'fa-user' },
    { id: 'tuition', label: 'Tuition', icon: 'fa-indian-rupee-sign' },
    { id: 'admissions', label: 'Admissions', icon: 'fa-clipboard-check' },
    { id: 'publications', label: 'Publications', icon: 'fa-book' },
    { id: 'gallery', label: 'Gallery', icon: 'fa-images' },
    { id: 'community', label: 'Community', icon: 'fa-people-group' },
    { id: 'student-zone', label: 'Student Zone', icon: 'fa-school' },
  ];

  activeSection: SectionId = 'overview';

  constructor(
    private liveService: LiveStatusService,
    private auth: AuthService,
    private router: Router,
    private siteContent: SiteContentService,
    private adminContent: AdminContentService,
  ) {}

  ngOnInit(): void {
    this.liveService.getStatus().subscribe((res) => (this.isLive = res.isLive));
    this.refreshContent();
    this.loadBackendContent();
  }

  get currentSectionLabel(): string {
    return this.sections.find((s) => s.id === this.activeSection)?.label ?? '';
  }

  setSection(id: SectionId): void {
    this.activeSection = id;
    this.sidebarOpen = false;
  }

  onSidebarSelect(id: string): void {
    this.setSection(id as SectionId);
  }

  refreshContent(): void {
    this.announcements = this.siteContent.getAnnouncements();
  }

  loadBackendContent(): void {
    this.adminContent.getLiveStatus().subscribe((res) => {
      this.isLive = !!res.isLive;
    });

    this.adminContent.getSiteConfig().subscribe((res) => {
      this.siteConfig = res;
    });

    this.adminContent.getNotifications().subscribe((res) => {
      this.notifications = res;
    });

    this.adminContent.getPeople().subscribe((res) => {
      this.people = res;
    });

    this.adminContent.getTuitionRows().subscribe((res) => {
      this.tuitionRows = res;
    });

    this.adminContent.getAdmissions().subscribe((res) => {
      this.admissions = res;
    });

    this.adminContent.getPublications().subscribe((res) => {
      this.publications = res;
    });

    this.adminContent.getGalleryItems().subscribe((res) => {
      this.gallery = res;
    });

    this.adminContent.getStudentZoneItems().subscribe((res) => {
      this.studentZone = res;
      this.communityImages = res.filter(
        (item) => item.category === 'UBSSF Community',
      );
    });
  }

  toggleLive(): void {
    this.liveService.setStatus(!this.isLive).subscribe((res) => {
      this.isLive = res.isLive;
    });
  }

  saveSiteConfig(): void {
    this.adminContent.saveSiteConfig(this.siteConfig).subscribe((res) => {
      this.siteConfig = res;
    });
  }

  saveNotification(): void {
    if (!this.newNotification.title.trim()) return;

    const payload: NotificationItem = {
      ...this.newNotification,
      type: this.newNotification.type ?? 'announcement',
    };

    this.adminContent.saveNotification(payload).subscribe((res) => {
      this.notifications = [res, ...this.notifications];
      this.newNotification = {
        title: '',
        description: '',
        link: '',
        isActive: true,
        type: 'announcement',
      };
    });
  }

  deleteNotification(index: number): void {
    const item = this.notifications[index];
    this.adminContent.deleteNotification(item.id).subscribe(() => {
      this.notifications = this.notifications.filter((_, i) => i !== index);
    });
  }

  private parseTextList(value: string): string[] {
    return value
      .split(/\n|,/) 
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  private resetFacultyTextFields(): void {
    this.facultyQualificationText = '';
    this.facultySpecializationText = '';
    this.facultyBooksText = '';
    this.facultyResearchText = '';
    this.facultyArticlesText = '';
    this.facultyJournalsText = '';
  }

  savePerson(): void {
    if (!this.newPerson.name.trim() || !this.newPerson.designation.trim()) return;

    const facultyDepartment =
      this.facultyTypeSelection === 'other'
        ? this.customFacultyType.trim()
        : this.facultyTypeSelection;

    const person: PeopleProfile = {
      ...this.newPerson,
      category: this.newPerson.category || 'principal',
      department:
        this.newPerson.category === 'faculty'
          ? facultyDepartment
          : this.newPerson.department,
      qualification:
        this.newPerson.category === 'faculty'
          ? this.parseTextList(this.facultyQualificationText)
          : this.newPerson.qualification ?? [],
      specialization:
        this.newPerson.category === 'faculty'
          ? this.parseTextList(this.facultySpecializationText)
          : this.newPerson.specialization ?? [],
      books:
        this.newPerson.category === 'faculty'
          ? this.parseTextList(this.facultyBooksText)
          : this.newPerson.books ?? [],
      research:
        this.newPerson.category === 'faculty'
          ? this.parseTextList(this.facultyResearchText)
          : this.newPerson.research ?? [],
      articles:
        this.newPerson.category === 'faculty'
          ? this.parseTextList(this.facultyArticlesText)
          : this.newPerson.articles ?? [],
      journals:
        this.newPerson.category === 'faculty'
          ? this.parseTextList(this.facultyJournalsText)
          : this.newPerson.journals ?? [],
    };

    this.adminContent.savePerson(person).subscribe((res) => {
      this.people = [res, ...this.people];
      this.newPerson = {
        name: '',
        designation: '',
        category: 'principal',
        imageUrl: '',
        quote: '',
        bio: '',
        isActive: true,
        email: '',
        department: '',
        qualificationTitle: '',
        qualification: [],
        specialization: [],
        books: [],
        research: [],
        articles: [],
        journals: [],
        pdfPath: '',
      };
      this.resetFacultyTextFields();
      this.facultyTypeSelection = '';
      this.customFacultyType = '';
    });
  }

  deletePerson(index: number): void {
    const item = this.people[index];
    this.adminContent.deletePerson(item.id).subscribe(() => {
      this.people = this.people.filter((_, i) => i !== index);
    });
  }

  saveTuitionRow(): void {
    const courseName = (this.newTuitionRow.course ?? '').trim();
    if (!courseName) return;

    const payload: TuitionFeeRow = {
      ...this.newTuitionRow,
      course: courseName,
      programmeType: this.newTuitionRow.programmeType ?? 'residential',
      academicYear: this.newTuitionRow.academicYear ?? '2026-27',
      isActive: true,
      programmeName: courseName,
      mainCampus:
        this.newTuitionRow.programmeType === 'residential'
          ? this.newTuitionRow.singleStudent ?? ''
          : this.newTuitionRow.english ?? '',
      onlineCampus:
        this.newTuitionRow.programmeType === 'residential'
          ? this.newTuitionRow.marriedStudentWithQuarters ?? ''
          : this.newTuitionRow.hindi ?? '',
      extension:
        this.newTuitionRow.programmeType === 'residential'
          ? ''
          : this.newTuitionRow.marathi ?? '',
    };

    this.adminContent.saveTuitionRow(payload).subscribe((res) => {
      this.tuitionRows = [res, ...this.tuitionRows];
      this.newTuitionRow = {
        programmeType: 'residential',
        course: '',
        singleStudent: '',
        marriedStudentWithQuarters: '',
        english: '',
        hindi: '',
        marathi: '',
        academicYear: '2026-27',
        isActive: true,
      };
    });
  }

  deleteTuitionRow(index: number): void {
    const item = this.tuitionRows[index];
    this.adminContent.deleteTuitionRow(item.id).subscribe(() => {
      this.tuitionRows = this.tuitionRows.filter((_, i) => i !== index);
    });
  }

  saveAdmissions(): void {
    this.adminContent.saveAdmissions(this.admissions).subscribe((res) => {
      this.admissions = res;
    });
  }

  addAdmissionFee(): void {
    this.admissions.fees = [...this.admissions.fees, { label: '', value: '' }];
  }

  removeAdmissionFee(index: number): void {
    this.admissions.fees = this.admissions.fees.filter((_, i) => i !== index);
  }

  addAdmissionDeadline(): void {
    this.admissions.deadlines = [...this.admissions.deadlines, { programme: '', date: '' }];
  }

  removeAdmissionDeadline(index: number): void {
    this.admissions.deadlines = this.admissions.deadlines.filter((_, i) => i !== index);
  }

  addAdmissionContact(): void {
    this.admissions.contacts = [...this.admissions.contacts, { label: '', email: '' }];
  }

  removeAdmissionContact(index: number): void {
    this.admissions.contacts = this.admissions.contacts.filter((_, i) => i !== index);
  }

  savePublication(): void {
    if (!this.newPublication.title.trim()) return;

    this.adminContent.savePublication(this.newPublication).subscribe((res) => {
      this.publications = [res, ...this.publications];
      this.newPublication = {
        title: '',
        description: '',
        status: 'Draft',
        category: 'Research',
        coverImageUrl: '',
        publishedDate: new Date().toISOString().slice(0, 10),
        link: '',
        isFeatured: false,
        isActive: true,
      };
    });
  }

  deletePublication(index: number): void {
    const item = this.publications[index];
    this.adminContent.deletePublication(item.id).subscribe(() => {
      this.publications = this.publications.filter((_, i) => i !== index);
    });
  }

  onImageSelected(event: Event, target: 'person' | 'publication' | 'gallery' | 'student-zone'): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;

      if (target === 'person') {
        this.newPerson.imageUrl = dataUrl;
      } else if (target === 'publication') {
        this.newPublication.coverImageUrl = dataUrl;
      } else {
        this.newGalleryItem.imageUrl = dataUrl;
      }
    };

    reader.readAsDataURL(file);
    input.value = '';
  }

  onCommunityImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.communityImageUrls = [
          ...this.communityImageUrls,
          reader.result as string,
        ];
      };
      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  removeCommunityImage(index: number): void {
    this.communityImageUrls = this.communityImageUrls.filter(
      (_, imageIndex) => imageIndex !== index,
    );
  }

  saveCommunity(): void {
    const name =
      this.communityTypeSelection === 'other'
        ? this.customCommunityType.trim()
        : this.communityTypeSelection || this.communityName.trim();
    if (!name || !this.communityImageUrls.length) return;

    const requests = this.communityImageUrls.map((imageUrl) =>
      this.adminContent.saveStudentZoneItem({
        title: name,
        category: 'UBSSF Community',
        imageUrl,
        altText: `${name} community image`,
        isActive: true,
      }),
    );

    forkJoin(requests).subscribe((savedItems) => {
      this.communityImages = [...savedItems, ...this.communityImages];
      this.studentZone = [...savedItems, ...this.studentZone];
      this.communityName = '';
      this.communityImageUrls = [];
      this.communityTypeSelection = '';
      this.customCommunityType = '';
    });
  }

  deleteCommunityImage(index: number): void {
    const item = this.communityImages[index];
    this.adminContent.deleteStudentZoneItem(item.id).subscribe(() => {
      this.communityImages = this.communityImages.filter((_, i) => i !== index);
      this.studentZone = this.studentZone.filter((candidate) => candidate.id !== item.id);
    });
  }

  saveGalleryItem(): void {
    if (!this.newGalleryItem.title.trim() || !this.newGalleryItem.imageUrl.trim()) return;

    this.adminContent.saveGalleryItem(this.newGalleryItem).subscribe((res) => {
      this.gallery = [res, ...this.gallery];
      this.newGalleryItem = {
        title: '',
        category: 'Campus',
        imageUrl: '',
        altText: '',
        isActive: true,
      };
    });
  }

  deleteGalleryItem(index: number): void {
    const item = this.gallery[index];
    this.adminContent.deleteGalleryItem(item.id).subscribe(() => {
      this.gallery = this.gallery.filter((_, i) => i !== index);
    });
  }

  saveStudentZoneItem(): void {
    if (!this.newGalleryItem.title.trim() || !this.newGalleryItem.imageUrl.trim()) return;

    const studentZoneItem: GalleryItem = {
      ...this.newGalleryItem,
      category: 'Student Zone',
    };

    this.adminContent.saveStudentZoneItem(studentZoneItem).subscribe((res) => {
      this.studentZone = [res, ...this.studentZone];
      this.newGalleryItem = {
        title: '',
        category: 'Campus',
        imageUrl: '',
        altText: '',
        isActive: true,
      };
    });
  }

  deleteStudentZoneItem(index: number): void {
    const item = this.studentZone[index];
    this.adminContent.deleteStudentZoneItem(item.id).subscribe(() => {
      this.studentZone = this.studentZone.filter((_, i) => i !== index);
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}