import { state, animate, style, transition, AnimationMetadata, keyframes, animation } from '@angular/animations';
import { entranceInit } from './entrance.init';

export const bumpIn = animation([
    animate("{{timing}} {{delay}} cubic-bezier(.8, -0.6, 0.2, 1.5)", 
        keyframes([
            entranceInit,
            style({ transform: 'scale(0.5)', opacity: 0, offset: 0.01 }),
            style({ transform: '*', opacity: '*', offset: 1 })
        ])
    )
])