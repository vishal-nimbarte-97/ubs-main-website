import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  isSuccess: boolean;
  message: string;
  email?: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7257/api/Auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/Login`, { email, password })
      .pipe(
        tap((res) => {
          if (res.isSuccess && res.token) {
            localStorage.setItem('ubs-admin-token', res.token);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('ubs-admin-token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('ubs-admin-token');
  }

  getToken(): string | null {
    return localStorage.getItem('ubs-admin-token');
  }
}