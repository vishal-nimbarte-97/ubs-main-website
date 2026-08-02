import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  newsletterName = '';
  newsletterEmail = '';
  newsletterSubmitted = false;
  currentYear = new Date().getFullYear();

  socialLinks = [
    { icon: 'fa-brands fa-facebook-f', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'fa-brands fa-instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'fa-brands fa-x-twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'fa-brands fa-youtube', url: 'https://youtube.com', label: 'YouTube' },
  ];

  subscribeNewsletter(): void {
    if (!this.newsletterName || !this.newsletterEmail) return;
    this.newsletterSubmitted = true;
    this.newsletterName = '';
    this.newsletterEmail = '';
    setTimeout(() => (this.newsletterSubmitted = false), 3000);
  }
}