import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ubs-website';
  isHome = true;
  isAdminRoute = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateRouteState(this.router.url);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.updateRouteState(e.urlAfterRedirects);
      });
  }

  private updateRouteState(url: string): void {
    const path = url.split(/[?#]/)[0];
    this.isHome = path === '/' || path === '';
    this.isAdminRoute = path.startsWith('/admin');
  }
}
