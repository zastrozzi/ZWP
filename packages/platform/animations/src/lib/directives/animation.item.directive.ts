import { AnimationPlayer, AnimationReferenceMetadata } from "@angular/animations";
import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { coerceNumber, coerceBoolean, isUndefined } from "@zwp/platform.common";
import { debounce, delay, distinctUntilChanged, startWith, Subject, Subscription, takeWhile, timer } from "rxjs";
import { ZWPAnimationSpeed, ZWPDefaultAnimationSpeeds } from "../model/zwp.animation.speed";
import { ZWPAnimationService } from "../services/zwp.animation.service";

@Directive({
    selector: '[zwpAnimationItem]'
})
export class ZWPAnimationItemDirective implements OnInit, OnChanges, OnDestroy {
    @Input() set timing(value: ZWPAnimationSpeed) { this._timing = ZWPDefaultAnimationSpeeds[value || 'normal'] || '1s' }
    @Input() set delay(value: string) { this._delay = coerceNumber(value, 0) }
    @Input() set paused(value: boolean) { this._paused = coerceBoolean(value) }
    @Input() set aos(value: number) { this._threshold = coerceNumber(value, 0.5) }
    @Input() set once(value: boolean) { this._once = coerceBoolean(value) }
    @Input() set replay(replay: boolean) { this.replay$.next(replay) } 
    @Input() buildIn = false
    @Input() buildOut = false
    @Input() progressControllable = false
    @Input() progress = 0

    @Input() zwpAnimationItem: string | AnimationReferenceMetadata | undefined
    @Input() animationContainerId = ''
    @Input() animationId = ''
    @Output() animationStarted = new EventEmitter<void>()
    @Output() animationDone = new EventEmitter<void>()
    

    constructor(
        private el: ElementRef,
        private animationService: ZWPAnimationService
        // private changeDetectorRef: ChangeDetectorRef
    ) {}

    private replay$ = new Subject<boolean>()
    private readonly subscriptions: Subscription = new Subscription()

    public animating = false
    public animated = false
    public _paused = false
    public _once = false

    private _timing = '1s'
    private _delay = 0
    private _threshold = 0

    private animationPlayer: AnimationPlayer | undefined

    ngOnInit(): void {
        if (isUndefined(this.zwpAnimationItem)) { return }
        if (typeof this.zwpAnimationItem !== 'string') { return }
        if (this.progressControllable && (this._threshold !== 0)) { throw new Error('Cannot use progressControllable with scroll thresholds') }
        this.animationPlayer = this.animationService.createAnimationPlayer(this.zwpAnimationItem, this.el, this._timing, '')
        if (this.buildIn) {
            this.animationPlayer?.reset()
            this.animationPlayer?.setPosition(0) 
        }

        if (this.progressControllable) {
            // if (changes['progress'] && changes['progress'].currentValue >= 0 && changes['progress'].currentValue <= 1 && this.animationPlayer) {
                this.animationPlayer.setPosition(this.progress)
            // }
        }

        this.animationPlayer?.onDone(() => {
            if (!this.buildIn && !this.buildOut) { 
                this.animationPlayer?.reset() 
            }
    })
        

        // if () { 
            const animationSub = this.replay$.pipe(
                delay(0),
                startWith(!this._paused),
                this.animationService.trigger(this.animationContainerId, this.el, this._threshold),
                takeWhile(trigger => !trigger || !this._once, true),
                startWith(false),
                distinctUntilChanged(),
                debounce(trigger => trigger ? timer(this._delay) : timer(0))
            ).subscribe(trigger => {
                if (!this.progressControllable) {
                    if (trigger) {
                        this.animationPlayer?.play()
                    }
                    if (this.buildIn) { if (!trigger) { 
                        this.animationPlayer?.reset()
                        this.animationPlayer?.setPosition(0) 
                    } }
                }
                
                
                // this.changeDetectorRef.detectChanges()
            })
            this.subscriptions.add(animationSub) 
        // }
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.progressControllable) {
            if (changes['progress'] && changes['progress'].currentValue >= 0 && changes['progress'].currentValue <= 1 && this.animationPlayer) {
                if (this.buildOut) { this.animationPlayer?.reset() }
                this.animationPlayer.setPosition(this.progress)
            }
        }
    }

    ngOnDestroy(): void {
        
        this.subscriptions.unsubscribe()
        this.animationPlayer?.destroy()
        this.animationPlayer = undefined
    }
}