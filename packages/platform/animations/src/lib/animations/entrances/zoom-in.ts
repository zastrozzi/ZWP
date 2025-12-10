import { state, animate, style, transition, keyframes, AnimationMetadata, animation } from '@angular/animations';
import { entranceInit } from './entrance.init';

export const zoomIn = animation([
    animate('{{timing}} {{delay}} ease',
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'scale(0.3)', offset: 0.01 }),
            style({ opacity: '*', transform: 'scale(0.65)', offset: 0.6 }),
            style({ opacity: '*', transform: '*', offset: 1 })
        ])
    )
])

export const zoomInTop = animation([
    animate('{{timing}} {{delay}} ease',
        keyframes([
            entranceInit,
            style({ opacity: 0, transformOrigin: 'center top', transform: 'scale(0.1) translateY(-100vh)', offset: 0.01 }),
            style({ opacity: '*', transform: 'scale(0.475) translateY(60px)', offset: 0.6 }),
            style({ opacity: '*', transform: '*', offset: 1 })
        ])
    )
])

export const zoomInRight = animation([
    animate('{{timing}} {{delay}} ease',
        keyframes([
            entranceInit,
            style({ opacity: 0, transformOrigin: 'right center', transform: 'scale(0.1) translateX(100vw)', offset: 0.01 }),
            style({ opacity: '*', transform: 'scale(0.475) translateX(60px)', offset: 0.6 }),
            style({ opacity: '*', transform: '*', offset: 1 })
        ])
    )
])

export const zoomInBottom = animation([
    animate('{{timing}} {{delay}} ease',
        keyframes([
            entranceInit,
            style({ opacity: 0, transformOrigin: 'center bottom', transform: 'scale(0.1) translateY(100vh)', offset: 0.01 }),
            style({ opacity: '*', transform: 'scale(0.475) translateY(-60px)', offset: 0.6 }),
            style({ opacity: '*', transform: '*', offset: 1 })
        ])
    )
])

export const zoomInLeft = animation([
    animate('{{timing}} {{delay}} ease',
        keyframes([
            entranceInit,
            style({ opacity: 0, transformOrigin: 'left center', transform: 'scale(0.1) translateX(-100vw)', offset: 0.01 }),
            style({ opacity: '*', transform: 'scale(0.475) translateX(60px)', offset: 0.6 }),
            style({ opacity: '*', transform: '*', offset: 1 })
        ])
    )
])
