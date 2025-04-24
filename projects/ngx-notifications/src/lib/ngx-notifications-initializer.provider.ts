import { inject, provideAppInitializer, Provider } from "@angular/core"
import { NGX_NOTIFICATIONS_OPTIONS_TOKEN } from "./token/ngx-notifications-options-token"
import { INotificationsOptions } from "./models/notifications-options"

export const NGX_NOTIFICATIONS_INITIALIZER_PROVIDER: Provider = [
    provideAppInitializer(() => NotificationsInitializer(inject(NGX_NOTIFICATIONS_OPTIONS_TOKEN)))
]

export function NotificationsInitializer(options: INotificationsOptions): Promise<void> {

  // const notificationService = inject(NotificationService)
  // notificationService.setDefault({ type: 'info', position: 'top-right', header: '', message: '', autoclose: true, timeout: 15000, max: 5 })

  console.log('NotificationsInitializer', options)

  return new Promise<void>((resolve) => {
    resolve()
  })
}