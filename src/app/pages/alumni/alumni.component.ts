import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlumniProfile } from '../../models/alumni-profile.model';
import { ALUMNI_PROFILES } from '../../data/alumni.data';
import { AlumniContentService } from '../../services/admin/alumni-content.service';

@Component({
  selector: 'app-alumni',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.scss'],
})
export class AlumniComponent implements OnInit {
  alumniStory = {
    title: 'Our Alumni',
    subtitle: 'Stories of faith, service and leadership',
  };

  pioneers: AlumniProfile[] = ALUMNI_PROFILES;
  isShowingSampleData = true;

  selectedPioneer: AlumniProfile | null = null;

  constructor(private alumniContent: AlumniContentService) {}

  ngOnInit(): void {
    this.alumniContent.getAll().subscribe({
      next: (profiles) => {
        const activeProfiles = Array.isArray(profiles)
          ? profiles.filter((profile) => profile.isActive !== false)
          : [];
        if (activeProfiles.length) {
          this.pioneers = activeProfiles;
          this.isShowingSampleData = false;
        }
      },
      error: () => {
        this.pioneers = ALUMNI_PROFILES;
        this.isShowingSampleData = true;
      },
    });
  }

  openPioneer(pioneer: AlumniProfile): void {
    this.selectedPioneer = pioneer;
  }

  closePioneer(): void {
    this.selectedPioneer = null;
  }
}
