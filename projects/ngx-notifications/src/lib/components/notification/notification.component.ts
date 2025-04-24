import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { PositionType } from '../../models/position.type';
import { Subject, takeUntil } from 'rxjs';
import { NotificationsService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';
import { CommonModule } from '@angular/common';
import { INotificationsOptions } from '../../models/notifications-options';
import { NGX_NOTIFICATIONS_OPTIONS_TOKEN } from '../../token/ngx-notifications-options-token';
import { SaveHtmlPipe } from '../../pipes/save-html.pipe';
import { fadeInRight, fadeOutRight } from '../../animations/fade'

@Component({
  selector: 'notification',
  imports: [
    CommonModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.sass',
  providers: [
    SaveHtmlPipe
  ],
  animations: [fadeInRight, fadeOutRight]
})
export class NotificationComponent {
  position: PositionType

  @Output() public onAdd: EventEmitter<any> = new EventEmitter<any>()
  @Output() public onRemove: EventEmitter<any> = new EventEmitter<any>()
  @Output() public onClear: EventEmitter<boolean> = new EventEmitter<boolean>()

  notifications: Array<Notification> = []
  private _notifications_options: INotificationsOptions
  // private default_values: Partial<Notification>

  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private _notificationsService: NotificationsService, @Inject(NGX_NOTIFICATIONS_OPTIONS_TOKEN) public options: INotificationsOptions) {

    this._notifications_options = options

    this.position = this._notifications_options.position
    this._notificationsService.get()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((notification: any) => {
      if (!notification) return

      switch (notification.action) {
        case 'add':
          this.add(notification.data)
          break
        case 'remove':
          this.remove(notification.id)
          break
        case 'clear':
          this.clear()
          break
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  add(notification: any) {
    notification = Object.assign({}, this._notifications_options, notification)

    let timeout
    const id = this.uuid()

    if (this._notifications_options.max && this.notifications.length === this._notifications_options.max ) {
      this.remove(this.notifications[0].id)
    }

    if (notification.autoClose && notification.timeout) {
      timeout = setTimeout(() => {
        this.remove(id)
      }, notification.timeout || this._notifications_options.timeout)
    }

    notification = Object.assign({ id: id, timeoutObj: timeout }, notification)

    if (notification.onAdd) {
      notification.onAdd(notification)
    }

    if (this.onAdd) {
      this.onAdd.emit(notification)
    }

    this.notifications.push(notification)
  }

  remove(id: string) {
    const notification = this.notifications.find(obj => obj.id === id)

    if (notification) {
      if (notification.onRemove) {
        notification.onRemove(notification)
      }

      if (this.onRemove) {
        this.onRemove.emit(notification)
      }

      if (notification.timeoutObj) {
        clearTimeout(notification.timeoutObj)
      }
    }

    this.notifications = this.notifications.filter(obj => obj.id !== id)
  }

  clear() {
    if (this.notifications.length === 0) return

    this.notifications = []

    if (this.onClear) {
      this.onClear.emit(true)
    }
  }

  private uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
}
