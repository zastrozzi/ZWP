import { animate, style, keyframes, animation } from '@angular/animations';

export const beat = animation([
    animate('{{timing}} {{delay}} cubic-bezier(.8, -0.6, 0.2, 1.5)', 
        keyframes([
            style('*'),
            style({ transform: 'scale(0.8)' }),
            style({ transform: 'scale(1.5)' }),
            style({ transform: '*' })
        ])
    )
])