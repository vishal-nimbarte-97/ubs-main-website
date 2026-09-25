import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminContentService } from '../../services/admin/admin-content.service';

interface Publication {
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
  publications: Publication[] = [
    {
      title: 'Future Publication',
      description:
        'This section will be updated soon with academic writing, research reflections, and ministry-focused publications from UBS contributors.',
      status: 'Coming Soon',
    },
    {
      title: 'Research & Reflection',
      description:
        'New publications will highlight theological insights, ministry studies, and contextual research shaped by the seminary’s mission and teaching.',
      status: 'Coming Soon',
    },
    {
      title: 'Theological Writing',
      description:
        'Planned academic pieces will be shared here as they are prepared for publication and public reading.',
      status: 'Coming Soon',
    },
  ];

  constructor(private readonly adminContent: AdminContentService) {}

  ngOnInit(): void {
    this.adminContent.getPublications().subscribe((items) => {
      if (items.length) {
        this.publications = items
          .filter((item) => item.isActive)
          .map((item) => ({
            title: item.title,
            description: item.description,
            status: item.status,
          }));
      }
    });
  }
}
