import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlumniProfile } from '../../../../models/alumni-profile.model';
import { AlumniContentService } from '../../../../services/admin/alumni-content.service';

@Component({
  selector: 'app-alumni-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumni-admin.component.html',
  styleUrls: ['../shared/admin-shared.scss'],
})
export class AlumniAdminComponent implements OnInit {
  profiles: AlumniProfile[] = [];
  profileForm: AlumniProfile = this.createEmptyForm();
  introParagraphsText = '';
  editingId: number | null = null;
  isLoading = false;
  isSaving = false;
  isReadingImage = false;
  errorMessage = '';
  successMessage = '';

  constructor(private alumniContent: AlumniContentService) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.alumniContent.getAll().subscribe({
      next: (profiles) => {
        if (!Array.isArray(profiles)) {
          this.errorMessage = 'The Alumni API returned an unexpected response.';
          this.isLoading = false;
          return;
        }
        this.profiles = profiles;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = this.getErrorMessage(error, 'Unable to load alumni profiles.');
        this.isLoading = false;
      },
    });
  }

  saveProfile(): void {
    if (this.isReadingImage) {
      return;
    }

    const payload: AlumniProfile = {
      ...this.profileForm,
      introParagraphs: this.introParagraphsText
        .split('\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    };
    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request = this.editingId === null
      ? this.alumniContent.insert(payload)
      : this.alumniContent.update({ ...payload, id: this.editingId });

    request.subscribe({
      next: (response) => {
        if (!response || typeof response !== 'object') {
          this.errorMessage = 'The Alumni API did not return a saved profile.';
          this.isSaving = false;
          return;
        }

        const savedProfile = { ...payload, ...response };
        if (this.editingId === null) {
          this.profiles = [savedProfile, ...this.profiles];
          this.successMessage = 'Alumni profile added.';
        } else {
          this.profiles = this.profiles.map((profile) =>
            profile.id === this.editingId ? savedProfile : profile,
          );
          this.successMessage = 'Alumni profile updated.';
        }
        this.resetForm();
        this.isSaving = false;
      },
      error: (error: unknown) => {
        this.errorMessage = this.getErrorMessage(error, 'Unable to save the alumni profile.');
        this.isSaving = false;
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Please choose an image file.';
      input.value = '';
      return;
    }

    this.errorMessage = '';
    this.isReadingImage = true;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        this.errorMessage = 'The selected image could not be read.';
      } else {
        this.profileForm.image = reader.result;
      }
      this.isReadingImage = false;
    };
    reader.onerror = () => {
      this.errorMessage = `Unable to read ${file.name}.`;
      this.isReadingImage = false;
    };
    reader.readAsDataURL(file);
  }

  editProfile(profile: AlumniProfile): void {
    if (profile.id === undefined) {
      this.errorMessage = 'This sample profile has no backend ID and cannot be edited.';
      return;
    }
    this.editingId = profile.id;
    this.profileForm = { ...profile };
    this.introParagraphsText = profile.introParagraphs?.join('\n') ?? '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  deleteProfile(profile: AlumniProfile): void {
    if (profile.id === undefined) {
      this.errorMessage = 'This profile has no backend ID and cannot be deleted.';
      return;
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.alumniContent.delete(profile.id).subscribe({
      next: (response) => {
        if (!response) {
          this.errorMessage = 'The Alumni API did not confirm deletion.';
          return;
        }
        this.profiles = this.profiles.filter((item) => item.id !== profile.id);
        if (this.editingId === profile.id) {
          this.resetForm();
        }
        this.successMessage = 'Alumni profile deleted.';
      },
      error: (error: unknown) => {
        this.errorMessage = this.getErrorMessage(error, 'Unable to delete the alumni profile.');
      },
    });
  }

  resetForm(): void {
    this.profileForm = this.createEmptyForm();
    this.introParagraphsText = '';
    this.editingId = null;
  }

  private createEmptyForm(): AlumniProfile {
    return {
      name: '',
      title: '',
      period: '',
      image: '',
      summary: '',
      details: '',
      isActive: true,
    };
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
      return `${fallback} ${error.message}`;
    }
    return fallback;
  }
}
