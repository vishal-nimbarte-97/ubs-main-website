import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
export class TuitionComponent {
  readonly tuitionRows: TuitionRow[] = [
    { programme: 'Residential programmes', mainCampus: 'To be updated', onlineCampus: 'Not applicable', extension: 'Not applicable' },
    { programme: 'Non-residential programmes', mainCampus: 'Not applicable', onlineCampus: 'To be updated', extension: 'To be updated' },
    { programme: 'Short-term courses', mainCampus: 'To be updated', onlineCampus: 'Contact UBS', extension: 'Contact UBS' },
  ];
}
