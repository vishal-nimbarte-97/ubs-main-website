import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminContentService, StaffProfile } from '../../services/admin/admin-content.service';

interface StaffGroup {
  name: string;
  staff: StaffProfile[];
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  groups: StaffGroup[] = [];
  loading = true;

  constructor(private adminContent: AdminContentService) {}

  ngOnInit(): void {
    this.adminContent.getStaff().subscribe((rows) => {
      // API order = admin's ↑/↓ order; departments follow first appearance
      const map = new Map<string, StaffProfile[]>();
      rows
        .filter((s) => s.isActive)
        .forEach((s) => {
          const dept = s.department.trim() || 'Staff';
          map.set(dept, [...(map.get(dept) ?? []), s]);
        });
      this.groups = Array.from(map, ([name, staff]) => ({ name, staff }));
      this.loading = false;
    });
  }

  imageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/faculty/default-faculty.jpg';
  }
}