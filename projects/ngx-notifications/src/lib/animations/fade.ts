import { animate, state, style, transition, trigger } from '@angular/animations'

export const fadeInRight = trigger('fadeInRight', [
    state('void', style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' })),
    state('*', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
    transition('void => false', []),
    transition('void => *', animate('200ms 200ms cubic-bezier(0.0, 0.0, 0.2, 1)'))
])

export const fadeOutRight = trigger('fadeOutRight', [
    state('*', style({ opacity: 1, transform: 'translate3d(0, 0, 0)' })),
    state('void', style({ opacity: 0, transform: 'translate3d(100%, 0, 0)' })),
    transition('false => void', []),
    transition('* => void', animate('200ms 50ms cubic-bezier(0.0, 0.0, 0.2, 1)'))
])