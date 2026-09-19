import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URLS } from '../../config/api-urls';

export interface SiteConfig {
  admissionsEmail: string;
  registrarEmail: string;
  principalEmail: string;
  libraryEmail: string;
  supportPhone: string;
  youtubeChannelUrl: string;
}

export interface NotificationItem {
  id?: number;
  title: string;
  description: string;
  link: string;
  isActive: boolean;
  createdAt?: string;
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
  private readonly baseUrl = API_URLS.live.status.replace('/live/status', '');
  private readonly fallbackBaseUrl = 'https://localhost:7257';
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

  getLiveStatus(): Observable<LiveStatus> {
    return this.http
      .get<LiveStatus>(API_URLS.live.status)
      .pipe(
        catchError(() =>
          this.http
            .get<LiveStatus>(API_URLS.live.statusLocal)
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
      .put<LiveStatus>(API_URLS.live.status, payload, this.getRequestOptions())
      .pipe(catchError(() => of(payload)));
  }

  getSiteConfig(): Observable<SiteConfig> {
    return this.http
      .get<SiteConfig>(API_URLS.siteConfig.root)
      .pipe(catchError(this.asFallback(this.fallbackSiteConfig)));
  }

  saveSiteConfig(config: SiteConfig): Observable<SiteConfig> {
    return this.http
      .put<SiteConfig>(API_URLS.siteConfig.root, config, this.getRequestOptions())
      .pipe(catchError(() => of(config)));
  }

  getNotifications(): Observable<NotificationItem[]> {
    return this.http
      .get<NotificationItem[]>(API_URLS.notifications.root)
      .pipe(catchError(this.asFallback(this.fallbackNotifications)));
  }

  saveNotification(item: NotificationItem): Observable<NotificationItem> {
    return this.http
      .post<NotificationItem>(API_URLS.notifications.root, item, this.getRequestOptions())
      .pipe(catchError(() => of(item)));
  }

  deleteNotification(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .delete<boolean>(`${API_URLS.notifications.root}/${id}`, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getPeople(): Observable<PeopleProfile[]> {
    return this.http
      .get<PeopleProfile[]>(API_URLS.people.root)
      .pipe(catchError(this.asFallback(this.fallbackPeople)));
  }

  savePerson(person: PeopleProfile): Observable<PeopleProfile> {
    return this.http
      .post<PeopleProfile>(API_URLS.people.root, person, this.getRequestOptions())
      .pipe(catchError(() => of(person)));
  }

  deletePerson(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .delete<boolean>(`${API_URLS.people.root}/${id}`, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getTuitionRows(): Observable<TuitionFeeRow[]> {
    return this.http
      .get<TuitionFeeRow[]>(API_URLS.fees.root)
      .pipe(catchError(this.asFallback(this.fallbackTuitionRows)));
  }

  saveTuitionRow(row: TuitionFeeRow): Observable<TuitionFeeRow> {
    return this.http
      .post<TuitionFeeRow>(API_URLS.fees.root, row, this.getRequestOptions())
      .pipe(catchError(() => of(row)));
  }

  deleteTuitionRow(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .delete<boolean>(`${API_URLS.fees.root}/${id}`, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getAdmissions(): Observable<AdmissionsConfig> {
    return this.http
      .get<AdmissionsConfig>(API_URLS.admissions.essentials)
      .pipe(catchError(this.asFallback(this.fallbackAdmissions)));
  }

  saveAdmissions(config: AdmissionsConfig): Observable<AdmissionsConfig> {
    return this.http
      .put<AdmissionsConfig>(API_URLS.admissions.essentials, config, this.getRequestOptions())
      .pipe(catchError(() => of(config)));
  }

  getPublications(): Observable<PublicationItem[]> {
    return this.http
      .get<PublicationItem[]>(API_URLS.publications.root)
      .pipe(catchError(this.asFallback(this.fallbackPublications)));
  }

  savePublication(item: PublicationItem): Observable<PublicationItem> {
    return this.http
      .post<PublicationItem>(API_URLS.publications.root, item, this.getRequestOptions())
      .pipe(catchError(() => of(item)));
  }

  deletePublication(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .delete<boolean>(`${API_URLS.publications.root}/${id}`, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getGalleryItems(): Observable<GalleryItem[]> {
    return this.http
      .get<GalleryItem[]>(API_URLS.gallery.root)
      .pipe(catchError(this.asFallback(this.fallbackGallery)));
  }

  saveGalleryItem(item: GalleryItem): Observable<GalleryItem> {
    return this.http
      .post<GalleryItem>(API_URLS.gallery.root, item, this.getRequestOptions())
      .pipe(catchError(() => of(item)));
  }

  deleteGalleryItem(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .delete<boolean>(`${API_URLS.gallery.root}/${id}`, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }

  getStudentZoneItems(): Observable<GalleryItem[]> {
    return this.http
      .get<GalleryItem[]>(API_URLS.studentZone.root)
      .pipe(catchError(this.asFallback(this.fallbackGallery)));
  }

  saveStudentZoneItem(item: GalleryItem): Observable<GalleryItem> {
    return this.http
      .post<GalleryItem>(API_URLS.studentZone.root, item, this.getRequestOptions())
      .pipe(catchError(() => of(item)));
  }

  deleteStudentZoneItem(id?: number): Observable<boolean> {
    if (!id) {
      return of(true);
    }

    return this.http
      .delete<boolean>(`${API_URLS.studentZone.root}/${id}`, this.getRequestOptions())
      .pipe(catchError(() => of(true)));
  }
}
