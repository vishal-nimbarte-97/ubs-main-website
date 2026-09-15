import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LiveStatusService } from '../../services/dashboard/live-status.service';
import { AuthService } from '../../services/auth/auth.service';

type SectionId = 'overview' | 'live' | 'notifications' | 'settings';

interface AdminSection {
  id: SectionId;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLive = false;
  sidebarOpen = false;

  sections: AdminSection[] = [
    { id: 'overview', label: 'Overview', icon: 'fa-gauge-high' },
    { id: 'live', label: 'Live Broadcast', icon: 'fa-video' },
    { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
    { id: 'settings', label: 'Site Settings', icon: 'fa-gear' },
  ];

  activeSection: SectionId = 'overview';

  constructor(
    private liveService: LiveStatusService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.liveService.getStatus().subscribe((res) => (this.isLive = res.isLive));
  }

  get currentSectionLabel(): string {
    return this.sections.find((s) => s.id === this.activeSection)?.label ?? '';
  }

  setSection(id: SectionId): void {
    this.activeSection = id;
    this.sidebarOpen = false; // close mobile drawer after choosing a section
  }

  toggleLive(): void {
    this.liveService.setStatus(!this.isLive).subscribe((res) => (this.isLive = res.isLive));
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}