import { state, animate, style, transition, animation, keyframes } from '@angular/animations';
import { exitFinish, exitStart } from './exit.states';

export const fadeOut = animation([
    animate('{{timing}} {{delay}} ease-out',
        keyframes([
            exitStart,
            style({ opacity: 0, offset: 0.99 }),
            exitFinish
        ])
    )
])

export const fadeOutTop = animation([
    animate('{{timing}} {{delay}} ease-out',
        keyframes([
            exitStart,
            style({ opacity: 0, transform: 'translateY(-20px)', offset: 0.99 }),
            exitFinish
        ])
    )
])

export const fadeOutRight = animation([
    animate('{{timing}} {{delay}} ease-out',
        keyframes([
            exitStart,
            style({ opacity: 0, transform: 'translateX(20px)', offset: 0.99 }),
            exitFinish
        ])
    )
])

export const fadeOutBottom = animation([
    animate('{{timing}} {{delay}} ease-out',
        keyframes([
            exitStart,
            style({ opacity: 0, transform: 'translateY(20px)', offset: 0.99 }),
            exitFinish
        ])
    )
])

export const fadeOutLeft = animation([
    animate('{{timing}} {{delay}} ease-out',
        keyframes([
            exitStart,
            style({ opacity: 0, transform: 'translateX(-20px)', offset: 0.99 }),
            exitFinish
        ])
    )
])



// export const _fadeOut = [
//     state('fadeOut', style({ opacity: 0 }) ),
//     state('fadeOutDown', style({ opacity: 0 }) ),
//     state('fadeOutLeft', style({ opacity: 0 }) ),
//     state('fadeOutUp', style({ opacity: 0 }) ),
//     state('fadeOutRight', style({ opacity: 0 }) ),


//     transition('* => fadeOut', [
//         animate('{{timing}} {{delay}} ease-out', style({ opacity: 0 }))
//     ], { params: { timing: '1s', delay: '' }} ),
    
//     transition('* => fadeOutDown', [
//         animate('{{timing}} {{delay}} ease-out', style({ opacity: 0, transform: 'translateY(20px)' }))
//     ], { params: { timing: '1s', delay: '' }} ),

//     transition('* => fadeOutLeft', [
//         animate('{{timing}} {{delay}} ease-out', style({ opacity: 0, transform: 'translateX(-20px)' }))
//     ], { params: { timing: '1s', delay: '' }} ),

//     transition('* => fadeOutUp', [
//         animate('{{timing}} {{delay}} ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
//     ], { params: { timing: '1s', delay: '' }} ),

//     transition('* => fadeOutRight', [
//         animate('{{timing}} {{delay}} ease-out', style({ opacity: 0, transform: 'translateX(20px)' }))
//     ], { params: { timing: '1s', delay: '' }} )
// ]