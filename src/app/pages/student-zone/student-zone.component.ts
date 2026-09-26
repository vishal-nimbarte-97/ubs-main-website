import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminContentService } from '../../services/admin/admin-content.service';

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
export class StudentZoneComponent implements OnInit {
  /* =========================================================
     HERO IMAGE
     NOTE: placeholder pulled from the old asset folder —
     swap for a proper campus/student photo when available.
  ========================================================= */

  heroImage =
    'https://ubs.ac.in/Admin/assets/img/1e3ee61ebab8854164e856e232f821b0.jpg';

  ubssfObjectives = [
    'Promote Christian growth and encourage personal relationships with God and fellow students.',
    'Create a sense of Christian unity, fellowship, and responsibility among Seminary students.',
    'Foster fellowship with Christian institutions and build relationships with other educational institutions.',
    'Provide opportunities for practical Christian ministry, service, and training.',
    'Create awareness of and inculcate zeal for Christian mission.',
    'Encourage the creative use of talents such as writing, speaking, music, handicrafts, and leadership.',
    'Inculcate healthy habits of physical fitness and disciplined life.',
    'Encourage participation in discussing and solving mutual problems.',
  ];

  executiveCouncil = [
    'President',
    'Vice-President',
    'Secretary',
    'Treasurer',
    'Student Representative to the Practical Training Department',
    'Faculty Advisor (ex-officio)',
  ];

  executiveCouncilFunctions = [
    'Carry on the affairs of the Fellowship.',
    'Coordinate the work of all committees.',
    'Prepare an annual budget and examine the balance sheet at the end of the year.',
    'Make recommendations or proposals to the student council on important matters concerning the Fellowship.',
    'Scrutinize and approve proposed committee candidates submitted by committee chairpersons.',
    'Fill interim vacancies in the Executive Council in consultation with the principal.',
  ];

  committeeDuties: Record<string, string[]> = {
    'Prayer Committee': [
      'Arrange UBS Family Prayer Meetings once a week.',
      'Conduct Saturday community prayer meetings and share prayer needs from students, organizations, and countries.',
      'Arrange prayer meetings when special needs arise.',
      'Furnish prayer concerns to various prayer meetings.',
      'Organize prayer seminars and retreats.',
    ],
    'Missionary Project Committee': [
      'Promote the Missionary Project by presenting its vision and proposed budget to the seminary community.',
      'Encourage financial support for the Missionary Project.',
      'Coordinate missionary awareness and initiatives that connect students with mission work beyond campus.',
    ],
    'Social and Cultural Committee': [
      'Conduct social and cultural programmes.',
      'Arrange the Freshers welcome at the beginning of the academic year.',
      'Encourage musical talents and conduct an annual musical competition.',
      'Arrange dramas for evangelistic outreach, Christian values, and missionary awareness.',
      'Arrange social functions, film shows, and Vesper Services.',
    ],
    'Handicraft Committee': [
      'Promote interest in and develop skills and talents in handicraft work.',
      'Conduct the annual exhibition of handicraft work submitted to the committee.',
      'Arrange jumble sales once or twice a year.',
    ],
    'Literary, Debate, and Publication Committee': [
      'Conduct debate, story-telling, quiz, elocution, and essay-writing competitions.',
      'Choose competition topics in consultation with people specialized in the respective fields.',
      'Conduct annual extemporaneous speech and biblical reading competitions.',
      'Organize intercollegiate debates and symposiums whenever possible.',
      'Publish campus news and the annual magazine.',
      'Raise additional funds for publications through page sponsorships and advertisements.',
    ],
    'Service Committee': [
      'Arrange venues and accommodation for public meetings and special occasions.',
      'Arrange the Public Social Service Day in consultation with the principal.',
      'Plan and carry out relief projects inside and outside the campus.',
      'Arrange the campus sanitary programme.',
    ],
    'Sports and Games Committee': [
      'Supply sports articles within the allocated budget and make them available on sports days.',
      'Conduct sports and games activities during the allotted time.',
      'Conduct annual indoor and outdoor sports, matches, and tournaments.',
      'Inculcate healthy competition and sportsmanship among faculty, staff, students, and their families.',
    ],
    'Days of Challenge Committee': [
      'Arrange evangelistic meetings for young people in Maharashtra and surrounding states.',
      'Conduct Days of Challenge once during the academic year, preferably during Diwali, Dashara, or another holiday.',
      'Encourage all BD students to attend Days of Challenge.',
    ],
    'Campus Care Committee': [
      'Maintain the cleanliness of the campus.',
      'Provide every class a platform for a cleaning drive at least once each semester.',
      'Encourage plantation of new trees when required.',
      'Look after existing plants, trees, and the children\'s park.',
    ],
    'Missionary Conference Committee': [
      'Plan and coordinate the annual Missionary Conference on campus.',
      'Publish conference details for the seminary community as they are finalized.',
    ],
  };

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
        'assets/gallery/people-1.png',
        'assets/gallery/people-4.png',
        'assets/gallery/people-7.png',
      ],
    },

    {
      title: 'Missionary Project Committee',
      description:
        'Coordinates missionary awareness projects and initiatives that connect students with mission work beyond the campus.',
      images: [
        'assets/gallery/image_1.jpg',
        'assets/gallery/image_2.jpg',
        'assets/gallery/image_3.jpg',
      ],
    },

    {
      title: 'Social and Cultural Committee',
      description:
        'Builds community through social programmes, music, drama, welcome events, and cultural activities.',
      images: [
        'assets/gallery/image_4.jpg',
        'assets/gallery/image_5.jpg',
      ],
    },

    {
      title: 'Handicraft Committee',
      description:
        'Organizes handicraft and creative skill-building activities for students.',
      images: [
        'assets/gallery/image_6.jpg',
        'assets/gallery/image_7.jpg',
      ],
    },

    {
      title: 'Literary, Debate, and Publication Committee',
      description:
        'Develops communication and creative gifts through competitions, debates, symposiums, campus news, and publications.',
      images: [
        'assets/gallery/image_8.jpg',
        'assets/gallery/image_9.jpg',
      ],
    },

    {
      title: 'Service Committee',
      description:
        'Organizes campus service projects and community outreach initiatives.',
      images: [
        'assets/gallery/image_10.png',
        'assets/gallery/image_11.jpg',
      ],
    },

    {
      title: 'Sports and Games Committee',
      description:
        'Organizes sports events, tournaments and recreational activities for the student community.',
      images: [
        'assets/gallery/image_12.png',
        'assets/gallery/image_13.png',
      ],
    },

    {
      title: 'Missionary Conference Committee',
      description:
        'Plans and coordinates the annual Missionaries Conference on campus.',
      images: [
        'assets/gallery/image_14.png',
        'assets/gallery/image_15.png',
      ],
    },

    {
      title: 'Campus Care Committee',
      description:
        'Looks after the general upkeep, cleanliness and care of the campus.',
      images: [
        'assets/gallery/heritage-1.png',
        'assets/gallery/heritage-3.png',
      ],
    },

    {
      title: 'Days of Challenge Committee',
      description:
        'Organizes the Days of Challenge programme for spiritual growth and reflection.',
      images: [
        'assets/gallery/heritage-5.png',
        'assets/gallery/heritage-7.png',
      ],
    },
  ];

  constructor(private readonly adminContent: AdminContentService) {}

  ngOnInit(): void {
    this.adminContent.getStudentZoneItems().subscribe((items) => {
      const communityItems = items.filter(
        (item) => item.isActive && item.category === 'UBSSF Community',
      );

      if (!communityItems.length) return;

      const grouped = new Map<string, string[]>();
      communityItems.forEach((item) => {
        const images = grouped.get(item.title) ?? [];
        grouped.set(item.title, [...images, item.imageUrl]);
      });

      this.studentCommittees = Array.from(grouped, ([title, images]) => ({
        title,
        description: `Student-led ${title.toLowerCase()} activities at UBS.`,
        images,
      }));
    });
  }

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
