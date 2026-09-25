import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminContentService } from '../../services/admin/admin-content.service';

interface TuitionRow {
  programme: string;
  mainCampus: string;
  onlineCampus: string;
  extension: string;
}

@Component({
  selector: 'app-tuition',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tuition.component.html',
  styleUrl: './tuition.component.scss',
})
export class TuitionComponent implements OnInit {
  // Display the currently available fee status for each study format.
  tuitionRows: TuitionRow[] = [
    {
      programme: 'Residential programmes',
      mainCampus: 'To be updated',
      onlineCampus: 'Not applicable',
      extension: 'Not applicable',
    },
    {
      programme: 'Non-residential programmes',
      mainCampus: 'Not applicable',
      onlineCampus: 'To be updated',
      extension: 'To be updated',
    },
    {
      programme: 'Short-term courses',
      mainCampus: 'To be updated',
      onlineCampus: 'Contact UBS',
      extension: 'Contact UBS',
    },
  ];

  constructor(private readonly adminContent: AdminContentService) {}

  ngOnInit(): void {
    this.adminContent.getTuitionRows().subscribe((rows) => {
      if (rows.length) {
        this.tuitionRows = rows
          .filter((row) => row.isActive !== false)
          .map((row) => ({
            programme: row.programmeName,
            mainCampus: row.mainCampus,
            onlineCampus: row.onlineCampus,
            extension: row.extension,
          }));
      }
    });
  }
}
