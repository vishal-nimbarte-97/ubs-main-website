import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AdminContentService, PublicationItem } from '../../services/admin/admin-content.service';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
})
export class PublicationsComponent implements OnInit {
  publications: PublicationItem[] = [
    {
      title: 'Future Publication',
      description:
        'This section will be updated soon with academic writing, research reflections, and ministry-focused publications from UBS contributors.',
      status: 'Coming Soon',
      category: 'Research',
      coverImageUrl: '',
      pdfPath: '',
      publishedDate: '',
      link: '',
      isFeatured: false,
      isActive: true,
    },
    {
      title: 'Research & Reflection',
      description:
        'New publications will highlight theological insights, ministry studies, and contextual research shaped by the seminary’s mission and teaching.',
      status: 'Coming Soon',
      category: 'Research',
      coverImageUrl: '',
      pdfPath: '',
      publishedDate: '',
      link: '',
      isFeatured: false,
      isActive: true,
    },
    {
      title: 'Theological Writing',
      description:
        'Planned academic pieces will be shared here as they are prepared for publication and public reading.',
      status: 'Coming Soon',
      category: 'Research',
      coverImageUrl: '',
      pdfPath: '',
      publishedDate: '',
      link: '',
      isFeatured: false,
      isActive: true,
    },
  ];
  selectedPublication: PublicationItem | null = null;
  selectedPdfUrl: SafeResourceUrl | null = null;

  constructor(
    private readonly adminContent: AdminContentService,
    private readonly sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.adminContent.getPublications().subscribe((items) => {
      if (items.length) {
        const activeItems = items.filter((item) => item.isActive);
        if (!activeItems.length) return;

        this.publications = activeItems;
      }
    });
  }

  onCoverImageError(publication: PublicationItem): void {
    publication.coverImageUrl = '';
  }

  openPublicationPdf(publication: PublicationItem): void {
    if (!publication.pdfPath) {
      return;
    }

    this.selectedPublication = publication;
    this.selectedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${publication.pdfPath}#toolbar=0&navpanes=0&scrollbar=1`,
    );
  }

  closePublicationPdf(): void {
    this.selectedPublication = null;
    this.selectedPdfUrl = null;
  }
}
