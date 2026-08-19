import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-campus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss'],
})
export class CampusComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('communitySection')
  communitySection!: ElementRef<HTMLElement>;
  communityInView = false;

  private communityObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    if (this.communitySection && 'IntersectionObserver' in window) {
      this.communityObserver = new IntersectionObserver(
        (entries, obs) => {
          if (entries[0].isIntersecting) {
            this.communityInView = true;
            obs.disconnect(); // fires once, then the section stays revealed
          }
        },
        { threshold: 0.25 }
      );
      this.communityObserver.observe(this.communitySection.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.communityObserver?.disconnect();
  }
}