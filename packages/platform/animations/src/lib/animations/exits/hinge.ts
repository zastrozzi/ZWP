import { state, animate, style, transition, keyframes, animation } from '@angular/animations';
import { exitFinish, exitStart } from './exit.states';

export const hingeOutLeft = animation([
    animate('{{timing}} {{delay}} ease-in-out',
        keyframes([
            exitStart,
            style({ transformOrigin: 'top left', transform: 'rotate3d(0, 0, 1, 0)', offset: 0.01 }),
            style({ transform: 'rotate3d(0, 0, 1, 80deg)', offset: 0.2 }),
            style({ transform: 'rotate3d(0, 0, 1, 60deg)', offset: 0.4 }),
            style({ transform: 'rotate3d(0, 0, 1, 80deg)', offset: 0.6 }),
            style({ transform: 'rotate3d(0, 0, 1, 60deg)', offset: 0.8 }),
            style({ transform: 'translateY(100vh)', offset: 0.99 }),
            exitFinish
        ])
    )
])

export const hingeOutRight = animation([
    animate('{{timing}} {{delay}} ease-in-out',
        keyframes([
            exitStart,
            style({ transformOrigin: 'top right', transform: 'rotate3d(0, 0, 1, 0)', offset: 0.01 }),
            style({ transform: 'rotate3d(0, 0, 1, -80deg)', offset: 0.2 }),
            style({ transform: 'rotate3d(0, 0, 1, -60deg)', offset: 0.4 }),
            style({ transform: 'rotate3d(0, 0, 1, -80deg)', offset: 0.6 }),
            style({ transform: 'rotate3d(0, 0, 1, -60deg)', offset: 0.8 }),
            style({ transform: 'translateY(100vh)', offset: 0.99 }),
            exitFinish
        ])
    )
])

// export const _hinge = [
//     state('hinge', style({ opacity: 0 }) ),

//     transition('* => hinge', [
//         style({ transformOrigin: 'top left' }),
//         animate('{{timing}} {{delay}} ease-in-out', 
//             keyframes([
//                 style({ transform: 'rotate3d(0, 0, 1, 0', offset: 0 }),
//                 style({ transform: 'rotate3d(0, 0, 1, 80deg)', offset: 0.2 }),
//                 style({ transform: 'rotate3d(0, 0, 1, 60deg)', offset: 0.4 }),
//                 style({ transform: 'rotate3d(0, 0, 1, 80deg)', offset: 0.6 }),
//                 style({ transform: 'rotate3d(0, 0, 1, 60deg)', offset: 0.8 }),
//                 style({ transform: 'translateY(700px)', offset: 1 })
//             ])
//         )
//     ], { params: { timing: '2s', delay: '' }})
// ]