import { NotificationType } from "./notification.type";

export interface Notification {
    id: string,
    type: NotificationType,
    header: string,
    message: string,
    autoClose: boolean,
    timeout?: number,
    response?: any,
    onAdd?: Function,
    onRemove?: Function,
    timeoutObj?: any
}