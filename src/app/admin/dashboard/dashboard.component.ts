import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { QuillModule, QuillModules } from 'ngx-quill';
import { LiveStatusService } from '../../services/dashboard/live-status.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { SiteContentService } from '../../services/admin/site-content.service';
import {
  AdminContentService,
  AdmissionsConfig,
  BannerItem,
  GalleryItem,
  NotificationItem,
  PeopleProfile,
  PublicationItem,
  SiteConfig,
  TuitionFeeRow,
} from '../../services/admin/admin-content.service';
import { AdminShellComponent } from './components/admin-shell/admin-shell.component';
import { AdminSidebarComponent, AdminSidebarItem } from './components/admin-sidebar/admin-sidebar.component';
import { LiveBroadcastComponent } from './components/live-broadcast/live-broadcast.component';
import { SafeRichTextPipe, sanitizeRichTextHtml } from '../../shared/pipes/safe-rich-text.pipe';

type SectionId =
  | 'overview'
  | 'live'
  | 'updates'
  | 'banners'
  | 'site-config'
  | 'people'
  | 'tuition'
  | 'admissions'
  | 'publications'
  | 'gallery'
  | 'community'
  | 'student-zone';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    QuillModule,
    SafeRichTextPipe,
    AdminShellComponent,
    AdminSidebarComponent,
    LiveBroadcastComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  readonly notificationEditorModules: QuillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ font: [] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ color: [] }],
      ['link'],
      ['clean'],
    ],
  };
  readonly notificationEditorFormats = [
    'header',
    'size',
    'font',
    'bold',
    'italic',
    'underline',
    'list',
    'align',
    'color',
    'link',
  ];

  isLive = false;
  sidebarOpen = false;
  announcements: string[] = [];
  banners: BannerItem[] = [];
  notifications: NotificationItem[] = [];
  notificationError = '';
  peopleError = '';
  publicationError = '';
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

  editingTuitionId: number | null = null;

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
    imageUrl: '',
    isActive: true,
    type: 'announcement',
  };

  newBanner: BannerItem = {
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    isActive: true,
  };
  bannerImageUrls: string[] = [];
  bannerFileNames: string[] = [];
  bannerError = '';
  bannerSaving = false;

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
  editingFacultyId: number | null = null;
  facultyPdfFileName = '';
  facultyPdfError = '';
  publicationPdfFileName = '';
  publicationPdfError = '';

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
    pdfPath: '',
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
    // { id: 'overview', label: 'Overview', icon: 'fa-gauge-high' },
    { id: 'live', label: 'Live Broadcast', icon: 'fa-video' },
    { id: 'updates', label: 'Updates', icon: 'fa-bell' },
    { id: 'banners', label: 'Banners', icon: 'fa-images' },
    // { id: 'site-config', label: 'Site Config', icon: 'fa-gear' },
    { id: 'people', label: 'People', icon: 'fa-user' },
    { id: 'tuition', label: 'Tuition', icon: 'fa-indian-rupee-sign' },
    { id: 'admissions', label: 'Admissions', icon: 'fa-clipboard-check' },
    { id: 'publications', label: 'Publications', icon: 'fa-book' },
    { id: 'gallery', label: 'Gallery', icon: 'fa-images' },
    { id: 'community', label: 'Community', icon: 'fa-people-group' },
    // { id: 'student-zone', label: 'Student Zone', icon: 'fa-school' },
  ];

  activeSection: SectionId = 'live';

  constructor(
    private liveService: LiveStatusService,
    private auth: AuthService,
    private router: Router,
    private siteContent: SiteContentService,
    private adminContent: AdminContentService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: object,
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

    this.adminContent.getBanners().subscribe({
      next: (res) => {
        this.banners = res;
      },
      error: () => {
        this.bannerError = 'Unable to load banners. Please try again.';
      },
    });

    forkJoin([this.adminContent.getPeople(), this.adminContent.getFaculty()]).subscribe(([people, faculty]) => {
           this.people = [...people.filter((p) => p.category !== 'faculty'), ...faculty];
          });

          this.adminContent.getTuitionRows().subscribe((res) => {
            this.tuitionRows = res.map((r) => this.normalizeTuitionRow(r));
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

    this.notificationError = '';
    const payload: NotificationItem = {
      ...this.newNotification,
      description: sanitizeRichTextHtml(
        this.newNotification.description,
        this.sanitizer,
        this.platformId,
      ),
      type: this.newNotification.type ?? 'announcement',
    };

    this.adminContent.saveNotification(payload).subscribe(() => {
      this.adminContent.getNotifications().subscribe((notifications) => {
        this.notifications = notifications;
      });
      this.newNotification = {
        title: '',
        description: '',
        link: '',
        imageUrl: '',
        isActive: true,
        type: 'announcement',
      };
    }, () => {
      this.notificationError = 'Unable to save update. Please try again.';
    });
  }

  deleteNotification(index: number): void {
    const item = this.notifications[index];
    this.notificationError = '';
    this.adminContent.deleteNotification(item.id).subscribe(() => {
      this.notifications = this.notifications.filter((_, i) => i !== index);
    }, () => {
      this.notificationError = 'Unable to remove update. Please try again.';
    });
  }

  async onBannerSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.bannerError = '';

    if (!files.length) {
      return;
    }

    if (files.some((file) => !file.type.startsWith('image/'))) {
      this.bannerError = 'Please select image files only.';
      input.value = '';
      return;
    }

    input.value = '';

    try {
      const imageUrls = await Promise.all(
        files.map(
          (file) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                if (typeof reader.result === 'string') {
                  resolve(reader.result);
                } else {
                  reject(new Error(`Unable to read ${file.name}.`));
                }
              };
              reader.onerror = () => reject(new Error(`Unable to read ${file.name}.`));
              reader.readAsDataURL(file);
            }),
        ),
      );

      this.bannerImageUrls = [...this.bannerImageUrls, ...imageUrls];
      this.bannerFileNames = [...this.bannerFileNames, ...files.map((file) => file.name)];
    } catch (error) {
      this.bannerError =
        error instanceof Error ? error.message : 'The selected images could not be read.';
    }
  }

  removeBannerImage(index: number): void {
    this.bannerImageUrls = this.bannerImageUrls.filter((_, imageIndex) => imageIndex !== index);
    this.bannerFileNames = this.bannerFileNames.filter((_, fileIndex) => fileIndex !== index);
    this.bannerError = '';
  }

  saveBanner(): void {
    if (!this.bannerImageUrls.length) {
      this.bannerError = 'Upload at least one image before saving the banners.';
      return;
    }

    this.bannerSaving = true;
    forkJoin(
      this.bannerImageUrls.map((imageUrl) =>
        this.adminContent.saveBanner({ ...this.newBanner, imageUrl }),
      ),
    ).subscribe({
      next: (savedBanners) => {
        this.banners = [...savedBanners, ...this.banners];
        this.newBanner = {
          title: '',
          description: '',
          imageUrl: '',
          link: '',
          isActive: true,
        };
        this.bannerImageUrls = [];
        this.bannerFileNames = [];
        this.bannerError = '';
        this.bannerSaving = false;
      },
      error: () => {
        this.bannerError = 'Unable to save banner images. Please try again.';
        this.bannerSaving = false;
      },
    });
  }

  deleteBanner(index: number): void {
    const banner = this.banners[index];
    this.adminContent.deleteBanner(banner.id).subscribe({
      next: () => {
        this.banners = this.banners.filter((_, bannerIndex) => bannerIndex !== index);
        this.bannerError = '';
      },
      error: () => {
        this.bannerError = 'Unable to remove banner. Please try again.';
      },
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

    this.peopleError = '';
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

    const save$ = person.category === 'faculty'
      ? this.editingFacultyId !== null
        ? this.adminContent.updateFaculty({ ...person, id: this.editingFacultyId })
        : this.adminContent.saveFaculty(person)
      : this.adminContent.savePerson(person);

    save$.subscribe((res) => {
      this.people = this.editingFacultyId !== null
        ? this.people.map((item) => item.id === this.editingFacultyId ? res : item)
        : [res, ...this.people];
      this.editingFacultyId = null;
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
      this.facultyPdfFileName = '';
      this.facultyPdfError = '';
    }, () => {
      this.peopleError = 'Unable to save this profile. Please try again.';
    });
  }

  editFaculty(person: PeopleProfile): void {
    if (person.id === undefined) return;

    this.peopleError = '';
    this.adminContent.getFacultyById(person.id).subscribe((faculty) => {
      this.editingFacultyId = person.id ?? null;
      this.newPerson = {
        ...this.newPerson,
        ...faculty,
        category: 'faculty',
        quote: faculty.additionalDesignation ?? '',
      };
      this.facultyTypeSelection = this.facultyDepartmentOptions.includes(faculty.department ?? '')
        ? faculty.department ?? ''
        : faculty.department
          ? 'other'
          : '';
      this.customFacultyType = this.facultyTypeSelection === 'other'
        ? faculty.department ?? ''
        : '';
      this.facultyQualificationText = (faculty.qualification ?? []).join('\n');
      this.facultySpecializationText = (faculty.specialization ?? []).join('\n');
      this.facultyBooksText = (faculty.books ?? []).join('\n');
      this.facultyResearchText = (faculty.research ?? []).join('\n');
      this.facultyArticlesText = (faculty.articles ?? []).join('\n');
      this.facultyJournalsText = (faculty.journals ?? []).join('\n');
      this.facultyPdfFileName = '';
      this.facultyPdfError = '';
      this.activeSection = 'people';
    }, () => {
      this.peopleError = 'Unable to load this faculty profile. Please try again.';
    });
  }

  cancelFacultyEdit(): void {
    this.editingFacultyId = null;
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
    this.facultyPdfFileName = '';
    this.facultyPdfError = '';
  }

  deletePerson(index: number): void {
    const item = this.people[index];
    this.peopleError = '';
    const delete$ = item.category === 'faculty'
      ? this.adminContent.deleteFaculty(item.id)
      : this.adminContent.deletePerson(item.id);

    delete$.subscribe(() => {
      this.people = this.people.filter((_, i) => i !== index);
    }, () => {
      this.peopleError = 'Unable to remove this profile. Please try again.';
    });
  }

  private normalizeTuitionRow(row: TuitionFeeRow): TuitionFeeRow {
    return {
      ...row,
      programmeType: row.programmeType ?? 'residential',
      course: row.course || row.programmeName || '',
      singleStudent: row.singleStudent ?? row.mainCampus ?? '',
      marriedStudentWithQuarters: row.marriedStudentWithQuarters ?? row.onlineCampus ?? '',
      english: row.english ?? '',
      hindi: row.hindi ?? '',
      marathi: row.marathi ?? '',
    };
  }

  private emptyTuitionRow(): TuitionFeeRow {
    return {
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
  }
  
  saveTuitionRow(): void {
    const courseName = (this.newTuitionRow.course ?? '').trim();
    if (!courseName) return;
  
    const type = this.newTuitionRow.programmeType ?? 'residential';
    const isResidential = type === 'residential';
    const r = this.newTuitionRow;
  
    const payload: TuitionFeeRow = {
      programmeType: type,
      course: courseName,
      programmeName: courseName,
      academicYear: r.academicYear ?? '2026-27',
      isActive: true,
  
      singleStudent: isResidential ? r.singleStudent ?? '' : '',
      marriedStudentWithQuarters: isResidential ? r.marriedStudentWithQuarters ?? '' : '',
      english: isResidential ? '' : r.english ?? '',
      hindi: isResidential ? '' : r.hindi ?? '',
      marathi: isResidential ? '' : r.marathi ?? '',
  
      // legacy mapping
      mainCampus: isResidential ? r.singleStudent ?? '' : r.english ?? '',
      onlineCampus: isResidential ? r.marriedStudentWithQuarters ?? '' : r.hindi ?? '',
      extension: isResidential ? '' : r.marathi ?? '',
    };
  
    if (this.editingTuitionId !== null) {
      // UPDATE
      this.adminContent
        .updateTuitionRow({ ...payload, id: this.editingTuitionId })
        .subscribe((res) => {
          this.tuitionRows = this.tuitionRows.map((row) =>
            row.id === this.editingTuitionId ? this.normalizeTuitionRow(res) : row,
          );
          this.cancelTuitionEdit();
        });
      return;
    }
  
    // INSERT (new rows are added at the end, matching the SP)
    this.adminContent.saveTuitionRow(payload).subscribe((res) => {
      this.tuitionRows = [...this.tuitionRows, this.normalizeTuitionRow(res)];
      this.newTuitionRow = this.emptyTuitionRow();
    });
  }
  
  editTuitionRow(item: TuitionFeeRow): void {
    this.editingTuitionId = item.id ?? null;
    this.newTuitionRow = { ...item };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  cancelTuitionEdit(): void {
    this.editingTuitionId = null;
    this.newTuitionRow = this.emptyTuitionRow();
  }
  
  // Move a row up (-1) or down (+1) within its own programme type
  canMoveTuition(item: TuitionFeeRow, direction: -1 | 1): boolean {
    const group = this.tuitionRows.filter((r) => r.programmeType === item.programmeType);
    const pos = group.indexOf(item);
    const target = pos + direction;
    return pos !== -1 && target >= 0 && target < group.length;
  }
  
  moveTuitionRow(item: TuitionFeeRow, direction: -1 | 1): void {
    if (!this.canMoveTuition(item, direction)) return;
  
    const sameType = this.tuitionRows
      .map((row, index) => ({ row, index }))
      .filter((x) => x.row.programmeType === item.programmeType);
  
    const pos = sameType.findIndex((x) => x.row === item);
    const a = sameType[pos].index;
    const b = sameType[pos + direction].index;
  
    const previous = this.tuitionRows;
    const rows = [...this.tuitionRows];
    [rows[a], rows[b]] = [rows[b], rows[a]];
    this.tuitionRows = rows;
  
    this.adminContent
      .reorderTuitionRows(rows.map((r) => r.id!))
      .subscribe({ error: () => (this.tuitionRows = previous) }); // revert if the save fails
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

    this.publicationError = '';
    this.adminContent.savePublication(this.newPublication).subscribe((res) => {
      this.publications = [res, ...this.publications];
      this.newPublication = {
        title: '',
        description: '',
        status: 'Draft',
        category: 'Research',
        coverImageUrl: '',
        pdfPath: '',
        publishedDate: new Date().toISOString().slice(0, 10),
        link: '',
        isFeatured: false,
        isActive: true,
      };
      this.publicationPdfFileName = '';
      this.publicationPdfError = '';
    }, () => {
      this.publicationError = 'Unable to save publication. Please try again.';
    });
  }

  deletePublication(index: number): void {
    const item = this.publications[index];
    this.publicationError = '';
    this.adminContent.deletePublication(item.id).subscribe(() => {
      this.publications = this.publications.filter((_, i) => i !== index);
    }, () => {
      this.publicationError = 'Unable to remove publication. Please try again.';
    });
  }

  onImageSelected(
    event: Event,
    target: 'person' | 'publication' | 'gallery' | 'student-zone' | 'notification',
  ): void {
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
      } else if (target === 'notification') {
        this.newNotification.imageUrl = dataUrl;
      } else {
        this.newGalleryItem.imageUrl = dataUrl;
      }
    };

    reader.readAsDataURL(file);
    input.value = '';
  }

  onFacultyPdfSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.facultyPdfError = '';

    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      this.facultyPdfError = 'Please select a PDF file.';
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        this.facultyPdfError = 'The selected PDF could not be read.';
        return;
      }

      this.newPerson.pdfPath = reader.result;
      this.facultyPdfFileName = file.name;
    };
    reader.onerror = () => {
      this.facultyPdfError = 'The selected PDF could not be read.';
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  onPublicationPdfSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.publicationPdfError = '';

    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      this.publicationPdfError = 'Please select a PDF file.';
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        this.publicationPdfError = 'The selected PDF could not be read.';
        return;
      }

      this.newPublication.pdfPath = reader.result;
      this.publicationPdfFileName = file.name;
    };
    reader.onerror = () => {
      this.publicationPdfError = 'The selected PDF could not be read.';
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  clearPublicationPdf(): void {
    this.newPublication.pdfPath = '';
    this.publicationPdfFileName = '';
    this.publicationPdfError = '';
  }

  clearFacultyPdf(): void {
    this.newPerson.pdfPath = '';
    this.facultyPdfFileName = '';
    this.facultyPdfError = '';
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