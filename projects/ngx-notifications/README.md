# Ngx-Notifications

## Frameworks and Languages
<p align="left">
  <img alt="Static Badge" src="https://img.shields.io/badge/19.2.0-000000?style=for-the-badge&logo=angular&logoColor=white&label=Angular&labelColor=000000"><br>
  <img alt="Static Badge" src="https://img.shields.io/badge/4.1.4-000000?style=for-the-badge&logo=tailwindcss&logoColor=white&label=Tailwind&labelColor=06B6D4&color=000000"><br>
  <img alt="Static Badge" src="https://img.shields.io/badge/5.7.2-000000?style=for-the-badge&logo=typescript&logoColor=white&label=Typescript&labelColor=007ACC&color=000000">
</p>

## Demo
<p align="center">
  <a href="https://christophhu.github.io/ngx-notifications"><img src="https://github.com/ChristophHu/ChristophHu/blob/main/assets/img/ngx-notifications.png" width="400" alt="image" /></a>
</p>

## Description
This Repository is a demo application for the ngx-notifications library. The library adds notifications to your Angular application. It provides a simple API to create notifications with different types (info, success, warning, error) and positions (top-right, top-left, bottom-right, bottom-left). The library is easy to use and can be installed via [npm](https://www.npmjs.com/package/@christophhu/ngx-notifications).

## Installation
To run this project, you need to have Node.js installed on your machine. Clone the repository and run the following commands:

```bash
npm i @christophhu/ngx-notifications
```

## Use
```html
<notification></notification>
```

```typescript
import { NotificationComponent, NotificationType, NotificationsService } from '@christophhu/ngx-notifications';

@Component({
  ...
  imports: [
    NotificationComponent
  ],
  providers: [
    LogService
  ]
})
export class TestComponent {
  constructor(private _notificationsService: NotificationsService) {}

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
```

## Configuration
```typescript
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideNotifications } from '@christophhu/ngx-notifications'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideNotifications({ type: 'info', position: 'top-center', header: '', message: '', autoclose: true, timeout: 15000, max: 5 }),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
```