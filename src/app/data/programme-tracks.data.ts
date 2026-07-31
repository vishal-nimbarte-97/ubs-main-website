import { ProgrammeTrack } from '../models';

export const PROGRAMME_TRACKS: ProgrammeTrack[] = [
  {
    icon: 'fa-book',
    title: 'Long Term Courses (Residential)',
    image: 'assets/img/track-longterm.jpg',
    description:
      'Bachelor of Divinity, Master of Theology, and Doctor of Theology — full-time residential formation combining biblical scholarship with spiritual and community life.',
    link: '/programmes/long-term',
  },
  {
    icon: 'fa-child',
    title: 'Short Term Courses (Residential)',
    image: 'assets/img/track-shortterm.jpg',
    description:
      'Centre for Children\u2019s Ministry and Comprehensive Training tracks, built for focused, intensive equipping in specific areas of ministry.',
    link: '/programmes/short-term',
  },
  {
    icon: 'fa-globe',
    title: 'Distance Courses (Non-Residential)',
    image: 'assets/img/track-distance.jpg',
    description:
      'Master of Divinity (ATA) offered in English, Hindi, and Marathi — theological training for those serving while studying from home.',
    link: '/programmes/distance',
  },
];
