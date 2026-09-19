import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface AdminSidebarItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent {
  @Input() items: AdminSidebarItem[] = [];
  @Input() activeId = '';
  @Output() selectItem = new EventEmitter<string>();
}
