import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core'
import { NGX_NOTIFICATIONS_OPTIONS_TOKEN } from './token/ngx-notifications-options-token'
import { NGX_NOTIFICATIONS_INITIALIZER_PROVIDER } from './ngx-notifications-initializer.provider'
import { INotificationsOptions } from './models/notifications-options'

export function provideNotifications(options: INotificationsOptions): EnvironmentProviders {
    return makeEnvironmentProviders([
        {
            provide: NGX_NOTIFICATIONS_OPTIONS_TOKEN,
            useValue: options
        },
        NGX_NOTIFICATIONS_INITIALIZER_PROVIDER
    ])
}