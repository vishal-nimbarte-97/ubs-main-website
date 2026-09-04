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
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'About Us', url: '/about' },
    { label: 'Campus', url: '/campus' },
    { label: 'Administration', url: '/administration' },
    { label: 'Library', url: '/library' },
    { label: 'Admissions', url: '/admissions' },
    { label: 'Student Zone', url: '/student-zone' },
    { label: 'Gallery', url: '/gallery' },
  ];

  legalLinks = [
    { label: 'Privacy Policy', url: '/privacy-policy' },
    { label: 'Terms & Conditions', url: '/terms-conditions' },
  ];

  socialLinks = [
    {
      icon: 'fa-brands fa-facebook-f',
      url: 'https://facebook.com',
      label: 'Facebook',
    },
    {
      icon: 'fa-brands fa-instagram',
      url: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      icon: 'fa-brands fa-linkedin-in',
      url: 'https://linkedin.com',
      label: 'LinkedIn',
    },
    {
      icon: 'fa-brands fa-twitter',
      url: 'https://twitter.com',
      label: 'Twitter',
    },
    {
      icon: 'fa-brands fa-youtube',
      url: 'https://youtube.com',
      label: 'YouTube',
    },
  ];
}
