import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LiveStatusService } from '../../services/dashboard/live-status.service';
import { AuthService } from '../../services/auth/auth.service';
import { SiteContentService } from '../../services/admin/site-content.service';

type SectionId = 'overview' | 'live' | 'notifications' | 'news' | 'events' | 'settings';

interface AdminSection {
  id: SectionId;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLive = false;
  sidebarOpen = false;
  announcements: string[] = [];
  newsItems: Array<{ title: string; excerpt: string }> = [];
  eventItems: Array<{ date: string; title: string; description: string }> = [];

  newAnnouncement = '';
  newNewsTitle = '';
  newNewsExcerpt = '';
  newEventDate = new Date().toISOString().slice(0, 10);
  newEventTitle = '';
  newEventDescription = '';

  sections: AdminSection[] = [
    { id: 'overview', label: 'Overview', icon: 'fa-gauge-high' },
    { id: 'live', label: 'Live Broadcast', icon: 'fa-video' },
    { id: 'notifications', label: 'Announcements', icon: 'fa-bell' },
    { id: 'news', label: 'News', icon: 'fa-newspaper' },
    { id: 'events', label: 'Events', icon: 'fa-calendar-days' },
    { id: 'settings', label: 'Site Settings', icon: 'fa-gear' },
  ];

  activeSection: SectionId = 'overview';

  constructor(
    private liveService: LiveStatusService,
    private auth: AuthService,
    private router: Router,
    private siteContent: SiteContentService,
  ) {}

  ngOnInit(): void {
    this.liveService.getStatus().subscribe((res) => (this.isLive = res.isLive));
    this.refreshContent();
  }

  get currentSectionLabel(): string {
    return this.sections.find((s) => s.id === this.activeSection)?.label ?? '';
  }

  setSection(id: SectionId): void {
    this.activeSection = id;
    this.sidebarOpen = false;
  }

  refreshContent(): void {
    this.announcements = this.siteContent.getAnnouncements();
    this.newsItems = this.siteContent.getNews();
    this.eventItems = this.siteContent.getEvents();
  }

  addAnnouncement(): void {
    if (!this.newAnnouncement.trim()) return;
    this.siteContent.addAnnouncement(this.newAnnouncement);
    this.newAnnouncement = '';
    this.refreshContent();
  }

  removeAnnouncement(index: number): void {
    this.siteContent.removeAnnouncement(index);
    this.refreshContent();
  }

  addNews(): void {
    if (!this.newNewsTitle.trim() || !this.newNewsExcerpt.trim()) return;
    this.siteContent.addNews({
      title: this.newNewsTitle,
      excerpt: this.newNewsExcerpt,
    });
    this.newNewsTitle = '';
    this.newNewsExcerpt = '';
    this.refreshContent();
  }

  removeNews(index: number): void {
    this.siteContent.removeNews(index);
    this.refreshContent();
  }

  addEvent(): void {
    if (!this.newEventDate || !this.newEventTitle.trim() || !this.newEventDescription.trim()) {
      return;
    }
    this.siteContent.addEvent({
      date: this.newEventDate,
      title: this.newEventTitle,
      description: this.newEventDescription,
    });
    this.newEventDate = new Date().toISOString().slice(0, 10);
    this.newEventTitle = '';
    this.newEventDescription = '';
    this.refreshContent();
  }

  removeEvent(index: number): void {
    this.siteContent.removeEvent(index);
    this.refreshContent();
  }

  toggleLive(): void {
    this.liveService.setStatus(!this.isLive).subscribe((res) => (this.isLive = res.isLive));
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}