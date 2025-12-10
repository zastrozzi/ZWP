import { state, animate, style, transition, keyframes, AnimationMetadata, animation } from '@angular/animations';
import { entranceInit } from './entrance.init';

export const bounceIn = animation([
    animate('{{timing}} {{delay}} cubic-bezier(0.215, 0.61, 0.355, 1)', 
        keyframes([
            entranceInit,
            style({ transform: 'scale(0.3)', opacity: 0, offset: 0.01 }),
            style({ transform: 'scale(1.1)', offset: 0.2 }),
            style({ transform: 'scale(0.9)', offset: 0.4 }),
            style({ transform: 'scale(1.03)', opacity: '*', offset: 0.6 }),
            style({ transform: 'scale(0.97)', offset: 0.8 }),
            style({ transform: '*', opacity: '*', offset: 1 })
        ])
    )
])

export const bounceInTop = animation([
    animate('{{timing}} {{delay}} cubic-bezier(0.215, 0.61, 0.355, 1)', 
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'translateY(-100%)', offset: 0.01 }),
            style({ opacity: '*', transform: 'translateY(25px)', offset: 0.6 }),
            style({ transform: 'translateY(-10px)', offset: 0.75 }),
            style({ transform: 'translateY(5px)', offset: 0.9 }),
            style({ transform: '*', opacity: '*', offset: 1 })
        ])
    )
])

export const bounceInRight = animation([
    animate('{{timing}} {{delay}} cubic-bezier(0.215, 0.61, 0.355, 1)', 
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'translateX(100%)', offset: 0.01 }),
            style({ opacity: '*', transform: 'translateX(-25px)', offset: 0.6 }),
            style({ transform: 'translateX(10px)', offset: 0.75 }),
            style({ transform: 'translateX(-5px)', offset: 0.9 }),
            style({ transform: '*', opacity: '*', offset: 1 })
        ])
    )
])

export const bounceInBottom = animation([
    animate('{{timing}} {{delay}} cubic-bezier(0.215, 0.61, 0.355, 1)', 
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'translateY(100%)', offset: 0.01 }),
            style({ opacity: '*', transform: 'translateY(-25px)', offset: 0.6 }),
            style({ transform: 'translateY(10px)', offset: 0.75 }),
            style({ transform: 'translateY(-5px)', offset: 0.9 }),
            style({ transform: '*', opacity: '*', offset: 1 })
        ])
    )
])

export const bounceInLeft = animation([
    animate('{{timing}} {{delay}} cubic-bezier(0.215, 0.61, 0.355, 1)', 
        keyframes([
            entranceInit,
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0.01 }),
            style({ opacity: '*', transform: 'translateX(25px)', offset: 0.6 }),
            style({ transform: 'translateX(-10px)', offset: 0.75 }),
            style({ transform: 'translateX(5px)', offset: 0.9 }),
            style({ transform: '*', opacity: '*', offset: 1 })
        ])
    )
])