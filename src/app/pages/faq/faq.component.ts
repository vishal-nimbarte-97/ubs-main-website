import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  slug: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  readonly categories: FaqCategory[] = [
    {
      title: 'General',
      slug: 'general',
      items: [
        {
          question: 'What academic pathways does UBS offer?',
          answer:
            'UBS offers residential, short-term, and non-residential theological education pathways, so you can choose the format that best fits your season of life and ministry.',
        },
        {
          question: 'When can I begin a programme?',
          answer:
            'New students are typically admitted at the start of each academic term. Exact intake dates are confirmed once the admissions office has reviewed your application.',
        },
        {
          question: 'Can I study while serving in ministry?',
          answer:
            'Yes. Our non-residential programmes are designed for learners who are balancing theological study with active ministry and work.',
        },
      ],
    },
    {
      title: 'Admissions',
      slug: 'admissions',
      items: [
        {
          question: 'How do I apply?',
          answer:
            'Start on the Apply page, choose your programme, and submit the required application materials. The admissions office will guide you through every step after that.',
        },
        {
          question: 'What does the admissions process look like?',
          answer:
            'Once you submit your application, the admissions office reviews it and reaches out if anything further is needed. After you are approved, a deposit secures your place in the programme.',
        },
        {
          question: 'What documents do I need to apply?',
          answer:
            'Requirements vary slightly by programme, but generally include a completed application form, academic records, a personal statement, and references. The admissions office can confirm the exact list for your chosen pathway.',
        },
      ],
    },
    {
      title: 'Tuition & Finances',
      slug: 'tuition-finances',
      items: [
        {
          question: 'Where can I find tuition information?',
          answer:
            'Visit the Tuition page or contact the admissions office directly for the current fee schedule and any related costs.',
        },
        {
          question: 'Are tuition assistance or payment plans available?',
          answer:
            'Options can vary by programme and term. Reach out to the admissions office to discuss what may be available to you.',
        },
      ],
    },
  ];
}
