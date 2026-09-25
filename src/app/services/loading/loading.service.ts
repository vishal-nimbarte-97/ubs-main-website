import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private activeRequests = 0;
  private progressTimer: ReturnType<typeof setInterval> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly progressSubject = new BehaviorSubject<number>(0);
  private readonly visibleSubject = new BehaviorSubject<boolean>(false);

  readonly progress$: Observable<number> = this.progressSubject.asObservable();
  readonly visible$: Observable<boolean> = this.visibleSubject.asObservable();

  start(): void {
    this.activeRequests += 1;

    if (this.activeRequests !== 1) {
      return;
    }

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }

    this.visibleSubject.next(true);
    this.progressSubject.next(8);
    this.startProgressTimer();
  }

  finish(): void {
    this.activeRequests = Math.max(0, this.activeRequests - 1);

    if (this.activeRequests > 0) {
      return;
    }

    this.stopProgressTimer();
    this.progressSubject.next(100);
    this.hideTimer = setTimeout(() => {
      this.visibleSubject.next(false);
      this.progressSubject.next(0);
      this.hideTimer = null;
    }, 220);
  }

  private startProgressTimer(): void {
    this.stopProgressTimer();

    this.progressTimer = setInterval(() => {
      const currentProgress = this.progressSubject.value;
      const nextProgress = currentProgress >= 90
        ? currentProgress
        : currentProgress + Math.max(1, Math.round((90 - currentProgress) / 10));

      this.progressSubject.next(nextProgress);
    }, 180);
  }

  private stopProgressTimer(): void {
    if (!this.progressTimer) {
      return;
    }

    clearInterval(this.progressTimer);
    this.progressTimer = null;
  }
}
