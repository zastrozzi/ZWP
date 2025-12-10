import { state, animate, style, transition, AnimationMetadata, animation, keyframes } from '@angular/animations';
import { entranceInit } from './entrance.init';

export const _fadeIn: AnimationMetadata[] = [
    state('idle-fadeIn', style({ opacity: 0 }) ),
    transition('* => fadeIn', [
        style({ opacity: 0 }),
        animate('{{timing}} {{delay}} ease-in', style('*'))
    ], { params: { timing: '1s', delay: '' }} )
]

export const fadeIn = animation([
    animate('{{timing}} {{delay}} ease-in',
        keyframes([
            entranceInit,
            style({ opacity: '*', offset: 1 })
        ])
    )
])

export const fadeInTop = animation([
    animate('{{timing}} {{delay}} ease-in',
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'translateY(-20px)', offset: 0.01 }),
            style({ opacity: '*', transform: '*', offset: 1 })
        ])
    )
])

export const fadeInRight = animation([
    animate('{{timing}} {{delay}} ease-in',
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'translateX(20px)', offset: 0.01 }),
            style({ opacity: '*', transform: '*', offset: 1 })
        ])
    )
])

export const fadeInBottom = animation([
    animate('{{timing}} {{delay}} ease-in',
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'translateY(20px)', offset: 0.01 }),
            style({ opacity: '*', transform: '*', offset: 1 })
        ])
    )
])

export const fadeInLeft = animation([
    animate('{{timing}} {{delay}} ease-in',
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'translateX(-20px)', offset: 0.01 }),
            style({ opacity: '*', transform: '*', offset: 1 })
        ])
    )
])