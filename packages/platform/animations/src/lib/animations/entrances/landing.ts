import { state, animate, style, transition, AnimationMetadata, animation, keyframes } from '@angular/animations';
import { entranceInit } from './entrance.init';

export const landing = animation([
    animate('{{timing}} {{delay}} ease',
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'scale(1.2)', offset: 0.01 }),
            style({ opacity: '*', transform: '*', offset: 1 })
        ])
    )
])