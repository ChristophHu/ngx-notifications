import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private _notificationsService = new Subject<any>()
  
  get() {
    return this._notificationsService.asObservable()
  }

  open(notification: Partial<Notification>): Observable<any> | void {
    return new Observable(observer => {
      const note = Object.assign({}, notification, { response: (response: any) => {
        observer.next(response)
        observer.complete()
      }})
      this.add(note)
    })
  }

  add(data: any) {
    this._notificationsService.next({ action: 'add', data: data })
  }

  remove(id: string) {
    this._notificationsService.next({ action: 'remove', id })
  }

  clear() {
    this._notificationsService.next({ action: 'clear' })
  }
}
