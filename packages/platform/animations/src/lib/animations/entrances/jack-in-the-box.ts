import { state, animate, style, transition, keyframes, AnimationMetadata, animation } from '@angular/animations';
import { entranceInit } from './entrance.init';

export const jackInTheBox = animation([
    animate('{{timing}} {{delay}} ease-in',
        keyframes([
            entranceInit,
            style({ transform: 'scale(0.1) rotate(30deg)', transformOrigin: 'center bottom', opacity: 0, offset: 0.01 }),
            style({ transform: 'rotate(-10deg)', opacity: 0.7, offset: 0.5 }),
            style({ transform: 'rotate(3deg)', offset: 0.7 }),
            style({ transform: '*', opacity: '*', offset: 1 })
        ])
    )
])