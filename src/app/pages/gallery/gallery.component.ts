import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

type Category = 'All' | 'Campus' | 'Learning' | 'Heritage' | 'People';

interface GalleryPhoto {
  src: string;
  alt: string;
  title: string;
  category: Exclude<Category, 'All'>;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  readonly categories: Category[] = ['All', 'Campus', 'Learning', 'Heritage', 'People'];
  activeCategory: Category = 'All';
  selectedIndex = -1;

  readonly featuredEvents = [
    {
      title: 'Foundation Day Celebration',
      description:
        'Each year, the UBS community gathers to celebrate the Seminary’s vision, heritage and continuing mission through worship, thanksgiving and fellowship. These moments remind students, faculty and alumni that the story of UBS is not only historical but alive in every generation of ministry.',
      images: [
        'assets/gallery/heritage-7.png',
        'assets/gallery/heritage-5.png',
        'assets/gallery/heritage-9.png'
      ]
    },
    {
      title: 'Campus Worship & Fellowship',
      description:
        'From prayer gatherings to student-led worship, campus life at UBS is shaped by spiritual unity and shared devotion. These events create rhythms of worship, mutual encouragement and practical formation that strengthen the community across classrooms, dormitories and ministry contexts.',
      images: [
        'assets/gallery/image_11.jpg',
        'assets/gallery/image_12.png',
        'assets/gallery/people-about-2.png'
      ]
    },
    {
      title: 'Community & Cultural Encounters',
      description:
        'UBS values the richness of cultural diversity and the beauty of intergenerational fellowship. Through student gatherings, cultural programmes and shared celebrations, the Seminary forms graduates who are not only academically equipped but also deeply rooted in community and service.',
      images: [
        'assets/gallery/image_3.jpg',
        'assets/gallery/image_5.jpg',
        'assets/gallery/people-about-5.png'
      ]
    }
  ];

  readonly photos: GalleryPhoto[] = [
    // ---- Campus life ----
    { src: 'assets/gallery/image_1.jpg', alt: 'UBS campus building', title: 'A place to grow', category: 'Campus' },
    { src: 'assets/gallery/image_2.jpg', alt: 'View around the UBS campus', title: 'Open horizons', category: 'Campus' },
    { src: 'assets/gallery/image_3.jpg', alt: 'Students gathered at UBS', title: 'Together in purpose', category: 'Campus' },
    { src: 'assets/gallery/image_4.jpg', alt: 'Campus life at UBS', title: 'Shared moments', category: 'Campus' },
    { src: 'assets/gallery/image_5.jpg', alt: 'Students on the grounds', title: 'Everyday rhythms', category: 'Campus' },
    { src: 'assets/gallery/image_6.jpg', alt: 'UBS campus grounds', title: 'Rooted in community', category: 'Campus' },
    { src: 'assets/gallery/image_7.jpg', alt: 'UBS student experience', title: 'Life between classes', category: 'Campus' },
    { src: 'assets/gallery/image_8.jpg', alt: 'Walkways of the seminary', title: 'Paths of formation', category: 'Campus' },
    { src: 'assets/gallery/image_9.jpg', alt: 'Seminary campus surroundings', title: 'Quiet corners', category: 'Campus' },
    { src: 'assets/gallery/image_10.png', alt: 'UBS campus community', title: 'Growing together', category: 'Campus' },
    { src: 'assets/gallery/image_11.jpg', alt: 'Evening on campus', title: 'Golden hour at UBS', category: 'Campus' },
    { src: 'assets/gallery/image_12.png', alt: 'A moment at UBS', title: 'Faith in action', category: 'Campus' },
    { src: 'assets/gallery/image_13.png', alt: 'Campus gathering', title: 'One family', category: 'Campus' },
    { src: 'assets/gallery/image_14.png', alt: 'Seminary landscape', title: 'Grounded in Pune', category: 'Campus' },
    { src: 'assets/gallery/image_15.png', alt: 'Campus view', title: 'Home away from home', category: 'Campus' },

    // ---- Learning ----
    { src: 'assets/gallery/books.jpg', alt: 'Shelves of books in the library', title: 'Shelves of wisdom', category: 'Learning' },
    { src: 'assets/gallery/study-space.jpg', alt: 'Quiet study space', title: 'Room to focus', category: 'Learning' },
    { src: 'assets/gallery/reference.jpg', alt: 'Reference section of the library', title: 'Deep research', category: 'Learning' },
    { src: 'assets/gallery/journal-zone.jpg', alt: 'Journal reading zone', title: 'Scholarly conversation', category: 'Learning' },
    { src: 'assets/gallery/archives.jpg', alt: 'Library archives', title: 'Preserved knowledge', category: 'Learning' },
    { src: 'assets/gallery/rare-books.jpg', alt: 'Rare book collection', title: 'Rare & treasured', category: 'Learning' },
    { src: 'assets/gallery/coffee-table-zone.jpg', alt: 'Coffee table reading zone', title: 'Conversations over coffee', category: 'Learning' },
    { src: 'assets/gallery/newspaper-zone.jpg', alt: 'Newspaper zone', title: 'Informed minds', category: 'Learning' },

    // ---- Heritage ----
    { src: 'assets/gallery/heritage-1.png', alt: 'Historical photograph of UBS', title: 'Where it began', category: 'Heritage' },
    { src: 'assets/gallery/heritage-3.png', alt: 'Early days of the seminary', title: 'The early years', category: 'Heritage' },
    { src: 'assets/gallery/heritage-5.png', alt: 'Founders and pioneers', title: 'Pioneers of vision', category: 'Heritage' },
    { src: 'assets/gallery/heritage-7.png', alt: 'Milestone moment in UBS history', title: 'Milestones', category: 'Heritage' },
    { src: 'assets/gallery/heritage-9.png', alt: 'Archive photograph from campus', title: 'Through the decades', category: 'Heritage' },
    { src: 'assets/gallery/heritage-11.png', alt: 'Legacy photograph', title: 'A living legacy', category: 'Heritage' },

    // ---- People ----
    { src: 'assets/gallery/people-1.png', alt: 'Faculty member of UBS', title: 'Mentors in faith', category: 'People' },
    { src: 'assets/gallery/people-4.png', alt: 'Professor at UBS', title: 'Teachers of truth', category: 'People' },
    { src: 'assets/gallery/people-7.png', alt: 'Lecturer at UBS', title: 'Guides for the journey', category: 'People' },
    { src: 'assets/gallery/people-about-2.png', alt: 'Community member at UBS', title: 'Faces of UBS', category: 'People' },
    { src: 'assets/gallery/people-about-5.png', alt: 'Student portrait at UBS', title: 'Called to serve', category: 'People' },
  ];

  get filteredPhotos(): GalleryPhoto[] {
    return this.activeCategory === 'All'
      ? this.photos
      : this.photos.filter((photo) => photo.category === this.activeCategory);
  }

  get selectedPhoto(): GalleryPhoto | null {
    return this.selectedIndex >= 0 && this.selectedIndex < this.filteredPhotos.length
      ? this.filteredPhotos[this.selectedIndex]
      : null;
  }

  selectCategory(category: Category): void {
    this.activeCategory = category;
    this.selectedIndex = -1;
  }

  openLightbox(index: number): void {
    this.selectedIndex = index;
  }

  closeLightbox(): void {
    this.selectedIndex = -1;
  }

  previousPhoto(event?: Event): void {
    event?.stopPropagation();
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.filteredPhotos.length - 1; // wrap around
    }
  }

  nextPhoto(event?: Event): void {
    event?.stopPropagation();
    if (this.selectedIndex < this.filteredPhotos.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0; // wrap around
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (this.selectedIndex < 0) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft') this.previousPhoto();
    if (event.key === 'ArrowRight') this.nextPhoto();
  }

  // Touch swipe support for the lightbox
  private touchStartX = 0;

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const delta = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) this.previousPhoto();
    else this.nextPhoto();
  }
}