import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../../config/api-urls';
import { AlumniProfile } from '../../models/alumni-profile.model';

@Injectable({ providedIn: 'root' })
export class AlumniContentService {
  private readonly sessionTokenKey = 'ubs-admin-token';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AlumniProfile[]> {
    return this.http.get<AlumniProfile[]>(API_URLS.alumni.getAll);
  }

  insert(profile: AlumniProfile): Observable<AlumniProfile> {
    return this.http.post<AlumniProfile>(
      API_URLS.alumni.insert,
      profile,
      this.getRequestOptions(),
    );
  }

  update(profile: AlumniProfile): Observable<AlumniProfile> {
    return this.http.post<AlumniProfile>(
      API_URLS.alumni.update,
      profile,
      this.getRequestOptions(),
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.post<boolean>(
      API_URLS.alumni.delete(id),
      undefined,
      this.getRequestOptions(),
    );
  }

  private getRequestOptions(): { headers: HttpHeaders } {
    const token =
      typeof window === 'undefined'
        ? null
        : window.sessionStorage?.getItem(this.sessionTokenKey) ?? null;

    return {
      headers: token
        ? new HttpHeaders({ Authorization: `Bearer ${token}` })
        : new HttpHeaders(),
    };
  }
}
