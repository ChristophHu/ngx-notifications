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
### With default toggle
```html
<log-mode></log-mode>
```

### With custom toggle
```html
<log-mode>
  <input type="checkbox" name="log" id="log" (change)="toggleLog()" [checked]="isLogActivated()" class="cursor-pointer">
</log-mode>
```

```typescript
import { LogDecorator, LogModeComponent, LogService } from '@christophhu/ngx-log-mode'

@Component({
  ...
  imports: [
    LogModeComponent
  ],
  providers: [
    LogService
  ]
})
export class TestComponent {
  private _logService: LogService
  
  constructor(@Inject(LogService) _logService: LogService) {
    this._logService = _logService
  }

  // Log-Decorator to log the function call and the result with timestamp
  @LogDecorator({ logType: 'info', input: false, output: false, timestamp: true })

  toggleLog() {
    this._logService.toggleLogActivate()
  }
  isLogActivated(): boolean {
    return this._logService.isLogActivated()
  }

  logThis(param: string): void {
    LogService.log('TemplateComponent', 'logThis()', ' param: ' + param)
  }
  logThis() {
    LogService.debug('TemplateComponent', 'logDebug()')
    LogService.info('TemplateComponent', 'logInfo()')
    LogService.warn('TemplateComponent', 'logWarn()')
    LogService.error('TemplateComponent', 'logError()')
    LogService.fatal('TemplateComponent', 'logFatal()')
  }
}
```