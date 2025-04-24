import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PositionType } from '../../models/position.type';
import { Subject, takeUntil } from 'rxjs';
import { NotificationsService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'notification',
  imports: [
    CommonModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.sass'
})
export class NotificationComponent {
  @Input() position: PositionType = 'top-right'

  @Output() public onAdd: EventEmitter<any> = new EventEmitter<any>()
  @Output() public onRemove: EventEmitter<any> = new EventEmitter<any>()
  @Output() public onClear: EventEmitter<boolean> = new EventEmitter<boolean>()

  notifications: Array<Notification> = []
  private _notificationsConfig: any
  private default_values: Partial<Notification>

  destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(private _notificationsService: NotificationsService) {
    this._notificationsConfig = {
      position: 'top-right',
      type: 'info',
      header: 'Info',
      message: '',
      autoclose: true,
      timeout: 15000,
      max: 5
    }

    this.default_values = { 
      type: this._notificationsConfig.type, 
      header: this._notificationsConfig.header, 
      message: this._notificationsConfig.message, 
      autoClose: this._notificationsConfig.autoclose, 
      timeout: this._notificationsConfig.timeout,
      response: {}
    }

    this.position = this._notificationsConfig.position
    this._notificationsService.get()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe((notification: any) => {
      console.log('notification:', notification)
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
    console.log('Notification.ngOnDestroy')
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  add(notification: any) {
    notification = Object.assign({}, this.default_values, notification)

    let timeout
    const id = this.uuid()

    if (this._notificationsConfig.max && this.notifications.length === this._notificationsConfig.max ) {
      this.remove(this.notifications[0].id)
    }

    if (notification.autoClose && notification.timeout) {
      timeout = setTimeout(() => {
        this.remove(id)
      }, notification.timeout || this._notificationsConfig.timeout)
    }

    notification = Object.assign({ id: id, timeoutObj: timeout }, notification)

    if (notification.onAdd) {
      notification.onAdd(notification)
    }

    if (this.onAdd) {
      this.onAdd.emit(notification)
    }

    this.notifications.push(notification)
    console.log('notifications-add:', this.notifications)
  }

  remove(id: string) {
    console.log('remove:', id)
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
    console.log('notifications-remove:', this.notifications)

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
