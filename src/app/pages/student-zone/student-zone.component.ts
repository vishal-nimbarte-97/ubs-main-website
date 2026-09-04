import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface StudentCommittee {
  title: string;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-student-zone',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-zone.component.html',
  styleUrls: ['./student-zone.component.scss'],
})
export class StudentZoneComponent {
  /* =========================================================
     HERO IMAGE
     NOTE: placeholder pulled from the old asset folder —
     swap for a proper campus/student photo when available.
  ========================================================= */

  heroImage =
    'https://ubs.ac.in/Admin/assets/img/1e3ee61ebab8854164e856e232f821b0.jpg';

  /* =========================================================
     STUDENT COMMITTEES
     Each committee carries an `images` array so its row
     renders as a small gallery (text + a few photos).
     2-3 placeholder photos are included per committee purely
     to preview the layout — replace with real photos, and
     add/remove entries in the array freely.
  ========================================================= */

  studentCommittees: StudentCommittee[] = [
    {
      title: 'Prayer Committee',
      description:
        'Arranges the weekly UBS Family Prayer Meeting and organizes community prayer gatherings, encouraging students to intercede together as a Seminary family.',
      images: [
        'https://ubs.ac.in/Admin/assets/img/1.jpg',
        'https://ubs.ac.in/Admin/assets/img/gallery1_1.jpg',
        'https://ubs.ac.in/Admin/assets/img/testimonial-2.jpg',
      ],
    },

    {
      title: 'Missionary Project Committee',
      description:
        'Coordinates missionary awareness projects and initiatives that connect students with mission work beyond the campus.',
      images: [
        'https://ubs.ac.in/Admin/assets/img/3.jpeg',
        'https://ubs.ac.in/Admin/assets/img/gallery2.jpg',
        'https://ubs.ac.in/Admin/assets/img/Union_Biblical_seminary.jpeg',
      ],
    },

    {
      title: 'SARAC',
      description:
        'Details to be confirmed \u2014 please share the committee\u2019s full name and role so this description can be finalised.',
      images: [
        'https://ubs.ac.in/Admin/assets/img/4.png',
        'https://ubs.ac.in/Admin/assets/img/32527ad9ce8a529795148ae9ed777b28.jpeg',
      ],
    },

    {
      title: 'Handicraft Committee',
      description:
        'Organizes handicraft and creative skill-building activities for students.',
      images: [
        'https://ubs.ac.in/Admin/assets/img/5.jpeg',
        'https://ubs.ac.in/Admin/assets/img/images_(1).jpeg',
      ],
    },

    {
      title: 'LDP',
      description:
        'Leadership Development Programme \u2014 equips students with practical leadership and ministry skills. (Please confirm expansion.)',
      images: [
        'https://ubs.ac.in/Admin/assets/img/6.jpeg',
        'https://ubs.ac.in/Admin/assets/img/gallery1_1.jpg',
      ],
    },

    {
      title: 'Service Committee',
      description:
        'Organizes campus service projects and community outreach initiatives.',
      images: [
        'https://ubs.ac.in/Admin/assets/img/7.jpeg',
        'https://ubs.ac.in/Admin/assets/img/testimonial-2.jpg',
      ],
    },

    {
      title: 'Sports and Games Committee',
      description:
        'Organizes sports events, tournaments and recreational activities for the student community.',
      images: [
        'https://ubs.ac.in/Admin/assets/img/8.jpeg',
        'https://ubs.ac.in/Admin/assets/img/gallery2.jpg',
      ],
    },

    {
      title: 'Missionaries Conference Committee',
      description:
        'Plans and coordinates the annual Missionaries Conference on campus.',
      images: [
        'https://ubs.ac.in/Admin/assets/img/Union_Biblical_seminary.jpeg',
        'https://ubs.ac.in/Admin/assets/img/1.jpg',
      ],
    },

    {
      title: 'Campus Care Committee',
      description:
        'Looks after the general upkeep, cleanliness and care of the campus.',
      images: [
        'https://ubs.ac.in/Admin/assets/img/gallery2.jpg',
        'https://ubs.ac.in/Admin/assets/img/3.jpeg',
      ],
    },

    {
      title: 'Days of Challenge Committee',
      description:
        'Organizes the Days of Challenge programme for spiritual growth and reflection.',
      images: [
        'https://ubs.ac.in/Admin/assets/img/images_(1).jpeg',
        'https://ubs.ac.in/Admin/assets/img/5.jpeg',
      ],
    },
  ];

  /* =========================================================
     IMAGE FALLBACK
     If a placeholder link ever 404s, hide the broken image and
     let the frame fall back to a duotone tint.
  ========================================================= */

  onImageError(event: Event): void {
    // Hide broken remote images and let the styled fallback frame remain visible.
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
    target.parentElement?.classList.add('img-fallback');
  }
}
