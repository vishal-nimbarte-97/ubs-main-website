import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_ROOT_URL, API_URLS } from '../../config/api-urls';
import { TuitionFeeRow } from '../../models/tuition.model';

export type { TuitionFeeRow } from '../../models/tuition.model';

export interface SiteConfig {
  admissionsEmail: string;
  registrarEmail: string;
  principalEmail: string;
  libraryEmail: string;
  supportPhone: string;
  youtubeChannelUrl: string;
}

export type NotificationType = 'announcement' | 'news' | 'event';

export interface NotificationItem {
  id?: number;
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt?: string;
  type?: NotificationType;
}

export interface BannerItem {
  id?: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isActive: boolean;
}

export interface PeopleProfile {
  id?: number;
  name: string;
  designation: string;
  category: string;
  imageUrl: string;
  quote: string;
  bio: string;
  isActive: boolean;
  email?: string;
  department?: string;
  qualificationTitle?: string;
  qualification?: string[];
  specialization?: string[];
  books?: string[];
  research?: string[];
  articles?: string[];
  journals?: string[];
  pdfPath?: string;
  additionalDesignation?: string;
}

export type FacultyProfile = FacultyApiProfile;

export interface FacultyApiProfile {
  id?: number | null;
  name?: string | null;
  designation?: string | null;
  additionalDesignation?: string | null;
  department?: string | null;
  qualificationTitle?: string | null;
  email?: string | null;
  imageUrl?: string | null;
  bio?: string | null;
  pdfPath?: string | null;
  isActive: boolean;
  createdAt?: string | null;
  qualification?: string[] | null;
  specialization?: string[] | null;
  books?: string[] | null;
  research?: string[] | null;
  articles?: string[] | null;
  journals?: string[] | null;
}

export interface EnquiryRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export interface AdmissionContact {
  label: string;
  email: string;
}

export interface AdmissionDeadline {
  programme: string;
  date: string;
}

export interface AdmissionFeeItem {
  label: string;
  value: string;
}

export interface AdmissionsConfig {
  programmeType: string;
  academicYear: string;
  fees: AdmissionFeeItem[];
  deadlines: AdmissionDeadline[];
  contacts: AdmissionContact[];
}

export interface PublicationItem {
  id?: number;
  title: string;
  description: string;
  status: string;
  category: string;
  coverImageUrl: string;
  pdfPath?: string;
  publishedDate: string;
  link: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface GalleryItem {
  id?: number;
  title: string;
  category: string;
  imageUrl: string;
  altText: string;
  isActive: boolean;
}

export interface LiveStatus {
  isLive: boolean;
  channelUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AdminContentService {
  private readonly sessionTokenKey = 'ubs-admin-token';

  private readonly fallbackSiteConfig: SiteConfig = {
    admissionsEmail: 'admissions@ubs.ac.in',
    registrarEmail: 'registrar@ubs.ac.in',
    principalEmail: 'principal@ubs.ac.in',
    libraryEmail: 'library@ubs.ac.in',
    supportPhone: '+91-00000-00000',
    youtubeChannelUrl: 'https://youtube.com/@unionbsmedia?si=zYmglMFw-xPmCV4t',
  };

  private readonly fallbackNotifications: NotificationItem[] = [
    {
      id: 1,
      title: 'Admissions Open for 2026-27',
      description: 'Applications are open for the new intake.',
      link: '/apply',
      isActive: true,
      createdAt: '2026-09-19T00:00:00Z',
    },
  ];

  private readonly fallbackPeople: PeopleProfile[] = [
    {
      id: 1,
      name: 'Dr. W.S. Annie',
      designation: 'Principal',
      category: 'principal',
      imageUrl: 'assets/img/principal.png',
      quote: 'Speaking the Truth in Love',
      bio: 'Principal profile for UBS.',
      isActive: true,
    },
    {
      id: 2,
      name: 'Mr. Sungjemmeren Kijong Imchen',
      designation: 'Librarian',
      category: 'librarian',
      imageUrl: 'assets/library/librarian.png',
      quote: 'Knowledge is a gift to be shared.',
      bio: 'Library profile for UBS.',
      isActive: true,
    },
  ];

  private readonly fallbackTuitionRows: TuitionFeeRow[] = [
    {
      id: 1,
      programmeName: 'Residential programmes',
      mainCampus: 'To be updated',
      onlineCampus: 'Not applicable',
      extension: 'Not applicable',
      academicYear: '2026-27',
      isActive: true,
    },
  ];

  private readonly fallbackAdmissions: AdmissionsConfig = {
    programmeType: 'residential',
    academicYear: '2026-27',
    fees: [
      { label: 'Application fee', value: '₹800' },
      { label: 'Late fee', value: '₹500' },
    ],
    deadlines: [
      { programme: 'BD / M.Th. / D.Th.', date: '19 January 2026' },
    ],
    contacts: [
      { label: 'Application forms', email: 'registrar@ubs.ac.in' },
      { label: 'Admissions', email: 'admissions@ubs.ac.in' },
    ],
  };

  private readonly fallbackPublications: PublicationItem[] = [
    {
      id: 1,
      title: 'Future Publication',
      description: 'Academic content will be published here soon.',
      status: 'Coming Soon',
      category: 'Research',
      coverImageUrl: 'assets/img/home.png',
      publishedDate: '2026-09-19',
      link: '#',
      isFeatured: false,
      isActive: true,
    },
  ];

  private readonly fallbackGallery: GalleryItem[] = [
    {
      id: 1,
      title: 'Campus Life',
      category: 'Campus',
      imageUrl: 'assets/gallery/image_1.jpg',
      altText: 'UBS campus image',
      isActive: true,
    },
  ];

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token =
      typeof window === 'undefined'
        ? null
        : window.sessionStorage?.getItem(this.sessionTokenKey) ?? null;

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private getRequestOptions() {
    return { headers: this.getAuthHeaders() };
  }

  private normalizeApiImageUrl(imageUrl?: string): string {
    const normalizedUrl = imageUrl?.trim() ?? '';
    const apiUploadPath = /^\/?uploads\//i.test(normalizedUrl);

    return apiUploadPath
      ? new URL(`/${normalizedUrl.replace(/^\/+/, '')}`, API_ROOT_URL).toString()
      : normalizedUrl;
  }

  private normalizePeopleProfile(person: PeopleProfile): PeopleProfile {
    return {
      ...person,
      imageUrl: this.normalizeApiImageUrl(person.imageUrl),
      pdfPath: this.normalizeApiImageUrl(person.pdfPath),
    };
  }

  private normalizeFacultyProfile(faculty: FacultyApiProfile): FacultyApiProfile {
    return {
      ...faculty,
      imageUrl: this.normalizeApiImageUrl(faculty.imageUrl ?? undefined),
      pdfPath: this.normalizeApiImageUrl(faculty.pdfPath ?? undefined),
    };
  }

  private toPeopleProfile(faculty: FacultyApiProfile): PeopleProfile {
    return {
      id: faculty.id ?? undefined,
      name: faculty.name ?? '',
      designation: faculty.designation ?? '',
      additionalDesignation: faculty.additionalDesignation ?? '',
      category: 'faculty',
      imageUrl: faculty.imageUrl ?? '',
      quote: faculty.additionalDesignation ?? '',
      bio: faculty.bio ?? '',
      isActive: faculty.isActive,
      email: faculty.email ?? '',
      department: faculty.department ?? '',
      qualificationTitle: faculty.qualificationTitle ?? '',
      qualification: faculty.qualification ?? [],
      specialization: faculty.specialization ?? [],
      books: faculty.books ?? [],
      research: faculty.research ?? [],
      articles: faculty.articles ?? [],
      journals: faculty.journals ?? [],
      pdfPath: faculty.pdfPath ?? '',
    };
  }

  private toFacultyApiProfile(person: PeopleProfile): FacultyApiProfile {
    return {
      id: person.id,
      name: person.name,
      designation: person.designation,
      additionalDesignation: person.additionalDesignation ?? person.quote ?? '',
      department: person.department ?? '',
      qualificationTitle: person.qualificationTitle ?? '',
      email: person.email ?? '',
      imageUrl: person.imageUrl,
      bio: person.bio,
      pdfPath: person.pdfPath ?? '',
      isActive: person.isActive,
      qualification: person.qualification ?? [],
      specialization: person.specialization ?? [],
      books: person.books ?? [],
      research: person.research ?? [],
      articles: person.articles ?? [],
      journals: person.journals ?? [],
    };
  }

  private asFallback<T>(fallback: T) {
    return () => of(fallback);
  }

  private normalizeNotification(item: NotificationItem): NotificationItem {
    const text = `${item.title ?? ''} ${item.description ?? ''}`.toLowerCase();

    let type: NotificationType = 'announcement';
    if (text.includes('event')) {
      type = 'event';
    } else if (text.includes('news')) {
      type = 'news';
    }

    return {
      ...item,
      type: (item.type ?? type) as NotificationType,
      imageUrl: this.normalizeApiImageUrl(item.imageUrl),
    };
  }

  getLiveStatus(): Observable<LiveStatus> {
    return this.http
      .get<LiveStatus>(API_URLS.live.getStatus, this.getRequestOptions())
      .pipe(
        catchError(() =>
          this.http
            .get<LiveStatus>(API_URLS.live.getStatusLocal, this.getRequestOptions())
            .pipe(
              catchError(() =>
                of({
                  isLive: false,
                  channelUrl:
                    'https://youtube.com/@unionbsmedia?si=zYmglMFw-xPmCV4t',
                }),
              ),
            ),
        ),
      );
  }

  setLiveStatus(isLive: boolean): Observable<LiveStatus> {
    const payload = {
      isLive,
      channelUrl: this.fallbackSiteConfig.youtubeChannelUrl,
    };

    return this.http
      .post<LiveStatus>(API_URLS.live.setStatus, payload, this.getRequestOptions())
      .pipe(catchError(() => of(payload)));
  }

  getSiteConfig(): Observable<SiteConfig> {
    return this.http
      .get<SiteConfig>(API_URLS.siteConfig.get, this.getRequestOptions())
      .pipe(catchError(this.asFallback(this.fallbackSiteConfig)));
  }

  saveSiteConfig(config: SiteConfig): Observable<SiteConfig> {
    return this.http
      .post<SiteConfig>(API_URLS.siteConfig.save, config, this.getRequestOptions())
      .pipe(catchError(() => of(config)));
  }

  getNotifications(): Observable<NotificationItem[]> {
    return this.http
      .get<NotificationItem[]>(API_URLS.notifications.getAll, this.getRequestOptions())
      .pipe(
        map((items) => (Array.isArray(items) ? items.map((item) => this.normalizeNotification(item)) : [])),
        catchError(() => of(this.fallbackNotifications.map((item) => this.normalizeNotification(item)))),
      );
  }

  getBanners(): Observable<BannerItem[]> {
    return this.http
      .get<BannerItem[]>(API_URLS.banners.getAll, this.getRequestOptions())
      .pipe(
        map((items) =>
          Array.isArray(items)
            ? items.map((item) => ({
                ...item,
                imageUrl: this.normalizeApiImageUrl(item.imageUrl),
              }))
            : [],
        ),
      );
  }

  saveBanner(item: BannerItem): Observable<BannerItem> {
    return this.http
      .post<BannerItem>(API_URLS.banners.insert, item, this.getRequestOptions())
      .pipe(
        map((res) => ({
          ...item,
          ...(res ?? {}),
          imageUrl: this.normalizeApiImageUrl(res?.imageUrl ?? item.imageUrl),
        })),
      );
  }

  deleteBanner(id?: number): Observable<boolean> {
    if (!id) {
      return throwError(() => new Error('A saved banner ID is required for deletion.'));
    }

    return this.http
      .post<boolean>(API_URLS.banners.delete(id), undefined, this.getRequestOptions())
      .pipe(
        map((deleted) => {
          if (!deleted) {
            throw new Error('The banner could not be deleted.');
          }
          return true;
        }),
      );
  }

  saveNotification(item: NotificationItem): Observable<NotificationItem> {
    const payload: NotificationItem = {
      ...item,
      id: item.id ?? 0,
      type: item.type ?? 'announcement',
      createdAt: item.createdAt ?? new Date().toISOString(),
    };

    return this.http
      .post<NotificationItem>(API_URLS.notifications.insert, payload, this.getRequestOptions())
      .pipe(map((res) => this.normalizeNotification({ ...payload, ...(res ?? {}) })));
  }

  deleteNotification(id?: number): Observable<boolean> {
    if (!id) {
      return throwError(() => new Error('A saved notification ID is required for deletion.'));
    }

    return this.http
      .post<boolean>(API_URLS.notifications.delete(id), undefined, this.getRequestOptions())
      .pipe(
        map((deleted) => {
          if (!deleted) {
            throw new Error('The notification could not be deleted.');
          }
          return true;
        }),
      );
  }

  submitEnquiry(enquiry: EnquiryRequest): Observable<unknown> {
    return this.http.post<unknown>(API_URLS.enquiry.submit, enquiry);
  }

  getPeople(): Observable<PeopleProfile[]> {
    return this.http
      .get<PeopleProfile[]>(API_URLS.people.getAll, this.getRequestOptions())
      .pipe(
        map((people) =>
          Array.isArray(people) ? people.map((person) => this.normalizePeopleProfile(person)) : [],
        ),
        catchError(() =>
          of(this.fallbackPeople.map((person) => this.normalizePeopleProfile(person))),
        ),
      );
  }

  savePerson(person: PeopleProfile): Observable<PeopleProfile> {
    return this.http
      .post<PeopleProfile>(API_URLS.people.insert, person, this.getRequestOptions())
      .pipe(
        map((res) => this.normalizePeopleProfile({ ...person, ...(res ?? {}) })),
        catchError(() => of(this.normalizePeopleProfile(person))),
      );
  }

  deletePerson(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .post<boolean>(API_URLS.people.delete(id), undefined, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getTuitionRows(): Observable<TuitionFeeRow[]> {
    return this.http
      .get<TuitionFeeRow[]>(API_URLS.fees.getAll, this.getRequestOptions())
      .pipe(catchError(this.asFallback(this.fallbackTuitionRows)));
  }

  saveTuitionRow(row: TuitionFeeRow): Observable<TuitionFeeRow> {
    return this.http
      .post<TuitionFeeRow>(API_URLS.fees.insert, row, this.getRequestOptions())
      .pipe(catchError(() => of(row)));
  }

  deleteTuitionRow(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .post<boolean>(API_URLS.fees.delete(id), undefined, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getAdmissions(): Observable<AdmissionsConfig> {
    return this.http
      .get<AdmissionsConfig>(API_URLS.admissions.getEssentials, this.getRequestOptions())
      .pipe(catchError(this.asFallback(this.fallbackAdmissions)));
  }

  saveAdmissions(config: AdmissionsConfig): Observable<AdmissionsConfig> {
    return this.http
      .post<AdmissionsConfig>(API_URLS.admissions.saveEssentials, config, this.getRequestOptions())
      .pipe(catchError(() => of(config)));
  }

  getPublications(): Observable<PublicationItem[]> {
    return this.http
      .get<PublicationItem[]>(API_URLS.publications.getAll, this.getRequestOptions())
      .pipe(
        map((items) =>
          Array.isArray(items)
            ? items.map((item) => ({
                ...item,
                coverImageUrl: this.normalizeApiImageUrl(item.coverImageUrl),
                pdfPath: this.normalizeApiImageUrl(item.pdfPath),
              }))
            : [],
        ),
        catchError(this.asFallback(this.fallbackPublications)),
      );
  }

  savePublication(item: PublicationItem): Observable<PublicationItem> {
    const payload = {
      ...item,
      publishedDate: /^\d{4}-\d{2}-\d{2}$/.test(item.publishedDate)
        ? `${item.publishedDate}T00:00:00.000Z`
        : item.publishedDate,
    };

    return this.http
      .post<PublicationItem>(API_URLS.publications.insert, payload, this.getRequestOptions())
      .pipe(
        map((res) => ({
          ...payload,
          ...(res ?? {}),
          coverImageUrl: this.normalizeApiImageUrl(res?.coverImageUrl ?? payload.coverImageUrl),
          pdfPath: this.normalizeApiImageUrl(res?.pdfPath ?? payload.pdfPath),
        })),
      );
  }

  deletePublication(id?: number): Observable<boolean> {
    if (!id) {
      return throwError(() => new Error('A saved publication ID is required for deletion.'));
    }

    return this.http
      .post<boolean>(API_URLS.publications.delete(id), undefined, this.getRequestOptions())
      .pipe(
        map((deleted) => {
          if (!deleted) {
            throw new Error('The publication could not be deleted.');
          }
          return true;
        }),
      );
  }

  getGalleryItems(): Observable<GalleryItem[]> {
    return this.http
      .get<GalleryItem[]>(API_URLS.gallery.getAll, this.getRequestOptions())
      .pipe(
        map((items) =>
          Array.isArray(items)
            ? items.map((item) => ({
                ...item,
                imageUrl: this.normalizeApiImageUrl(item.imageUrl),
              }))
            : [],
        ),
        catchError(() =>
          of(this.fallbackGallery.map((item) => ({
            ...item,
            imageUrl: this.normalizeApiImageUrl(item.imageUrl),
          }))),
        ),
      );
  }

  saveGalleryItem(item: GalleryItem): Observable<GalleryItem> {
    return this.http
      .post<GalleryItem>(API_URLS.gallery.insert, item, this.getRequestOptions())
      .pipe(
        map((res) => ({
          ...item,
          ...(res ?? {}),
          imageUrl: this.normalizeApiImageUrl(res?.imageUrl ?? item.imageUrl),
        })),
        catchError(() =>
          of({ ...item, imageUrl: this.normalizeApiImageUrl(item.imageUrl) }),
        ),
      );
  }

  deleteGalleryItem(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .post<boolean>(API_URLS.gallery.delete(id), undefined, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getStudentZoneItems(): Observable<GalleryItem[]> {
    return this.http
      .get<GalleryItem[]>(API_URLS.studentZone.getAll, this.getRequestOptions())
      .pipe(catchError(this.asFallback(this.fallbackGallery)));
  }

  saveStudentZoneItem(item: GalleryItem): Observable<GalleryItem> {
    return this.http
      .post<GalleryItem>(API_URLS.studentZone.insert, item, this.getRequestOptions())
      .pipe(catchError(() => of(item)));
  }

  deleteStudentZoneItem(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .post<boolean>(API_URLS.studentZone.delete(id), undefined, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getFaculty(): Observable<PeopleProfile[]> {
    return this.http
      .get<FacultyApiProfile[]>(API_URLS.faculty.getAll, this.getRequestOptions())
      .pipe(
        map((people) =>
          Array.isArray(people)
            ? people.map((person) =>
                this.toPeopleProfile(this.normalizeFacultyProfile(person)),
              )
            : [],
        ),
        catchError(() => of([])),
      );
  }

  getFacultyById(id: number): Observable<PeopleProfile> {
    return this.http
      .get<FacultyApiProfile>(API_URLS.faculty.getById(id), this.getRequestOptions())
      .pipe(
        map((faculty) =>
          this.toPeopleProfile(this.normalizeFacultyProfile(faculty)),
        ),
      );
  }

  saveFaculty(person: PeopleProfile): Observable<PeopleProfile> {
    const payload = this.toFacultyApiProfile(person);
    return this.http
      .post<FacultyApiProfile>(API_URLS.faculty.insert, payload, this.getRequestOptions())
      .pipe(
        map((res) =>
          this.toPeopleProfile(
            this.normalizeFacultyProfile({ ...payload, ...(res ?? {}) }),
          ),
        ),
      );
  }

  updateFaculty(person: PeopleProfile): Observable<PeopleProfile> {
    const payload = this.toFacultyApiProfile(person);
    return this.http.post<FacultyApiProfile>(
      API_URLS.faculty.update,
      payload,
      this.getRequestOptions(),
    ).pipe(
      map((res) =>
        this.toPeopleProfile(
          this.normalizeFacultyProfile({ ...payload, ...(res ?? {}) }),
        ),
      ),
    );
  }

  getFile(fileId: string): Observable<Blob> {
    return this.http.get(API_URLS.files.get(fileId), {
      ...this.getRequestOptions(),
      responseType: 'blob',
    });
  }

  getWeatherForecast(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(API_URLS.weatherForecast);
  }

  deleteFaculty(id?: number): Observable<boolean> {
    if (!id) {
      return throwError(() => new Error('A saved faculty ID is required for deletion.'));
    }
    return this.http
      .post<boolean>(API_URLS.faculty.delete(id), undefined, this.getRequestOptions())
      .pipe(
        map((deleted) => {
          if (!deleted) {
            throw new Error('The faculty profile could not be deleted.');
          }
          return true;
        }),
      );
  }
}
