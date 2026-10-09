import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URLS } from '../../config/api-urls';
import { AdminContentService, NotificationItem } from './admin-content.service';

describe('AdminContentService notification rich text', () => {
  let service: AdminContentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminContentService],
    });
    service = TestBed.inject(AdminContentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('sends and preserves formatted descriptions when saving a notification', () => {
    const description = '<p><strong>Important</strong> <em>update</em></p>';
    const notification: NotificationItem = {
      title: 'Test update',
      description,
      link: '',
      isActive: true,
      type: 'announcement',
    };
    let saved: NotificationItem | undefined;

    service.saveNotification(notification).subscribe((result) => {
      saved = result;
    });

    const request = httpTestingController.expectOne(API_URLS.notifications.insert);
    expect(request.request.method).toBe('POST');
    expect(request.request.body.description).toBe(description);
    request.flush({ id: 23 });

    expect(saved?.description).toBe(description);
  });

  it('preserves formatted descriptions when loading notifications for the website', () => {
    const description = '<p><strong>Important</strong> <em>update</em></p>';
    let notifications: NotificationItem[] = [];

    service.getNotifications().subscribe((result) => {
      notifications = result;
    });

    const request = httpTestingController.expectOne(API_URLS.notifications.getAll);
    request.flush([
      {
        id: 23,
        title: 'Test update',
        description,
        link: '',
        isActive: true,
      },
    ]);

    expect(notifications[0].description).toBe(description);
  });
});
