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
  private prodUrl='http://ubsapi.xplorelogic.in/api/Auth';
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
      .post<LoginResponse>(`${this.prodUrl}/Login`, { email, password })
      .pipe(
        tap((res) => {
          const storage = this.getSessionStorage();
          if (res.isSuccess && res.token && storage) {
            storage.setItem(this.tokenKey, res.token);
          }
        })
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