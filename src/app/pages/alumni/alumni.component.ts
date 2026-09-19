import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Pioneer {
  name: string;
  title: string;
  period: string;
  image: string;
  summary: string;
  details: string;
  heading?: string;
  introImage?: string;
  introParagraphs?: string[];
}

@Component({
  selector: 'app-alumni',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.scss'],
})
export class AlumniComponent {
  alumniStory = {
    title: 'Our Alumni',
    subtitle: 'Stories of faith, service and leadership',
  };

  pioneers: Pioneer[] = [
    {
      name: 'Faithful leaders shaped by UBS',
      title: 'OUR ALUMNI',
      period: '',
      image: '../../../../assets/about/image_3.png',
      summary: '',
      details: '',
      heading: 'Faithful leaders shaped by UBS',
      introImage: '../../../../assets/about/image_3.png',
      introParagraphs: [
        'UBS alumni continue to serve in churches, mission fields, theological education, and community leadership across India and beyond. Their lives bear testimony to the seminary’s conviction that faithful biblical teaching, spiritual formation, and Christ-centred discipleship prepare servants for lasting impact.',
        'From local congregations to cross-cultural mission work, the stories of our graduates reflect courage, humility, and a deep commitment to the gospel.',
      ],
    },
    {
      name: 'Rev. V. B. Samudre',
      title: 'First Indian Faculty and Director of Studies',
      period: '1953–1965',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
      summary: 'A foundational teacher who shaped the seminary’s early academic and spiritual culture.',
      details:
        'Rev. V. B. Samudre stands as one of the first generation of leaders who helped shape UBS into a centre of biblical learning and servant leadership. His contribution to theological teaching and institutional formation laid a strong foundation for generations that followed.',
    },
    {
      name: 'Dr. Frank Kline',
      title: 'Founder Principal and Visionary Leader',
      period: '1953–1958',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
      summary: 'A pioneering educator whose vision gave UBS its Christ-centred and mission-focused direction.',
      details:
        'Dr. Frank Kline helped set the theological direction of Union Biblical Seminary with a deep commitment to biblical integrity, contextual ministry, and practical formation. His legacy continues in the seminary’s enduring emphasis on Christ-centred teaching and mission.',
    },
    {
      name: 'Miss Zoe Ann Alford',
      title: 'First Librarian and Quiet Catalyst',
      period: '1953–1970',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
      summary: 'A steady servant whose contribution to learning resources and campus life remains deeply valued.',
      details:
        'Miss Zoe Ann Alford’s service to UBS was marked by humility, care, and intellectual generosity. Her work in the library and the life of the community helped create a learning environment that reflected both scholarship and hospitality.',
    },
    {
      name: 'Founding Faculty Members',
      title: 'Early Teachers and Church Leaders',
      period: '1953–1960',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
      summary: 'The initial faculty and leaders who established the school’s spiritual and academic character.',
      details:
        'The early faculty members carried the burden of building a seminary rooted in biblical faith and ministry formation. Their work established a model of leadership built on prayer, teaching, and practical service for the church in India.',
    },
  ];

  selectedPioneer: Pioneer | null = null;

  openPioneer(pioneer: Pioneer): void {
    this.selectedPioneer = pioneer;
  }

  closePioneer(): void {
    this.selectedPioneer = null;
  }
}
