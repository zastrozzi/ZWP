import { animate, style, keyframes, animation } from '@angular/animations';

export const pulse = animation([
    style('*'),
    animate('{{timing}} {{delay}} ease-in-out', 
        keyframes([
            style({ transform: 'scale(1)' }),
            style({ transform: 'scale(1.05)' }),
            style({ transform: 'scale(1)' })
        ])
    )
])