import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output, Renderer2 } from "@angular/core";
import { coerceBoolean, coerceNumber } from "@zwp/platform.common";
import { delay, distinctUntilChanged, map, startWith, Subject, Subscription, takeWhile } from "rxjs";
import { ZWPAnimationType } from "../animations";
import { ZWPAnimationSpeed, ZWPDefaultAnimationSpeeds } from "../model/zwp.animation.speed";
import { ZWPAnimationService } from "../services/zwp.animation.service";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[zwpAnimation]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-content></ng-content>`,
    // animations: [ trigger('animate', ZWPAnimations) ]
})
export class ZWPAnimationComponent implements OnInit, OnDestroy {
    @Input() set timing(value: ZWPAnimationSpeed) { this._timing = ZWPDefaultAnimationSpeeds[value || 'normal'] || '1s' }
    @Input() set delay(value: string) { this._delay = `${coerceNumber(value, 0)}ms` }
    @Input() set disabled(value: boolean) { this._disabled = coerceBoolean(value) }
    @Input() set paused(value: boolean) { this._paused = coerceBoolean(value) }
    @Input() set aos(value: number) { this._threshold = coerceNumber(value, 0.5) }
    @Input() set once(value: boolean) { this._once = coerceBoolean(value) }
    @Input() set replay(replay: boolean) { if (this.trigger && coerceBoolean(replay)) { this.trigger = this.idle; this.replay$.next(true) }} 
    @Input() zwpAnimation: ZWPAnimationType | undefined
    @Input() animationContainerId = ''
    @Output() animationStarted = new EventEmitter<void>()
    @Output() animationDone = new EventEmitter<void>()

    @HostBinding('@.disabled') public _disabled = false
    @HostBinding('@animate') public trigger: any
    
    constructor(
        private el: ElementRef,
        private animationService: ZWPAnimationService,
        private renderer: Renderer2,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    private replay$ = new Subject<boolean>()
    private readonly subscriptions: Subscription = new Subscription()

    public animating = false
    public animated = false
    public _paused = false
    public _once = false

    private _timing = '1s'
    private _delay = '0ms'
    private _threshold = 0

    ngOnInit(): void {
        const animationSub = this.replay$.pipe(
            delay(0),
            startWith(!this._paused),
            this.animationService.trigger(this.animationContainerId, this.el, this._threshold),
            takeWhile(trigger => !trigger || !this._once, true),
            map(trigger => trigger ? this.play : this.idle),
            startWith(this.idle),
            distinctUntilChanged()
        ).subscribe(trigger => {
            this.trigger = trigger
            this.changeDetectorRef.markForCheck()
        })

        this.subscriptions.add(animationSub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    @HostListener('@animate.start') 
    public animationStart() { this.animating = true; this.animated = false; this.animationStarted.emit(); }

    @HostListener('@animate.done') 
    public animationFinish() { 
    
        this.animating = false 
        this.animated = true 
        this.animationDone.emit()
        this.renderer.removeStyle(this.el.nativeElement, 'animation')
    }

    private get idle() { return { value: `idle-${this.zwpAnimation}` } }
    private get play() { return { value: this.zwpAnimation, params: { timing: this._timing, delay: this._delay } } }

}