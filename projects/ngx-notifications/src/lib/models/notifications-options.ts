import { NotificationType } from "./notification.type"
import { PositionType } from "./position.type"

export interface INotificationsOptions {
    autoclose: true
    header: string
    max: number
    message: string
    position: PositionType
    timeout: number
    type: NotificationType
}