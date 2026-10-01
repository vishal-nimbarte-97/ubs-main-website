import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_URLS } from '../../config/api-urls';

interface LoginResponse {
  isSuccess: boolean;
  message: string;
  email?: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'ubs-admin-token';

  constructor(private http: HttpClient) {}

  private getSessionStorage(): Storage | null {
    if (typeof window === 'undefined' || !window.sessionStorage) {
      return null;
    }

    return window.sessionStorage;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(API_URLS.auth.login, { email, password })
      .pipe(
        tap((res) => {
          const storage = this.getSessionStorage();
          if (res.isSuccess && res.token && storage) {
            storage.setItem(this.tokenKey, res.token);
          }
        })
      );
  }

  register(email: string, password: string, setupKey: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'X-Setup-Key': setupKey });
    return this.http.post<LoginResponse>(
      API_URLS.auth.register,
      { email, password },
      { headers },
    );
  }

  logout(): void {
    const storage = this.getSessionStorage();
    storage?.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const storage = this.getSessionStorage();
    return !!storage?.getItem(this.tokenKey);
  }

  getToken(): string | null {
    const storage = this.getSessionStorage();
    return storage?.getItem(this.tokenKey) ?? null;
  }
}