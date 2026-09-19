import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent {
  @Input() isLive = false;
  @Input() announcements: string[] = [];
  @Input() eventItems: Array<{ date: string; title: string; description: string }> = [];
}
