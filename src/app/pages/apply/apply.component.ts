import { Component } from '@angular/core';

interface ApplicationStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

interface Programme {
  title: string;
  details: string[];
  image: string;
  downloadUrl: string;
}

@Component({
  selector: 'app-apply',
  standalone: true,
  templateUrl: './apply.component.html',
  styleUrl: './apply.component.scss',
})
export class ApplyComponent {
  readonly steps: ApplicationStep[] = [
    {
      number: '1',
      title: 'Connect to us',
      description: 'Write to registrar@ubs.ac.in',
      image: 'assets/apply/step-connect.webp',
    },
    {
      number: '2',
      title: 'Download',
      description: 'Download the application.',
      image: 'assets/apply/step-download.webp',
    },
    {
      number: '3',
      title: 'Application',
      description: 'Duly fill the application.',
      image: 'assets/apply/step-apply.webp',
    },
    {
      number: '4',
      title: 'Review',
      description: 'Send us the application.',
      image: 'assets/apply/step-send.webp',
    },
  ];

  readonly programmes: Programme[] = [
    {
      title: 'Bachelor of Divinity (Senate)',
      details: ['3 year Programme', '2 year Upg. Programme'],
      image: 'assets/apply/programme-3.jpg',
      downloadUrl: 'https://ubs.ac.in/index.php/Apply/download_program_pdf/1',
    },
    {
      title: 'Master of Theology (Senate)',
      details: [
        'Old Testament',
        'New Testament',
        'Christian Theology',
        'History of Christianity',
        'Missiology',
      ],
      image: 'assets/apply/programme-1.jpg',
      downloadUrl: 'https://ubs.ac.in/index.php/Apply/download_program_pdf/2',
    },
    {
      title: 'Master of Theology (ATA)',
      details: [
        'Old Testament',
        'New Testament',
        'Christian Theology',
        'History of Christianity',
        'Pastoral Care & Counselling',
        'Missiology',
      ],
      image: 'assets/apply/programme-2.jpg',
      downloadUrl: 'https://ubs.ac.in/index.php/Apply/download_program_pdf/7',
    },
    {
      title: 'Doctor of Theology (Senate)',
      details: [
        'Old Testament',
        'New Testament',
        'Christian Theology',
        'History of Christianity',
      ],
      image: 'assets/apply/programme-5.png',
      downloadUrl: 'https://ubs.ac.in/index.php/Apply/download_program_pdf/8',
    },
    {
      title: 'Master of Divinity (ATA)',
      details: ['4 year Programme', 'Distance Learning', 'English Medium'],
      image: 'assets/apply/programme-6.jpg',
      downloadUrl: 'https://ubs.ac.in/index.php/Apply/download_program_pdf/9',
    },
    {
      title: 'Master of Divinity (ATA)',
      details: ['4 year Programme', 'Distance Learning', 'Hindi Medium'],
      image: 'assets/apply/programme-7.jpg',
      downloadUrl: 'https://ubs.ac.in/index.php/Apply/download_program_pdf/10',
    },
    {
      title: 'Master of Divinity (ATA)',
      details: ['4 year Programme', 'Distance Learning', 'Marathi Medium'],
      image: 'assets/apply/programme-8.jpg',
      downloadUrl: 'https://ubs.ac.in/index.php/Apply/download_program_pdf/11',
    },
    {
      title: 'Centre for Children Ministry',
      details: ['June – November', 'Comprehensive Training'],
      image: 'assets/apply/programme-9.jpg',
      downloadUrl: 'https://ubs.ac.in/index.php/Apply/download_program_pdf/12',
    },
  ];
}
