import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
// import { NotificationComponent, NotificationsService, NotificationType } from '../../../../ngx-notifications/src/public-api';
import { NotificationComponent, NotificationType, NotificationsService } from '@christophhu/ngx-notifications';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-template',
  imports: [
    CommonModule,
    JsonPipe,
    NotificationComponent,
    ReactiveFormsModule
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.sass',
  providers: [
    NotificationsService
  ]
})
export class TemplateComponent {

  notificationForm: FormGroup
  types: NotificationType[] = ['success', 'error', 'warning', 'info', 'request']

  constructor(private _notificationsService: NotificationsService) {
    this.notificationForm = new FormGroup({
      type: new FormControl(''),
      header: new FormControl(''),
      message: new FormControl(''),
      autoClose: new FormControl(false)
    })
  }

  createNotification() {
    this._notificationsService.open(this.notificationForm.value)?.subscribe((data: any) => { 
      if (data == true) console.log('result: ', data)
    })
  }

  get() {
    return this._notificationsService.get()
  }

  error() {
    this._notificationsService.open({ type: 'error', header: 'Fehler', message: 'Es ist ein Fehler aufgetreten', autoClose: true })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }

  request() {
    this._notificationsService.open({ type: 'request', header: 'Event beendet', message: 'Möchten Sie einen neuen Event vorbereiten (ja) oder den angezeigten Event ansehen (nein)? Dann haben Sie die Möglichkeit hier. Hier soll nun auch getestet werden ob die Notification frei skaliert.', autoClose: false })?.subscribe((data: any) => { 
      if (data) console.log(data)
    })
  }

  success() {
    this._notificationsService.open({ type: 'success', header: 'Erfolg', message: 'Erfolgreich abgeschlossen', autoClose: false })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }

  warning() {
    this._notificationsService.open({ type: 'warning', header: 'Achtung', message: 'Es muss folgendes beachtet werden:', autoClose: false })?.subscribe((data: any) => { 
      if (data) console.log(data)
    })
  }
}
