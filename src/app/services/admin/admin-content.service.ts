import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URLS } from '../../config/api-urls';

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
  isActive: boolean;
  createdAt?: string;
  type?: NotificationType;
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
}

export interface TuitionFeeRow {
  id?: number;
  programmeName: string;
  mainCampus: string;
  onlineCampus: string;
  extension: string;
  academicYear: string;
  isActive?: boolean;
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
    const token = sessionStorage.getItem(this.sessionTokenKey);

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  private getRequestOptions() {
    return { headers: this.getAuthHeaders() };
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

  saveNotification(item: NotificationItem): Observable<NotificationItem> {
    const { type, ...payload } = item;

    return this.http
      .post<NotificationItem>(API_URLS.notifications.insert, payload, this.getRequestOptions())
      .pipe(
        map((res) => this.normalizeNotification({ ...item, ...(res ?? {}) })),
        catchError(() => of(this.normalizeNotification(item))),
      );
  }

  deleteNotification(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .post<boolean>(API_URLS.notifications.delete(id), undefined, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getPeople(): Observable<PeopleProfile[]> {
    return this.http
      .get<PeopleProfile[]>(API_URLS.people.getAll, this.getRequestOptions())
      .pipe(catchError(this.asFallback(this.fallbackPeople)));
  }

  savePerson(person: PeopleProfile): Observable<PeopleProfile> {
    return this.http
      .post<PeopleProfile>(API_URLS.people.insert, person, this.getRequestOptions())
      .pipe(catchError(() => of(person)));
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
      .pipe(catchError(this.asFallback(this.fallbackPublications)));
  }

  savePublication(item: PublicationItem): Observable<PublicationItem> {
    return this.http
      .post<PublicationItem>(API_URLS.publications.insert, item, this.getRequestOptions())
      .pipe(catchError(() => of(item)));
  }

  deletePublication(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .post<boolean>(API_URLS.publications.delete(id), undefined, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getGalleryItems(): Observable<GalleryItem[]> {
    return this.http
      .get<GalleryItem[]>(API_URLS.gallery.getAll, this.getRequestOptions())
      .pipe(catchError(this.asFallback(this.fallbackGallery)));
  }

  saveGalleryItem(item: GalleryItem): Observable<GalleryItem> {
    return this.http
      .post<GalleryItem>(API_URLS.gallery.insert, item, this.getRequestOptions())
      .pipe(catchError(() => of(item)));
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
}
