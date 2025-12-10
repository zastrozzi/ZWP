import { state, animate, style, transition, animation, keyframes } from '@angular/animations';
import { exitFinish, exitStart } from './exit.states';

// export const rollOut = [
//     state('rollOut', style({ opacity: 0 }) ),
    
//     transition('* => rollOut', [
//         style({ transform: 'translateX(0)', opacity: 1 }),
//         animate("{{timing}} {{delay}} cubic-bezier(.8, -0.6, 0.2, 1.5)", 
//         style({ transform: 'translateX(100%) rotate3d(0, 0, 1, 120deg)', opacity: 0 }))
//     ], { params: { timing: '1s', delay: '' }} )
// ]

export const rollOutRight = animation([
    animate('{{timing}} {{delay}} cubic-bezier(.8,0,.35,1.2)',
        keyframes([
            exitStart,
            style({ transform: 'translateX(100%) rotate3d(0, 0, 1, 120deg)', opacity: 0, offset: 0.99 }),
            exitFinish
        ])
    )
])

export const rollOutLeft = animation([
    animate('{{timing}} {{delay}} cubic-bezier(.8,0,.35,1.2)',
        keyframes([
            exitStart,
            // style({ transform: 'translateX(-100%)', opacity: 0, offset: 0.01 }),
            // style({ transform: 'translateX(20px)', opacity: 1, offset: 0.3 }),
            style({ transform: 'translateX(-100%) rotate3d(0, 0, 1, -120deg)', opacity: 0, offset: 0.99 }),
            exitFinish
        ])
    )
])