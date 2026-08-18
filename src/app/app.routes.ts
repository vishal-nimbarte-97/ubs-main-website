import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CampusComponent } from './pages/campus/campus.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { LibraryComponent } from './pages/library/library.component';
import { AdmissionsComponent } from './pages/admissions/admissions.component';
import { StudentZoneComponent } from './pages/student-zone/student-zone.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'campus', component: CampusComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'admissions', component: AdmissionsComponent },
  { path: 'student-zone', component: StudentZoneComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: '**', redirectTo: '' },
];
