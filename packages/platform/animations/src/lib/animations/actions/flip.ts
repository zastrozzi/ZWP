import { animate, style, keyframes, animation } from '@angular/animations';

export const flipXVisible = animation([
    style({ backfaceVisibility: 'visible' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, -360deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(1, 0, 0, -190deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(1, 0, 0, -170deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(1, 0, 0, 0deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, 0deg)', offset: 1 })
        ])
    )
])

export const flipXBigVisible = animation([
    style({ backfaceVisibility: 'visible' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, -360deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(1, 0, 0, -190deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(1, 0, 0, -170deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(1, 0, 0, 0deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, 0deg)', offset: 1 })
        ])
    )
])

export const flipYVisible = animation([
    style({ backfaceVisibility: 'visible' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(0, 1, 0, -190deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(0, 1, 0, -170deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)', offset: 1 })
        ])
    )
])

export const flipYBigVisible = animation([
    style({ backfaceVisibility: 'visible' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(0, 1, 0, -190deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(0, 1, 0, -170deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)', offset: 1 })
        ])
    )
])

export const flipXToHidden = animation([
    style({ backfaceVisibility: 'hidden' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, -360deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(1, 0, 0, -190deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(1, 0, 0, -170deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(1, 0, 0, 0deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, 0deg)', offset: 1 })
        ])
    )
])

export const flipXBigToHidden = animation([
    style({ backfaceVisibility: 'hidden' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, -360deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(1, 0, 0, -190deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(1, 0, 0, -170deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(1, 0, 0, 0deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, 0deg)', offset: 1 })
        ])
    )
])

export const flipYToHidden = animation([
    style({ backfaceVisibility: 'hidden' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(0, 1, 0, -190deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(0, 1, 0, -170deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)', offset: 1 })
        ])
    )
])

export const flipYBigToHidden = animation([
    style({ backfaceVisibility: 'hidden' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(0, 1, 0, -190deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(0, 1, 0, -170deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)', offset: 1 })
        ])
    )
])

export const flipXFromHidden = animation([
    style({ backfaceVisibility: 'hidden' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, -180deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(1, 0, 0, -10deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(1, 0, 0, 10deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(1, 0, 0, 180deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, 180deg)', offset: 1 })
        ])
    )
])

export const flipXBigFromHidden = animation([
    style({ backfaceVisibility: 'hidden' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, -180deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(1, 0, 0, -10deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(1, 0, 0, 10deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(1, 0, 0, 180deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(1, 0, 0, 180deg)', offset: 1 })
        ])
    )
])

export const flipYFromHidden = animation([
    style({ backfaceVisibility: 'hidden' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -180deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(0, 1, 0, -10deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 10vw) rotate3d(0, 1, 0, 10deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 180deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 180deg)', offset: 1 })
        ])
    )
])

export const flipYBigFromHidden = animation([
    style({ backfaceVisibility: 'hidden' }),
    animate('{{timing}} {{delay}} linear', 
        keyframes([
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -180deg)', offset: 0 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(0, 1, 0, -10deg)', offset: 0.4 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 30vw) rotate3d(0, 1, 0, 10deg)', offset: 0.5 }),
            style({ transform: 'perspective(100vw) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 180deg)', offset: 0.8 }),
            style({ transform: 'perspective(100vw) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 180deg)', offset: 1 })
        ])
    )
])