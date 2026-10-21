import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { API_URLS } from '../config/api-urls';

@Injectable({ providedIn: 'root' })
export class VisitTrackerService {
  private started = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  /** Call once from AppComponent. Counts a browser only the first time it opens a public page. */
  start(): void {
    if (this.started || !isPlatformBrowser(this.platformId)) return;
    this.started = true;

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        filter((e) => !e.urlAfterRedirects.startsWith('/admin')),
        take(1),
      )
      .subscribe(() => {
        const key = 'ubs_visitor_id';
        try {
          if (localStorage.getItem(key)) return; // already counted
          const id = crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
          this.http.post(API_URLS.visits.track, { visitorId: id }).subscribe({
            next: () => localStorage.setItem(key, id),
            error: () => {}, // try again next time; never bother the visitor
          });
        } catch {
          /* storage blocked: skip counting */
        }
      });
  }
}