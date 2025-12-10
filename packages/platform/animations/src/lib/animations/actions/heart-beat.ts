import { animate, style, keyframes, animation } from '@angular/animations';

export const heartBeat = animation([
    style('*'),
    animate('{{timing}} {{delay}} ease-in-out', 
        keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({ transform: 'scale(1.3)', offset: 0.14 }),
            style({ transform: 'scale(1)', offset: 0.28 }),
            style({ transform: 'scale(1.3)', offset: 0.42 }),
            style({ transform: 'scale(1)', offset: 0.70 })
        ])
    )
])