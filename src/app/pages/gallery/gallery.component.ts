import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AdminContentService,
  GALLERY_EVENT_CATEGORY,
  GalleryItem,
} from '../../services/admin/admin-content.service';

interface GalleryPhoto {
  src: string;
  alt: string;
  title: string;
  category: string;
}

interface GalleryCategoryCard {
  title: string;
  image: string;
  photoCount: number;
}

interface CommitteeGalleryPhoto {
  title: string;
  images: string[];
}

interface GalleryEvent {
  title: string;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  private readonly defaultCategories: string[] = [
    'Campus',
    'Learning',
    'Heritage',
    'People',
  ];
  activeGalleryCategory: string | null = null;
  selectedIndex = -1;
  selectedCommitteeIndex = -1;
  selectedCommitteeImageIndex = 0;

  // "campus" and "Campus" are treated as one category
  private categoryAliases = new Map<string, string>();
  // when set, the committee lightbox shows this event's photos instead
  private eventLightbox: CommitteeGalleryPhoto | null = null;

  private readonly fallbackFeaturedEvents: GalleryEvent[] = [
    {
      title: 'Foundation Day Celebration',
      description:
        'Each year, the UBS community gathers to celebrate the Seminary’s vision, heritage and continuing mission through worship, thanksgiving and fellowship. These moments remind students, faculty and alumni that the story of UBS is not only historical but alive in every generation of ministry.',
      images: [
        'assets/gallery/heritage-7.png',
        'assets/gallery/heritage-5.png',
        'assets/gallery/heritage-9.png',
      ],
    },
    {
      title: 'Campus Worship & Fellowship',
      description:
        'From prayer gatherings to student-led worship, campus life at UBS is shaped by spiritual unity and shared devotion. These events create rhythms of worship, mutual encouragement and practical formation that strengthen the community across classrooms, dormitories and ministry contexts.',
      images: [
        'assets/gallery/image_11.jpg',
        'assets/gallery/image_12.png',
        'assets/gallery/people-about-2.png',
      ],
    },
    {
      title: 'Community & Cultural Encounters',
      description:
        'UBS values the richness of cultural diversity and the beauty of intergenerational fellowship. Through student gatherings, cultural programmes and shared celebrations, the Seminary forms graduates who are not only academically equipped but also deeply rooted in community and service.',
      images: [
        'assets/gallery/image_3.jpg',
        'assets/gallery/image_5.jpg',
        'assets/gallery/people-about-5.png',
      ],
    },
  ];
  featuredEvents: GalleryEvent[] = this.fallbackFeaturedEvents;

  ubssfCommitteeGallery: CommitteeGalleryPhoto[] = [
    { title: 'Prayer Committee', images: ['assets/gallery/people-1.png', 'assets/gallery/people-4.png', 'assets/gallery/people-7.png'] },
    { title: 'Missionary Project Committee', images: ['assets/gallery/image_1.jpg', 'assets/gallery/image_2.jpg', 'assets/gallery/image_3.jpg'] },
    { title: 'Social and Cultural Committee', images: ['assets/gallery/image_4.jpg', 'assets/gallery/image_5.jpg'] },
    { title: 'Handicraft Committee', images: ['assets/gallery/image_6.jpg', 'assets/gallery/image_7.jpg'] },
    { title: 'Literary, Debate, and Publication Committee', images: ['assets/gallery/image_8.jpg', 'assets/gallery/image_9.jpg'] },
    { title: 'Service Committee', images: ['assets/gallery/image_10.png', 'assets/gallery/image_11.jpg'] },
    { title: 'Sports and Games Committee', images: ['assets/gallery/image_12.png', 'assets/gallery/image_13.png'] },
    { title: 'Missionary Conference Committee', images: ['assets/gallery/image_14.png', 'assets/gallery/image_15.png'] },
    { title: 'Campus Care Committee', images: ['assets/gallery/heritage-1.png', 'assets/gallery/heritage-3.png'] },
    { title: 'Days of Challenge Committee', images: ['assets/gallery/heritage-5.png', 'assets/gallery/heritage-7.png'] },
  ];

  // photos: GalleryPhoto[] = [
  //   // ---- Campus life ----
  //   {
  //     src: 'assets/gallery/image_1.jpg',
  //     alt: 'UBS campus building',
  //     title: 'A place to grow',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_2.jpg',
  //     alt: 'View around the UBS campus',
  //     title: 'Open horizons',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_3.jpg',
  //     alt: 'Students gathered at UBS',
  //     title: 'Together in purpose',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_4.jpg',
  //     alt: 'Campus life at UBS',
  //     title: 'Shared moments',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_5.jpg',
  //     alt: 'Students on the grounds',
  //     title: 'Everyday rhythms',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_6.jpg',
  //     alt: 'UBS campus grounds',
  //     title: 'Rooted in community',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_7.jpg',
  //     alt: 'UBS student experience',
  //     title: 'Life between classes',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_8.jpg',
  //     alt: 'Walkways of the seminary',
  //     title: 'Paths of formation',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_9.jpg',
  //     alt: 'Seminary campus surroundings',
  //     title: 'Quiet corners',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_10.png',
  //     alt: 'UBS campus community',
  //     title: 'Growing together',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_11.jpg',
  //     alt: 'Evening on campus',
  //     title: 'Golden hour at UBS',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_12.png',
  //     alt: 'A moment at UBS',
  //     title: 'Faith in action',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_13.png',
  //     alt: 'Campus gathering',
  //     title: 'One family',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_14.png',
  //     alt: 'Seminary landscape',
  //     title: 'Grounded in Pune',
  //     category: 'Campus',
  //   },
  //   {
  //     src: 'assets/gallery/image_15.png',
  //     alt: 'Campus view',
  //     title: 'Home away from home',
  //     category: 'Campus',
  //   },

  //   // ---- Learning ----
  //   {
  //     src: 'assets/gallery/books.jpg',
  //     alt: 'Shelves of books in the library',
  //     title: 'Shelves of wisdom',
  //     category: 'Learning',
  //   },
  //   {
  //     src: 'assets/gallery/study-space.jpg',
  //     alt: 'Quiet study space',
  //     title: 'Room to focus',
  //     category: 'Learning',
  //   },
  //   {
  //     src: 'assets/gallery/reference.jpg',
  //     alt: 'Reference section of the library',
  //     title: 'Deep research',
  //     category: 'Learning',
  //   },
  //   {
  //     src: 'assets/gallery/journal-zone.jpg',
  //     alt: 'Journal reading zone',
  //     title: 'Scholarly conversation',
  //     category: 'Learning',
  //   },
  //   {
  //     src: 'assets/gallery/archives.jpg',
  //     alt: 'Library archives',
  //     title: 'Preserved knowledge',
  //     category: 'Learning',
  //   },
  //   {
  //     src: 'assets/gallery/rare-books.jpg',
  //     alt: 'Rare book collection',
  //     title: 'Rare & treasured',
  //     category: 'Learning',
  //   },
  //   {
  //     src: 'assets/gallery/coffee-table-zone.jpg',
  //     alt: 'Coffee table reading zone',
  //     title: 'Conversations over coffee',
  //     category: 'Learning',
  //   },
  //   {
  //     src: 'assets/gallery/newspaper-zone.jpg',
  //     alt: 'Newspaper zone',
  //     title: 'Informed minds',
  //     category: 'Learning',
  //   },

  //   // ---- Heritage ----
  //   {
  //     src: 'assets/gallery/heritage-1.png',
  //     alt: 'Historical photograph of UBS',
  //     title: 'Where it began',
  //     category: 'Heritage',
  //   },
  //   {
  //     src: 'assets/gallery/heritage-3.png',
  //     alt: 'Early days of the seminary',
  //     title: 'The early years',
  //     category: 'Heritage',
  //   },
  //   {
  //     src: 'assets/gallery/heritage-5.png',
  //     alt: 'Founders and pioneers',
  //     title: 'Pioneers of vision',
  //     category: 'Heritage',
  //   },
  //   {
  //     src: 'assets/gallery/heritage-7.png',
  //     alt: 'Milestone moment in UBS history',
  //     title: 'Milestones',
  //     category: 'Heritage',
  //   },
  //   {
  //     src: 'assets/gallery/heritage-9.png',
  //     alt: 'Archive photograph from campus',
  //     title: 'Through the decades',
  //     category: 'Heritage',
  //   },
  //   {
  //     src: 'assets/gallery/heritage-11.png',
  //     alt: 'Legacy photograph',
  //     title: 'A living legacy',
  //     category: 'Heritage',
  //   },

  //   // ---- People ----
  //   {
  //     src: 'assets/gallery/people-1.png',
  //     alt: 'Faculty member of UBS',
  //     title: 'Mentors in faith',
  //     category: 'People',
  //   },
  //   {
  //     src: 'assets/gallery/people-4.png',
  //     alt: 'Professor at UBS',
  //     title: 'Teachers of truth',
  //     category: 'People',
  //   },
  //   {
  //     src: 'assets/gallery/people-7.png',
  //     alt: 'Lecturer at UBS',
  //     title: 'Guides for the journey',
  //     category: 'People',
  //   },
  //   {
  //     src: 'assets/gallery/people-about-2.png',
  //     alt: 'Community member at UBS',
  //     title: 'Faces of UBS',
  //     category: 'People',
  //   },
  //   {
  //     src: 'assets/gallery/people-about-5.png',
  //     alt: 'Student portrait at UBS',
  //     title: 'Called to serve',
  //     category: 'People',
  //   },
  // ];

  photos: GalleryPhoto[] = [];

  selectedCommunityTitle = '';

  constructor(
    private readonly adminContent: AdminContentService,
    private readonly route: ActivatedRoute,
  ) {}

  private canonicalCategory(raw: string | null | undefined): string {
    const name = (raw ?? '').trim() || 'Campus';
    const key = name.toLowerCase();
    if (!this.categoryAliases.has(key)) {
      const known = this.defaultCategories.find((c) => c.toLowerCase() === key);
      this.categoryAliases.set(key, known ?? name);
    }
    return this.categoryAliases.get(key)!;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.selectedCommunityTitle = params.get('community')?.trim() ?? '';
    });

    this.adminContent.getGalleryItems().subscribe((items) => {
      const activeItems = items.filter((item) => item.isActive);
      const isEvent = (item: GalleryItem) =>
        (item.category ?? '').trim() === GALLERY_EVENT_CATEGORY;

      // events: oldest photo first, so photos follow upload order
      const eventItems = activeItems
        .filter(isEvent)
        .sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

      if (eventItems.length) {
        const events = new Map<string, GalleryEvent>();
        eventItems.forEach((item) => {
          const title = item.title.trim();
          const key = title.toLowerCase();
          const event =
            events.get(key) ?? { title, description: item.altText ?? '', images: [] };
          if (item.imageUrl && !event.images.includes(item.imageUrl)) {
            event.images.push(item.imageUrl);
          }
          events.set(key, event);
        });
        this.featuredEvents = Array.from(events.values()).reverse(); // newest event first
      }

      const existingSources = new Set(this.photos.map((photo) => photo.src));
      const addedPhotos = activeItems
        .filter((item) => !isEvent(item))
        .map((item) => ({
          src: item.imageUrl,
          alt: item.altText || item.title,
          title: item.title,
          category: this.canonicalCategory(item.category),
        }))
        .filter((photo) => {
          if (!photo.src || existingSources.has(photo.src)) return false;
          existingSources.add(photo.src);
          return true;
        });

      this.photos = [...this.photos, ...addedPhotos];
    });

    this.adminContent.getStudentZoneItems().subscribe((items) => {
      const communityItems = items.filter(
        (item) =>
          item.isActive && item.category.trim() === 'UBSSF Community',
      );

      if (!communityItems.length) return;

      const grouped = new Map<string, string[]>();
      communityItems.forEach((item) => {
        const key = item.title.trim().toLocaleLowerCase();
        const images = grouped.get(key) ?? [];
        if (item.imageUrl && !images.includes(item.imageUrl)) {
          grouped.set(key, [...images, item.imageUrl]);
        }
      });

      const mergedCommittees = this.ubssfCommitteeGallery.map((committee) => {
        const key = committee.title.toLocaleLowerCase();
        const uploadedImages = grouped.get(key) ?? [];
        grouped.delete(key);

        return {
          ...committee,
          images: uploadedImages.length
            ? uploadedImages
            : committee.images,
        };
      });

      grouped.forEach((images, key) => {
        const title =
          communityItems.find(
            (item) => item.title.trim().toLocaleLowerCase() === key,
          )?.title.trim() ?? key;
        mergedCommittees.push({ title, images });
      });

      this.ubssfCommitteeGallery = mergedCommittees;
    });
  }

  get selectedCommunity(): CommitteeGalleryPhoto | null {
    const requestedTitle = this.selectedCommunityTitle.toLocaleLowerCase();
    return (
      this.ubssfCommitteeGallery.find(
        (committee) => committee.title.toLocaleLowerCase() === requestedTitle,
      ) ?? null
    );
  }

  get categoryNames(): string[] {
    // only categories that actually have photos
    const used = new Set(
      this.photos
        .map((photo) => photo.category.trim())
        .filter((category) => category && category !== GALLERY_EVENT_CATEGORY),
    );
  
    const defaults = this.defaultCategories.filter((c) => used.has(c));
    const custom = [...used].filter((c) => !this.defaultCategories.includes(c));
  
    return [...defaults, ...custom];
  }

  get categoryCards(): GalleryCategoryCard[] {
    return this.categoryNames
      .map((category) => {
        const categoryPhotos = this.photos.filter(
          (photo) => photo.category === category,
        );
  
        return {
          title: category,
          image: categoryPhotos[0]?.src ?? '',
          photoCount: categoryPhotos.length,
        };
      })
      .filter((card) => card.photoCount > 0); // hides any card with 0 moments
  }

  get categoryPhotos(): GalleryPhoto[] {
    return this.activeGalleryCategory
      ? this.photos.filter(
          (photo) => photo.category === this.activeGalleryCategory,
        )
      : [];
  }

  get selectedPhoto(): GalleryPhoto | null {
    return this.selectedIndex >= 0 &&
      this.selectedIndex < this.categoryPhotos.length
      ? this.categoryPhotos[this.selectedIndex]
      : null;
  }

  openCategoryGallery(category: string): void {
    this.selectedIndex = -1;
    this.activeGalleryCategory = category;
  }

  closeCategoryGallery(): void {
    this.activeGalleryCategory = null;
  }

  openLightbox(index: number): void {
    // Open the selected category photo in the full-screen viewer.
    this.selectedIndex = index;
  }

  closeLightbox(): void {
    // A negative index represents a closed lightbox.
    this.selectedIndex = -1;
  }

  previousPhoto(event?: Event): void {
    event?.stopPropagation();
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.categoryPhotos.length - 1; // wrap around
    }
  }

  nextPhoto(event?: Event): void {
    event?.stopPropagation();
    if (this.selectedIndex < this.categoryPhotos.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0; // wrap around
    }
  }

  get selectedCommittee(): CommitteeGalleryPhoto | null {
    if (this.eventLightbox) return this.eventLightbox;
    return this.selectedCommitteeIndex >= 0
      ? this.ubssfCommitteeGallery[this.selectedCommitteeIndex]
      : null;
  }

  openCommitteeGallery(index: number): void {
    this.eventLightbox = null;
    this.selectedCommitteeIndex = index;
    this.selectedCommitteeImageIndex = 0;
  }

  openEventGallery(event: GalleryEvent, startIndex = 0): void {
    this.eventLightbox = { title: event.title, images: event.images };
    this.selectedCommitteeIndex = 0; // keeps the keyboard handler working
    this.selectedCommitteeImageIndex = startIndex;
  }

  closeCommitteeGallery(): void {
    this.eventLightbox = null;
    this.selectedCommitteeIndex = -1;
    this.selectedCommitteeImageIndex = 0;
  }

  previousCommitteeImage(event?: Event): void {
    event?.stopPropagation();
    const images = this.selectedCommittee?.images ?? [];
    this.selectedCommitteeImageIndex =
      this.selectedCommitteeImageIndex > 0
        ? this.selectedCommitteeImageIndex - 1
        : images.length - 1;
  }

  nextCommitteeImage(event?: Event): void {
    event?.stopPropagation();
    const images = this.selectedCommittee?.images ?? [];
    this.selectedCommitteeImageIndex =
      this.selectedCommitteeImageIndex < images.length - 1
        ? this.selectedCommitteeImageIndex + 1
        : 0;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    // Provide the same lightbox controls to keyboard users as the buttons.
    if (this.selectedCommitteeIndex >= 0) {
      if (event.key === 'Escape') this.closeCommitteeGallery();
      if (event.key === 'ArrowLeft') this.previousCommitteeImage();
      if (event.key === 'ArrowRight') this.nextCommitteeImage();
      return;
    }
    if (this.selectedIndex >= 0) {
      if (event.key === 'Escape') this.closeLightbox();
      if (event.key === 'ArrowLeft') this.previousPhoto();
      if (event.key === 'ArrowRight') this.nextPhoto();
      return;
    }
    if (event.key === 'Escape' && this.activeGalleryCategory) {
      this.closeCategoryGallery();
      return;
    }
  }

  // Touch swipe support for the lightbox
  private touchStartX = 0;

  onTouchStart(event: TouchEvent): void {
    // Record the starting point used to calculate a horizontal swipe.
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    // Change photos only when the gesture is long enough to be intentional.
    const delta = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(delta) < 50) return;
    if (delta > 0) this.previousPhoto();
    else this.nextPhoto();
  }
}