import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { API_URLS } from '../../config/api-urls';

interface LiveStatus {
  isLive: boolean;
  channelUrl: string;
}

@Injectable({ providedIn: 'root' })
export class LiveStatusService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getStatus(): Observable<LiveStatus> {
    return this.http.get<LiveStatus>(API_URLS.live.getStatus);
  }

  setStatus(isLive: boolean): Observable<LiveStatus> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    return this.http.post<LiveStatus>(
      API_URLS.live.setStatus,
      { isLive, channelUrl: 'https://youtube.com/@unionbsmedia' },
      { headers }
    );
  }
}