import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TemplateComponent } from './template/template.component';
import { provideHttpClient } from '@angular/common/http';
import { provideGithubPagesDemo } from '@christophhu/ngx-github-pages-demo';
import { provideNotifications } from '../../../ngx-notifications/src/public-api';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideGithubPagesDemo({ username: 'christophhu', repository: 'ngx-notifications', version: '19.2.0', token: null, template: TemplateComponent }),
    provideNotifications({ type: 'info', position: 'top-center', header: '', message: '', autoclose: true, timeout: 15000, max: 5 }),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
