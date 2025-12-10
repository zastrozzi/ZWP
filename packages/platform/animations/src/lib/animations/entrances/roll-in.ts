import { state, animate, style, transition, AnimationMetadata, animation, keyframes } from '@angular/animations';
import { entranceInit } from './entrance.init';

export const rollInRight = animation([
    animate('{{timing}} {{delay}} cubic-bezier(.8,0,.35,1.2)',
        keyframes([
            entranceInit,
            style({ transform: 'translateX(100%) rotate3d(0, 0, 1, 120deg)', opacity: 0, offset: 0.01 }),
            style({ transform: '*', opacity: '*', offset: 1 })
        ])
    )
])

export const rollInLeft = animation([
    animate('{{timing}} {{delay}} cubic-bezier(.8,0,.35,1.2)',
        keyframes([
            entranceInit,
            // style({ transform: 'translateX(-100%)', opacity: 0, offset: 0.01 }),
            // style({ transform: 'translateX(20px)', opacity: 1, offset: 0.3 }),
            style({ transform: 'translateX(-100%) rotate3d(0, 0, 1, -120deg)', opacity: 0, offset: 0.01 }),
            style({ transform: '*', opacity: '*', offset: 1 })
        ])
    )
])