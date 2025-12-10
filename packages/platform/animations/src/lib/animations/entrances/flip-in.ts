import { state, animate, style, transition, keyframes, AnimationMetadata, animation } from '@angular/animations';
import { entranceInit } from './entrance.init';

export const flipInX = animation([
    animate('{{timing}} {{delay}} ease-in',
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', offset: 0.01 }),
            style({ opacity: '*', transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', offset: 0.4 }),
            style({ transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)', offset: 0.6 }),
            style({ transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)', offset: 0.8 }),
            style({ transform: 'perspective(400px) rotate3d(1, 0, 0, 0)', offset: 1 })
        ])
    )
])

export const flipInY = animation([
    animate('{{timing}} {{delay}} ease-in',
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)', offset: 0.01 }),
            style({ opacity: '*', transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)', offset: 0.4 }),
            style({ transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)', offset: 0.6 }),
            style({ transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)', offset: 0.8 }),
            style({ transform: 'perspective(400px) rotate3d(0, 1, 0, 0)', offset: 1 })
        ])
    )
])
