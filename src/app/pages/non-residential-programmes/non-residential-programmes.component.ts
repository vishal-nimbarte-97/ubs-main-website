import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-non-residential-programmes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './non-residential-programmes.component.html',
  styleUrl: './non-residential-programmes.component.scss',
})
export class NonResidentialProgrammesComponent {}