import { CalendarEvent } from '../models';
import { isoInCurrentMonth } from '../utils/date.util';

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    date: isoInCurrentMonth(12),
    title: 'UBS Foundation Day',
    description:
      'Chapel service and campus-wide celebration marking the seminary\u2019s founding.',
  },
  {
    date: isoInCurrentMonth(20),
    title: 'Convocation Ceremony',
    description:
      'Graduating class from residential and distance programmes commissioned for ministry.',
  },
  {
    date: isoInCurrentMonth(25),
    title: 'Open Day for Prospective Students',
    description:
      'Campus tours, faculty Q&A, and admissions guidance for the 2026\u201327 intake.',
  },
];
