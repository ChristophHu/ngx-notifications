import { TestBed } from '@angular/core/testing';

import { NgxNotificationsService } from './ngx-notifications.service';

describe('NgxNotificationsService', () => {
  let service: NgxNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
