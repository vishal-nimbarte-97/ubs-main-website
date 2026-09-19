import { Component, OnDestroy, OnInit } from '@angular/core';

interface ApplicationStep {
  badge: string;
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
export class ApplyComponent implements OnInit, OnDestroy {
  selectedStepIndex = 0;
  private autoCycleTimer?: number;

  readonly steps: ApplicationStep[] = [
    {
      badge: 'C',
      title: 'Connect to us',
      description: 'Write to registrar@ubs.ac.in',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      badge: 'D',
      title: 'Download',
      description: 'Download the application.',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    },
    {
      badge: 'A',
      title: 'Application',
      description: 'Duly fill the application.',
      image:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    },
    {
      badge: 'R',
      title: 'Review',
      description: 'Send us the application.',
      image:
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  ngOnInit(): void {
    this.autoCycleTimer = window.setInterval(() => {
      this.selectedStepIndex = (this.selectedStepIndex + 1) % this.steps.length;
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.autoCycleTimer) {
      window.clearInterval(this.autoCycleTimer);
    }
  }

  get selectedStep(): ApplicationStep {
    return this.steps[this.selectedStepIndex];
  }

  selectStep(index: number): void {
    this.selectedStepIndex = index;
  }

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
