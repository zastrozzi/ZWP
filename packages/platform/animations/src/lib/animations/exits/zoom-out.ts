import { state, animate, style, transition, keyframes, animation } from '@angular/animations';
import { exitFinish, exitStart } from './exit.states';

export const zoomOut = animation([
    animate('{{timing}} {{delay}} ease-out',
        keyframes([
            exitStart,
            style({ opacity: 0, transform: 'scale(0.3)', offset: 0.5 }),
            style({ opacity: 0, transform: 'scale(0.3)', offset: 0.99 }),
            exitFinish
        ])
    )
])

export const zoomOutTop = animation([
    animate('{{timing}} {{delay}} ease',
        keyframes([
            exitStart,
            style({ opacity: '*', transformOrigin: 'center top', offset: 0.01 }),
            style({ opacity: '*', transform: 'scale(0.475) translateY(60px)', offset: 0.4 }),
            style({ opacity: 0, transform: 'scale(0.1) translateY(-100vh)', offset: 0.99 }),
            exitFinish
        ])
    )
])

export const zoomOutRight = animation([
    animate('{{timing}} {{delay}} ease',
        keyframes([
            exitStart,
            style({ opacity: '*', transformOrigin: 'right center', offset: 0.01 }),
            style({ opacity: '*', transform: 'scale(0.475) translateX(60px)', offset: 0.4 }),
            style({ opacity: 0, transform: 'scale(0.1) translateX(100vw)', offset: 0.99 }),
            exitFinish
        ])
    )
])

export const zoomOutBottom = animation([
    animate('{{timing}} {{delay}} ease',
        keyframes([
            exitStart,
            style({ opacity: '*', transformOrigin: 'center bottom', offset: 0.01 }),
            style({ opacity: '*', transform: 'scale(0.475) translateY(-60px)', offset: 0.4 }),
            style({ opacity: 0, transform: 'scale(0.1) translateY(100vh)', offset: 0.99 }),
            exitFinish
        ])
    )
])

export const zoomOutLeft = animation([
    animate('{{timing}} {{delay}} ease',
        keyframes([
            exitStart,
            style({ opacity: '*', transformOrigin: 'left center', offset: 0.01 }),
            style({ opacity: '*', transform: 'scale(0.475) translateX(-60px)', offset: 0.4 }),
            style({ opacity: 0, transform: 'scale(0.1) translateX(-100vw)', offset: 0.99 }),
            exitFinish
        ])
    )
])


// export const _zoomOut = [
//     state('zoomOut', style({ opacity: 0 })),
//     state('zoomOutDown', style({ opacity: 0 })),
//     state('zoomOutLeft', style({ opacity: 0 })),
//     state('zoomOutUp', style({ opacity: 0 })),
//     state('zoomOutRight', style({ opacity: 0 })),

//     transition('* => zoomOut', 
//         animate('{{timing}} {{delay}} ease-out', 
//             keyframes([
//                 style({ opacity: 1, transform: 'scale(1)' }),
//                 style({ opacity: 0, transform: 'scale(0.3)' }),
//                 style({ opacity: 0, transform: 'scale(0.3)' })
//             ])
//         ), { params: { timing: '1s', delay: '' }}
//     ),

//     transition('* => zoomOutDown', 
//         animate('{{timing}} {{delay}} ease-in', 
//             keyframes([
//                 style({ opacity: 0, transform: 'scale(0.475) translateY(-60px)', offset: 0 }),
//                 style({ opacity: 1, transform: 'scale(0.1) translateY(2000px)', transformOrigin: 'center bottom', offset: 0.6 }),
//                 style({ opacity: 1, transform: 'scale(1) translateY(0)', offset: 1 })
//             ])
//         ), { params: { timing: '1s', delay: '' }}
//     ),

//     transition('* => zoomOutLeft', 
//         animate('{{timing}} {{delay}} ease-in', 
//             keyframes([
//                 style({ opacity: 0, transform: 'scale(0.475) translateX(42px)', offset: 0 }),
//                 style({ opacity: 1, transform: 'scale(0.1) translateX(-2000px)', transformOrigin: 'center bottom', offset: 0.6 }),
//                 style({ opacity: 1, transform: 'scale(1) translateX(0)', offset: 1 })
//             ])
//         ), { params: { timing: '1s', delay: '' }}
//     ),

//     transition('* => zoomOutUp', 
//         animate('{{timing}} {{delay}} ease-in', 
//             keyframes([
//                 style({ opacity: 0, transform: 'scale(0.475) translateY(60px)', offset: 0 }),
//                 style({ opacity: 1, transform: 'scale(0.1) translateY(-2000px)', transformOrigin: 'center bottom', offset: 0.6 }),
//                 style({ opacity: 1, transform: 'scale(1) translateY(0)', offset: 1 })
//             ])
//         ), { params: { timing: '1s', delay: '' }}
//     ),

//     transition('* => zoomOutRight', 
//         animate('{{timing}} {{delay}} ease-in', 
//             keyframes([
//                 style({ opacity: 0, transform: 'scale(0.475) translateX(-42px)', offset: 0 }),
//                 style({ opacity: 1, transform: 'scale(0.1) translateX(2000px)', transformOrigin: 'center bottom', offset: 0.6 }),
//                 style({ opacity: 1, transform: 'scale(1) translateX(0)', offset: 1 })
//             ])
//         ), { params: { timing: '1s', delay: '' }}
//     )
// ]