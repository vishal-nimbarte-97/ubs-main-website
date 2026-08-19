import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';



interface LibraryPolicy {
  number: string;
  title: string;
  items: string[];
}

interface ReadingZone {
  title: string;
  image: string;
}

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})

export class LibraryComponent {

  activePolicy: number = 0;

  policies: LibraryPolicy[] = [

    {
      number: '01',
      title: 'Class Hours',
      items: [
        'When classes are in session, the library is open Monday to Friday from 8:30 AM to 10:00 PM.',
        'Saturday library hours are from 8:30 AM to 1:00 PM.',
        'During examinations, Monday to Friday hours are 8:30 AM to 11:00 PM.',
        'Students are not allowed to use the library during chapel and seminary program times.',
        'Check-in and check-out services are available during designated circulation hours.'
      ]
    },

    {
      number: '02',
      title: 'Policies & Facilities',
      items: [
        'Registered students, faculty and staff can use the library resources and services.',
        'Children are not allowed to use the library without permission.',
        'Distance Learning students may produce a letter from the Distance Learning Coordinator for regular use of the library.',
        'Registered users receive a library user number which can be used to access the OPAC and library services.'
      ]
    },

    {
      number: '03',
      title: 'General Instructions',
      items: [
        'Strict silence and discipline must be maintained in the library.',
        'Library space is intended for academic purposes.',
        'Use of social media is not permitted inside the library.',
        'Talking or group discussions are not permitted.',
        'Users should maintain an atmosphere of dignity, peace and quiet.',
        'Library books and resources should be handled carefully.'
      ]
    },

    {
      number: '04',
      title: 'Book Handling & Classification',
      items: [
        'Remove books from shelves carefully, one book at a time.',
        'Place fingertips on the top edge of the book and pull it out rather than pulling from the spine.',
        'Use paper flags or bookmarks to mark pages.',
        'Do not use sticky notes that may damage pages.',
        'Avoid using paper clips or objects that can damage books.',
        'Return books to the appropriate location after use.'
      ]
    },

    {
      number: '05',
      title: 'Check-in & Check-out',
      items: [
        'Bring selected books to the circulation desk.',
        'Fill in the required details on the issue card.',
        'Submit the book to the library staff at the circulation counter.',
        'Books cannot be issued using another cardholder’s account.',
        'Temporary reference and essential books may be issued with faculty approval.'
      ]
    },

    {
      number: '06',
      title: 'Circulation Policy',
      items: [
        'Students may place a hold on a general book that has already been checked out.',
        'Books can be renewed once unless another user has placed a hold.',
        'Books can be renewed using the OPAC.',
        'Distance Learning students are subject to specific circulation rules.',
        'Users are responsible for returning books on time.'
      ]
    },

    {
      number: '07',
      title: 'Physical Structure',
      items: [
        'The Reference Room is located on the ground floor.',
        'The room contains reference materials intended mainly for consultation.',
        'The Reference Room includes dictionaries, encyclopaedias, commentaries, bibliographies, indexes and directories.',
        'Periodicals including journals, magazines, reviews and newsletters are also maintained.',
        'The Archives are located on the first floor.'
      ]
    },

    {
      number: '08',
      title: 'Facilities',
      items: [
        'Computers and a printer are available on the ground floor.',
        'Photocopy services are available after payment when the facility is operational.',
        'The UBS Library collection can be searched through the KOHA OPAC.',
        'The online catalogue provides access to library collection information.'
      ]
    }

  ];


  togglePolicy(index: number): void {

    if (this.activePolicy === index) {
      this.activePolicy = -1;
    } else {
      this.activePolicy = index;
    }

  }

  readingZones: ReadingZone[] = [
    {
      title: 'Newspaper Reading Area',
      image: 'assets/library/newspaper-reading-area.jpg'
    },
    {
      title: 'Journal Reading Area',
      image: 'assets/library/journal-reading-area.jpg'
    },
    {
      title: 'Coffee Table Reading Area',
      image: 'assets/library/coffee-table-reading-area.jpg'
    }
  ];

}