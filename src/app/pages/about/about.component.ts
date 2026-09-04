import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Pioneer {
  image: string;
  name: string;
  role: string;
  description: string;
  featured?: boolean;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  selectedTimelineEvent: TimelineEvent | null = null;

  /* =====================================================
     EARLY PIONEERS
  ===================================================== */

  pioneers: Pioneer[] = [
    {
      image: '../../../../assets/about/image_2.png',

      name: 'Dr. Frank J. Kline and Family',

      role: 'Founder-Principal',

      description:
        'Dr. Frank J. Kline played a foundational role in the establishment of Union Biblical Seminary and its early ministry.',

      featured: true,
    },

    {
      image: '../../../../assets/about/image_4.png',

      name: 'Dr. Robert Hess',

      role: 'Second Principal',

      description:
        'Dr. Robert Hess carried forward the leadership of UBS during an important period of its early development.',
    },
    {
      image: '../../../../assets/about/image_5.png',

      name: 'Dr. Robert Hess and Esther',

      role: 'UBS Leadership',

      description:
        'The ministry of Dr. Robert Hess and his wife Esther formed an important part of the early UBS community.',
    },

    {
      image: '../../../../assets/about/image_3.png',

      name: 'The Four Principals',

      role: 'Early Leadership',

      description:
        'A generation of leaders who helped establish and strengthen the theological and ministerial foundations of UBS.',

      featured: true,
    },

    {
      image: '../../../../assets/about/image_6.png',

      name: 'Rev. Kenneth G. Bauman',

      role: 'Third Principal',

      description:
        'Rev. Kenneth G. Bauman served UBS with a pastoral heart and contributed significantly to its continuing ministry.',
      featured: true,
    },

    {
      image: '../../../../assets/about/image_7.png',

      name: 'Dr. Saphir P. Athyal',

      role: 'Fourth Principal',

      description:
        'Dr. Saphir P. Athyal continued the academic and theological legacy of UBS through his leadership and ministry.',
    },

    {
      image: '../../../../assets/about/image_8.png',

      name: 'Rev. Dr. Brian C. Wintle',

      role: 'Fifth Principal',

      description:
        'A respected New Testament scholar who contributed to theological education and biblical scholarship.',
    },

    {
      image: '../../../../assets/about/image_9.png',

      name: 'Rev. Dr. I. Ben Wati',

      role: 'Sixth Principal',

      description:
        'Rev. Dr. I. Ben Wati served the seminary as a leader and former Chairman of the Governing Board.',
    },

    {
      image: '../../../../assets/about/image_10.png',

      name: 'Rev. Dr. Bruce Nicholls',

      role: 'Seventh Principal',

      description:
        'A visionary missionary leader whose ministry helped shape the continuing mission and global outlook of UBS.',
    },
  ];

  /* =====================================================
     UBS TIMELINE
  ===================================================== */

  timeline: TimelineEvent[] = [
    {
      year: '1953',

      title: 'The Beginning of UBS',

      description:
        'Union Biblical Seminary was officially approved as a project of the Evangelical Fellowship of India and inaugurated at Yavatmal.',

      image: '../../../../assets/history/image_1.png',
    },

    {
      year: '1953+',

      title: 'A Partnership of Churches',

      description:
        'The seminary was constituted through the initiative of multiple mission and church groups responding to the need for ministerial training.',

      image: '../../../../assets/history/image_2.png',
    },

    {
      year: '1983',

      title: 'UBS Moves to Pune',

      description:
        'Union Biblical Seminary was relocated to Pune to integrate practical ministry experience with classroom theological learning.',

      image: '../../../../assets/history/image_4.png',
    },

    {
      year: 'Today',

      title: 'A Diverse Community',

      description:
        'UBS continues to bring together students, faculty and churches from diverse cultural, linguistic and denominational backgrounds.',

      image: '../../../../assets/history/image_6.png',
    },
  ];

  openTimelineEvent(event: TimelineEvent): void {
    // Store the selected event so the template can display its detail dialog.
    this.selectedTimelineEvent = event;
  }

  closeTimelineEvent(): void {
    // Clear the selection and close the timeline detail dialog.
    this.selectedTimelineEvent = null;
  }
}
