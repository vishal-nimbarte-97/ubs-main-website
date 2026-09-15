import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  showPassword = false;
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.loading) return;
    this.errorMessage = '';
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.isSuccess) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.errorMessage = res.message;
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Server error. Try again.';
      },
    });
  }
}