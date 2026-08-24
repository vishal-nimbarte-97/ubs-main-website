import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';
import { RouterModule } from '@angular/router';

interface CouncilRole {
  number: string;
  title: string;
  icon: string;
  description: string;
}

interface StudentCommittee {
  number: string;
  title: string;
  description: string;
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
     STUDENT COUNCIL
     NOTE: role names carried over from the old site. Duty text
     below is drafted from the role title only (the old markup
     had no real description for these) — please review/edit.
  ========================================================= */

  councilRoles: CouncilRole[] = [

    {
      number: '01',
      title: 'President',
      icon: '✦',
      description:
        'Leads the Student Council and represents the student body to the Seminary administration.'
    },

    {
      number: '02',
      title: 'Vice President',
      icon: '◇',
      description:
        'Supports the President and oversees Student Council activities in their absence.'
    },

    {
      number: '03',
      title: 'Secretary',
      icon: '▣',
      description:
        'Maintains records, communication and minutes for the Student Council.'
    },

    {
      number: '04',
      title: 'Treasurer',
      icon: '⌂',
      description:
        'Manages the Student Council\u2019s finances and coordinates fund-related activities.'
    },

    {
      number: '05',
      title: 'Chief Chapel Stewards',
      icon: '✧',
      description:
        'Coordinate arrangements for chapel services and campus worship gatherings.'
    }

  ];


  /* =========================================================
     STUDENT COMMITTEES
     NOTE: committee names carried over from the old site.
     Descriptions are drafted from each name since the original
     text was placeholder/test copy — please review, and confirm
     the correct expansions for "SARAC" and "LDP".
  ========================================================= */

  studentCommittees: StudentCommittee[] = [

    {
      number: '01',
      title: 'Prayer Committee',
      description:
        'Arranges the weekly UBS Family Prayer Meeting and organizes community prayer gatherings, encouraging students to intercede together as a Seminary family.'
    },

    {
      number: '02',
      title: 'Missionary Project Committee',
      description:
        'Coordinates missionary awareness projects and initiatives that connect students with mission work beyond the campus.'
    },

    {
      number: '03',
      title: 'SARAC',
      description:
        'Details to be confirmed \u2014 please provide the committee\u2019s full name and role.'
    },

    {
      number: '04',
      title: 'Handicraft Committee',
      description:
        'Organizes handicraft and creative skill-building activities for students.'
    },

    {
      number: '05',
      title: 'LDP',
      description:
        'Leadership Development Programme \u2014 equips students with practical leadership and ministry skills. (Please confirm expansion.)'
    },

    {
      number: '06',
      title: 'Service Committee',
      description:
        'Organizes campus service projects and community outreach initiatives.'
    },

    {
      number: '07',
      title: 'Sports and Games Committee',
      description:
        'Organizes sports events, tournaments and recreational activities for the student community.'
    },

    {
      number: '08',
      title: 'Missionaries Conference Committee',
      description:
        'Plans and coordinates the annual Missionaries Conference on campus.'
    },

    {
      number: '09',
      title: 'Campus Care Committee',
      description:
        'Looks after the general upkeep, cleanliness and care of the campus.'
    },

    {
      number: '10',
      title: 'Days of Challenge Committee',
      description:
        'Organizes the Days of Challenge programme for spiritual growth and reflection.'
    }

  ];


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