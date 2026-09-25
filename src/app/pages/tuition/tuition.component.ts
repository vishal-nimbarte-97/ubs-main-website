import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminContentService } from '../../services/admin/admin-content.service';

interface FeeTableRow {
  course: string;
  values: string[];
}

interface FeeTable {
  title: string;
  columns: string[];
  rows: FeeTableRow[];
}

@Component({
  selector: 'app-tuition',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tuition.component.html',
  styleUrl: './tuition.component.scss',
})
export class TuitionComponent implements OnInit {
  feeTables: FeeTable[] = [
    {
      title: 'Residential Programmes',
      columns: ['Course', 'Single Student', 'Married Student with Quarters'],
      rows: [
        { course: 'Bachelor of Divinity', values: ['Rs. 1,36,510/-', 'Rs. 1,36,510/-'] },
        { course: 'Master of Theology', values: ['Rs. 1,51,490/-', 'Rs. 1,30,240/-'] },
        { course: 'Doctor of Theology', values: ['Rs. 1,87,990/-', 'Rs. 1,87,990/-'] },
        {
          course: "Certificate in Children's Ministry",
          values: ['Rs. 68, 95/-', 'Contact Registrar'],
        },
      ],
    },
    {
      title: 'Non-Residential Programmes',
      columns: ['Course', 'English', 'Hindi', 'Marathi'],
      rows: [
        {
          course: 'Master of Divinity',
          values: ['To be updated soon', 'To be updated soon', 'To be updated soon'],
        },
      ],
    },
  ];

  constructor(private readonly adminContent: AdminContentService) {}

  ngOnInit(): void {
    this.adminContent.getTuitionRows().subscribe((rows) => {
      if (rows.length) {
        this.feeTables = this.buildFeeTables(rows);
      }
    });
  }

  private buildFeeTables(
    rows: Array<{
      programmeType?: 'residential' | 'non-residential';
      course?: string;
      programmeName?: string;
      singleStudent?: string;
      marriedStudentWithQuarters?: string;
      english?: string;
      hindi?: string;
      marathi?: string;
      mainCampus?: string;
      onlineCampus?: string;
      extension?: string;
    }>,
  ): FeeTable[] {
    const normalized = rows
      .filter((row) => (row.course ?? row.programmeName ?? '').trim())
      .map((row) => ({
        programmeType: row.programmeType ?? (/(non|non-residential)/i.test(row.programmeName ?? '') ? 'non-residential' : 'residential'),
        course: (row.course ?? row.programmeName ?? '').trim(),
        singleStudent: row.singleStudent ?? row.mainCampus ?? '',
        marriedStudentWithQuarters: row.marriedStudentWithQuarters ?? row.onlineCampus ?? '',
        english: row.english ?? row.mainCampus ?? '',
        hindi: row.hindi ?? row.onlineCampus ?? '',
        marathi: row.marathi ?? row.extension ?? '',
      }));

    if (!normalized.length) {
      return this.feeTables;
    }

    const residentialRows: FeeTableRow[] = normalized
      .filter((row) => row.programmeType === 'residential')
      .map((row) => ({
        course: row.course,
        values: [row.singleStudent || 'To be updated', row.marriedStudentWithQuarters || 'To be updated'],
      }));

    const nonResidentialRows: FeeTableRow[] = normalized
      .filter((row) => row.programmeType === 'non-residential')
      .map((row) => ({
        course: row.course,
        values: [row.english || 'To be updated soon', row.hindi || 'To be updated soon', row.marathi || 'To be updated soon'],
      }));

    const tables: FeeTable[] = [];

    if (residentialRows.length) {
      tables.push({
        title: 'Residential Programmes',
        columns: ['Course', 'Single Student', 'Married Student with Quarters'],
        rows: residentialRows,
      });
    }

    if (nonResidentialRows.length) {
      tables.push({
        title: 'Non-Residential Programmes',
        columns: ['Course', 'English', 'Hindi', 'Marathi'],
        rows: nonResidentialRows,
      });
    }

    return tables.length ? tables : this.feeTables;
  }
}
