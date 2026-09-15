import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

interface LiveStatus {
  isLive: boolean;
  channelUrl: string;
}

@Injectable({ providedIn: 'root' })
export class LiveStatusService {
  private apiUrl = 'https://localhost:7257/api/Live';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getStatus(): Observable<LiveStatus> {
    return this.http.get<LiveStatus>(`${this.apiUrl}/GetStatus`);
  }

  setStatus(isLive: boolean): Observable<LiveStatus> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
    return this.http.post<LiveStatus>(
      `${this.apiUrl}/SetStatus`,
      { isLive },
      { headers }
    );
  }
}