import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';
import { RouterModule } from '@angular/router';

interface CouncilRole {
  title: string;
  description: string;
  image: string;
}

interface StudentCommittee {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-student-zone',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-zone.component.html',
  styleUrls: ['./student-zone.component.scss']
})
export class StudentZoneComponent implements AfterViewInit, OnDestroy {

  /* =========================================================
     HERO IMAGE
     NOTE: pulled from the old site's asset folder as a
     placeholder — swap this for a proper campus/student photo
     whenever you have one.
  ========================================================= */

  heroImage =
    'https://ubs.ac.in/Admin/assets/img/1e3ee61ebab8854164e856e232f821b0.jpg';


  /* =========================================================
     STUDENT COUNCIL
     NOTE: role names + images carried over from the old site.
     Images are placeholders pulled from the old asset folder —
     swap the `image` value on each role once you have real
     portraits. Duty text drafted from the role title only
     (old markup had no real description) — please review.
  ========================================================= */

  councilRoles: CouncilRole[] = [

    {
      title: 'President',
      description:
        'Leads the Student Council and represents the student body to the Seminary administration.',
      image: 'https://ubs.ac.in/Admin/assets/img/32527ad9ce8a529795148ae9ed777b28.jpeg'
    },

    {
      title: 'Vice President',
      description:
        'Supports the President and oversees Student Council activities in their absence.',
      image: 'https://ubs.ac.in/Admin/assets/img/gallery2.jpg'
    },

    {
      title: 'Secretary',
      description:
        'Maintains records, communication and minutes for the Student Council.',
      image: 'https://ubs.ac.in/Admin/assets/img/images_(1).jpeg'
    },

    {
      title: 'Treasurer',
      description:
        'Manages the Student Council\u2019s finances and coordinates fund-related activities.',
      image: 'https://ubs.ac.in/Admin/assets/img/gallery1_1.jpg'
    },

    {
      title: 'Chief Chapel Stewards',
      description:
        'Coordinate arrangements for chapel services and campus worship gatherings.',
      image: 'https://ubs.ac.in/Admin/assets/img/testimonial-2.jpg'
    }

  ];


  /* =========================================================
     STUDENT COMMITTEES
     NOTE: committee names + images carried over from the old
     site. Descriptions drafted from each name since the
     original text was placeholder/test copy — please review,
     and confirm the correct expansions for "SARAC" and "LDP".
  ========================================================= */

  studentCommittees: StudentCommittee[] = [

    {
      title: 'Prayer Committee',
      description:
        'Arranges the weekly UBS Family Prayer Meeting and organizes community prayer gatherings, encouraging students to intercede together as a Seminary family.',
      image: 'https://ubs.ac.in/Admin/assets/img/1.jpg'
    },

    {
      title: 'Missionary Project Committee',
      description:
        'Coordinates missionary awareness projects and initiatives that connect students with mission work beyond the campus.',
      image: 'https://ubs.ac.in/Admin/assets/img/3.jpeg'
    },

    {
      title: 'SARAC',
      description:
        'Details to be confirmed \u2014 please share the committee\u2019s full name and role so this description can be finalised.',
      image: 'https://ubs.ac.in/Admin/assets/img/4.png'
    },

    {
      title: 'Handicraft Committee',
      description:
        'Organizes handicraft and creative skill-building activities for students.',
      image: 'https://ubs.ac.in/Admin/assets/img/5.jpeg'
    },

    {
      title: 'LDP',
      description:
        'Leadership Development Programme \u2014 equips students with practical leadership and ministry skills. (Please confirm expansion.)',
      image: 'https://ubs.ac.in/Admin/assets/img/6.jpeg'
    },

    {
      title: 'Service Committee',
      description:
        'Organizes campus service projects and community outreach initiatives.',
      image: 'https://ubs.ac.in/Admin/assets/img/7.jpeg'
    },

    {
      title: 'Sports and Games Committee',
      description:
        'Organizes sports events, tournaments and recreational activities for the student community.',
      image: 'https://ubs.ac.in/Admin/assets/img/8.jpeg'
    },

    {
      title: 'Missionaries Conference Committee',
      description:
        'Plans and coordinates the annual Missionaries Conference on campus.',
      image: 'https://ubs.ac.in/Admin/assets/img/Union_Biblical_seminary.jpeg'
    },

    {
      title: 'Campus Care Committee',
      description:
        'Looks after the general upkeep, cleanliness and care of the campus.',
      image: 'https://ubs.ac.in/Admin/assets/img/gallery2.jpg'
    },

    {
      title: 'Days of Challenge Committee',
      description:
        'Organizes the Days of Challenge programme for spiritual growth and reflection.',
      image: 'https://ubs.ac.in/Admin/assets/img/images_(1).jpeg'
    }

  ];


  /* =========================================================
     IMAGE FALLBACK
     If a placeholder link ever 404s, hide the broken image and
     let the frame fall back to a duotone tint instead of a
     broken-image icon.
  ========================================================= */

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.style.display = 'none';
    target.parentElement?.classList.add('img-fallback');
  }


  /* =========================================================
     SCROLL ANIMATION
  ========================================================= */

  ngAfterViewInit(): void {

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const elements =
      document.querySelectorAll(
        '.sz-reveal'
      );

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add('is-visible');

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    elements.forEach(element => {
      observer.observe(element);
    });

  }

  ngOnDestroy(): void {}

}