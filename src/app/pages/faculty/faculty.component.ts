import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AdminContentService,
  sortDepartments,
} from '../../services/admin/admin-content.service';

interface Faculty {
  id: number;
  name: string;
  qualificationTitle: string;
  designations: string[]; // designation + additional designations, one per line
  department: string;
  email: string;
  image: string;
  pdfPath?: string;

  qualification: string[];
  specialization: string[];
  books: string[];
  research: string[];
  articles: string[];
  journals: string[];
}

interface DepartmentGroup {
  name: string;
  faculty: Faculty[];
}

/**
 * Old records have several designations typed on one line, e.g.
 * "Dean, New Testament Associate Professor, New Testament".
 * A new line starts at any of these titles. It does not split
 * "Associate Professor & Dean" or "Vice Principal".
 */
const DESIGNATION_SPLIT =
  /(?<!&|\bVice|\bAssociate|\bAssistant|\band)\s+(?=(?:Vice Principal|Principal|Dean|Associate Professor|Assistant Professor|Professor|Lecturer|Director|Registrar|Faculty)\b)/;

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss'],
})
export class FacultyComponent implements OnInit {
  selectedFaculty: Faculty | null = null;
  departmentGroups: DepartmentGroup[] = [];

  constructor(private adminContentService: AdminContentService) {}

  ngOnInit(): void {
    this.adminContentService.getFaculty().subscribe((facultyPeople) => {
      const facultyList: Faculty[] = facultyPeople
        .filter((person) => person.isActive)
        .map((person) => {
          const email = this.cleanText(person.email);

          return {
            id: person.id ?? 0,
            name: person.name,
            qualificationTitle: this.cleanText(person.qualificationTitle),
            designations: [
              ...this.splitDesignations(person.designation),
              ...this.splitDesignations(person.additionalDesignation),
            ],
            department: this.cleanText(person.department) || 'Faculty',
            email: email.includes('@') ? email : '',
            image: person.imageUrl || 'assets/images/faculty/default-faculty.jpg',
            pdfPath: person.pdfPath || undefined,
            qualification: this.cleanList(person.qualification),
            specialization: this.cleanList(person.specialization),
            books: this.cleanList(person.books),
            research: this.cleanList(person.research),
            articles: this.cleanList(person.articles),
            journals: this.cleanList(person.journals),
          };
        });

      this.departmentGroups = this.groupByDepartment(facultyList);
    });
  }

  // ---------------------------------------------------------------
  // Grouping
  // ---------------------------------------------------------------

  /**
   * Departments follow the Faculty Type / Department dropdown order (FACULTY_DEPARTMENTS).
   * Inside a department, faculty keep the API order, which is the admin's ↑/↓ order.
   */
  private groupByDepartment(list: Faculty[]): DepartmentGroup[] {
    const names = sortDepartments([...new Set(list.map((f) => f.department))]);

    return names.map((name) => ({
      name,
      faculty: list.filter((f) => f.department === name),
    }));
  }

  // ---------------------------------------------------------------
  // Data cleanup
  // ---------------------------------------------------------------

  /** Remove HTML tags such as <p>-</p>, keeping line breaks. */
  private stripHtml(value?: string | null): string {
    return (value ?? '')
      .replace(/<\s*br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&amp;/gi, '&')
      .trim();
  }

  /** True for empty values and fillers like "-", "—", "•" or "………". */
  private isPlaceholder(value: string): boolean {
    return !value.trim() || /^[-–—.…•\s]+$/.test(value);
  }

  private cleanText(value?: string | null): string {
    const text = this.stripHtml(value);
    return this.isPlaceholder(text) ? '' : text;
  }

  /** One designation per line, whether typed on separate lines or run together. */
  private splitDesignations(value?: string | null): string[] {
    const text = this.cleanText(value);
    if (!text) return [];

    return text
      .split(/\r?\n|[|;]/)
      .flatMap((line) => line.split(DESIGNATION_SPLIT))
      .map((part) => part.replace(/\s+/g, ' ').trim().replace(/,\s*$/, ''))
      .filter((part) => part.length > 0 && !this.isPlaceholder(part));
  }

  /**
   * Drop "-" placeholders and re-join old entries that were split at a comma,
   * e.g. ["PhD - MiddleSex University", "2012"] -> ["PhD - MiddleSex University, 2012"].
   */
  private cleanList(items?: string[] | null): string[] {
    const result: string[] = [];

    for (const raw of items ?? []) {
      const item = this.stripHtml(raw);
      if (this.isPlaceholder(item)) continue;

      const previous = result[result.length - 1];
      const startsWithQuote = /^["”]/.test(item);
      const previousHasOpenQuote =
        !!previous && (previous.match(/"/g) || []).length % 2 === 1;

      const isContinuation =
        !!previous &&
        (/^[a-z0-9(),]/.test(item) || (startsWithQuote && previousHasOpenQuote));

      if (isContinuation) {
        result[result.length - 1] += (startsWithQuote ? ',' : ', ') + item;
      } else {
        result.push(item);
      }
    }

    return result;
  }

  // ---------------------------------------------------------------
  // Modal
  // ---------------------------------------------------------------

  /** Open the selected faculty profile and lock the page behind the modal. */
  openFaculty(faculty: Faculty): void {
    this.selectedFaculty = faculty;
    document.body.classList.add('faculty-modal-open');
  }

  /** Close the faculty profile modal and restore page scrolling. */
  closeFaculty(): void {
    this.selectedFaculty = null;
    document.body.classList.remove('faculty-modal-open');
  }

  /** Keep clicks inside the modal from closing it through the backdrop. */
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  /** Replace an unavailable faculty image with the default portrait. */
  imageError(event: Event): void {
    const imageElement = event.target as HTMLImageElement;
    imageElement.src = 'assets/images/faculty/default-faculty.jpg';
  }
}