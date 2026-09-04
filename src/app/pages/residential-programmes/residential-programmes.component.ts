import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Programme {
  name: string;
  type: string;
  duration: string;
  summary: string;
  points: string[];
}

interface Eligibility {
  name: string;
  criteria: string[];
}

@Component({
  selector: 'app-residential-programmes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './residential-programmes.component.html',
  styleUrl: './residential-programmes.component.scss',
})
export class ResidentialProgrammesComponent {
  activeType = 'All programmes';

  readonly programmeTypes = [
    'All programmes',
    'Undergraduate',
    'Postgraduate',
    'Doctoral',
  ];

  programmes: Programme[] = [
    {
      name: 'Bachelor of Divinity (B.D.)',
      type: 'Undergraduate',
      duration: '3–4 years',
      summary:
        'Prepares students for the essential functions and ministries of the Church in India and South Asia, blending biblical, theological, historical and practical study.',
      points: [
        'BD (3 years) — for graduates of a recognised university',
        'BD Upgrader (2 years) — for B.Th. graduates who passed all required papers',
        'Interdisciplinary approach to biblical, theological and historical study',
      ],
    },
    {
      name: 'Master of Theology (M.Th.)',
      type: 'Postgraduate',
      duration: '2 years',
      summary:
        'Trains candidates for theological teaching and equips them with the academic tools for critical, contextual research — a pathway toward doctoral study.',
      points: [
        'Specialisations: Old Testament, New Testament, Christian Theology, History of Christianity, Missiology',
        'Minimum one year of ministerial experience required after B.D. (except for women)',
        'Language requirements apply for Old Testament and New Testament tracks',
      ],
    },
    {
      name: 'Doctor of Theology (D.Th.)',
      type: 'Doctoral',
      duration: 'Min. 3 years residential',
      summary:
        'Advanced theological research degree forming leaders for the ministry, mission and theological education of the church worldwide.',
      points: [
        'Thesis submission possible after a minimum of 4 years',
        'Disciplines: Old Testament, New Testament, Christian Theology, History of Christianity',
        'Requires an M.Th. with a minimum "B" grade, or an equivalent qualification',
      ],
    },
  ];

  get visibleProgrammes(): Programme[] {
    return this.activeType === 'All programmes'
      ? this.programmes
      : this.programmes.filter(
          (programme) => programme.type === this.activeType,
        );
  }

  ccm = {
    name: 'Centre for Children Ministry (CCM)',
    duration: '6 months · June–November',
    medium: 'English',
    summary:
      'A focused training programme for anyone called to minister to children — covering evangelism, Bible teaching methods and creative tools for children\u2019s ministry.',
    points: [
      'How to share the gospel with children',
      'Teaching Bible lessons, memory verses and songs',
      'Using puppets, object lessons, stories and music',
      'Taught by experienced instructors',
    ],
    eligibility: [
      'Minimum qualification of 10+2',
      'A clear assurance of salvation grounded in God\u2019s Word',
      'A burden and vision to reach children',
      'A personal, growing relationship with the Lord Jesus',
    ],
  };

  admissionInfo = {
    fees: [
      { label: 'Application fee', value: '₹800' },
      { label: 'Late fee', value: '₹500' },
    ],
    deadlines: [
      { programme: 'BD / M.Th. / D.Th.', date: '19 January 2026' },
      {
        programme: 'BD / M.Th. / D.Th. (with late fee)',
        date: '15 February 2026',
      },
      { programme: 'CCM', date: '1 April 2026' },
    ],
    contacts: [
      { label: 'Application forms', email: 'registrar@ubs.ac.in' },
      { label: 'BD / M.Th. / D.Th. admissions', email: 'admissions@ubs.ac.in' },
      { label: 'CCM admissions', email: 'ccm@ubs.ac.in' },
    ],
  };
}
