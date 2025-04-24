import { TestBed } from '@angular/core/testing'
import { NgxNotificationsService } from './notification.service'

describe('SnackService', () => {
  let service: NgxNotificationsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NgxNotificationsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
