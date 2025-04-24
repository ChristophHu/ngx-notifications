import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NotificationComponent, NotificationsService } from '../../../../ngx-notifications/src/public-api';

@Component({
  selector: 'app-template',
  imports: [
    CommonModule,
    NotificationComponent
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.sass',
  providers: [
    NotificationsService
  ]
})
export class TemplateComponent {
  private _notificationsService: NotificationsService

  constructor(@Inject(NotificationsService) _notificationsService: NotificationsService) {
    this._notificationsService = _notificationsService
  }

  error() {
    this._notificationsService.open({ type: 'error', header: 'Fehler', message: 'Es ist ein Fehler aufgetreten', autoClose: true })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }

  request() {
    this._notificationsService.open({ type: 'request', header: 'Event beendet', message: 'Möchten Sie einen neuen Event vorbereiten (ja) oder den angezeigten Event ansehen (nein)? Dann haben Sie die Möglichkeit hier. Hier soll nun auch getestet werden ob die Notification frei skaliert.', autoClose: false })?.subscribe((data: any) => { 
      if (data == true) console.log('yes')
    })
  }

  success() {
    this._notificationsService.open({ type: 'success', header: 'Erfolg', message: 'Erfolgreich abgeschlossen', autoClose: false })?.subscribe((data: any) => { 
      // if (data == true) alert('yes')
    })
  }

  warning() {
    this._notificationsService.open({ type: 'warning', header: 'Achtung', message: 'Es muss folgendes beachtet werden:', autoClose: false })?.subscribe((data: any) => { 
      if (data == true) console.log('yes')
    })
  }
}
