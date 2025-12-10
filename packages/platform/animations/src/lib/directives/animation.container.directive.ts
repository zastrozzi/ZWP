import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from "@angular/core";
import { coerceBoolean, coerceNumber } from "@zwp/platform.common";
import { ZWPAnimationService } from "../services/zwp.animation.service";

@Directive({
    selector: '[zwpAnimationContainer]'
    // providers: [
    //     { provide: ZWPAnimationService, useExisting: forwardRef(() => ZWPAnimationContainerDirective)}
    // ]
})
export class ZWPAnimationContainerDirective implements OnChanges, OnDestroy {
    constructor(
        private el: ElementRef<HTMLElement>,
        private animationService: ZWPAnimationService,
    ) {}

    @Input() zwpAnimationContainer = ''
    @Input() animationUseElement = false
    @Input() animationOffsetTop?: number
    @Input() animationOffsetRight?: number
    @Input() animationOffsetBottom?: number
    @Input() animationOffsetLeft?: number

    ngOnChanges(changes: SimpleChanges) {
        if (!changes['animationUseElement'] && !changes['animationOffsetTop'] && !changes['animationOffsetRight'] && !changes['animationOffsetBottom'] && !changes['animationOffsetLeft']) { return }
        // console.log('animation container changed', changes)
        this.animationService.setup(this.zwpAnimationContainer, {
            rootElement: coerceBoolean(this.animationUseElement) ? this.el.nativeElement : undefined,
            edges: {
                top: coerceNumber(this.animationOffsetTop, 0),
                right: coerceNumber(this.animationOffsetRight, 0),
                bottom: coerceNumber(this.animationOffsetBottom, 0),
                left: coerceNumber(this.animationOffsetLeft, 0)
            }
        })
    }

    ngOnDestroy(): void {
        this.animationService.removeOptions(this.zwpAnimationContainer)
        this.animationService.removeViewRect(this.zwpAnimationContainer)
    }
}