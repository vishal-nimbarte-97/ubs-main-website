import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should persist the admin token in sessionStorage after login', () => {
    service.login('admin@example.com', 'password').subscribe((response) => {
      expect(response.isSuccess).toBeTrue();
      expect(response.token).toBe('abc123');
      expect(sessionStorage.getItem('ubs-admin-token')).toBe('abc123');
    });

    const req = httpMock.expectOne('http://ubsapi.xplorelogic.in/api/Auth/Login');
    expect(req.request.method).toBe('POST');
    req.flush({ isSuccess: true, message: 'Login successful', token: 'abc123' });
  });
});
