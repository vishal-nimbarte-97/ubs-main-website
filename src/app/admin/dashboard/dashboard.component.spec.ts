import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, DashboardComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('provides six sample publications with cover images and PDF previews', () => {
    expect(component.samplePublications.length).toBe(6);
    expect(
      component.samplePublications.every(
        (publication) =>
          publication.isActive &&
          publication.coverImageUrl.startsWith('assets/') &&
          publication.pdfPath?.startsWith('assets/publications/'),
      ),
    ).toBeTrue();
  });
});
