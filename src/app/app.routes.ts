import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CampusComponent } from './pages/campus/campus.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { FacultyComponent } from './pages/faculty/faculty.component';
import { LibraryComponent } from './pages/library/library.component';
import { StudentZoneComponent } from './pages/student-zone/student-zone.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HistoryComponent } from './pages/history/history.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { TuitionComponent } from './pages/tuition/tuition.component';
import { ResidentialProgrammesComponent } from './pages/residential-programmes/residential-programmes.component';
import { NonResidentialProgrammesComponent } from './pages/non-residential-programmes/non-residential-programmes.component';
import { FaqComponent } from './pages/faq/faq.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'campus', component: CampusComponent },
  { path: 'administration', component: AdministrationComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'student-zone', component: StudentZoneComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'apply', component: ApplyComponent },
  { path: 'tuition', component: TuitionComponent },
  { path: 'programmes/residential', component: ResidentialProgrammesComponent },
  { path: 'programmes/non-residential', component: NonResidentialProgrammesComponent },
  { path: 'faq', component: FaqComponent },
  { path: '**', redirectTo: '' },
];
