import { InjectionToken } from '@angular/core'
import { INotificationsOptions } from '../models/notifications-options'

/**
 * Provide an Injection Token for global settings.
 */
export const NGX_NOTIFICATIONS_OPTIONS_TOKEN = new InjectionToken<INotificationsOptions>('ngx-notifications-options-token', {
    factory: () => ({ type: 'info', position: 'top-right', header: '', message: '', autoclose: true, timeout: 15000, max: 5 })
})