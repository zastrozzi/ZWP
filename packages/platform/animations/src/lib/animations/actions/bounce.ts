import { animate, style, keyframes, animation } from '@angular/animations';

export const bounce = animation([
    style({ transformOrigin: 'center bottom' }),
    animate('{{timing}} {{delay}} ease-in-out', 
        keyframes([
            style({ transform: '*', offset: 0 }),
            style({ transform: '*', offset: 0.2 }),
            style({ transform: 'translateY(-30px)', offset: 0.4 }),
            style({ transform: 'translateY(-30px)', offset: 0.43 }),
            style({ transform: 'translateY(0)', offset: 0.53 }),
            style({ transform: 'translateY(-15px)', offset: 0.7 }),
            style({ transform: 'translateY(0)', offset: 0.8 }),
            style({ transform: 'translateY(-4px)', offset: 0.9 }),
            style({ transform: '*', offset: 1 })
        ])
    )
])