import { AnimationBuilder, AnimationPlayer, AnimationReferenceMetadata } from "@angular/animations";
import { ScrollDispatcher, ViewportRuler } from "@angular/cdk/scrolling";
import { ElementRef, Inject, Injectable, NgZone } from "@angular/core";
import { GeometryRect, isNumber, isUndefined, ZWPDebuggableInjectable, rectContainsRect } from "@zwp/platform.common";
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, scan, shareReplay, startWith, Subject, switchMap, take } from "rxjs";
import { ZWPAnimations } from "../animations";
import { ZWPAnimationOptions } from "../model/zwp.animation.options";
import { ZWPAnimationTriggerMode } from "../model/zwp.animation.trigger-mode";
import { ZWP_ANIMATIONS_TRIGGER_MODE } from "../model/zwp.animations-module.config";
import { zwpAnimationTriggerModeFactory } from "../utils/zwp.animation.trigger-mode.factory";

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPAnimationService', options: { skipMethodDebugger: true } })
export class ZWPAnimationService {
    private viewRectsMap = new Map<string, Observable<GeometryRect>>()
    private optionsMap = new Map<string, BehaviorSubject<ZWPAnimationOptions>>()

    constructor(
        private scrollDispatcher: ScrollDispatcher,
        private viewportRuler: ViewportRuler,
        private zone: NgZone,
        private animationBuilder: AnimationBuilder,
        @Inject(ZWP_ANIMATIONS_TRIGGER_MODE) private triggerMode: ZWPAnimationTriggerMode
    ) {
        // super('ZWPAnimationService', { skipMethodDebugger: true })
        this.triggerMode = zwpAnimationTriggerModeFactory(triggerMode)
        // this.viewRects$ = this.options$.pipe(
        //     switchMap(options => viewportRuler.change(100).pipe(
        //         startWith(null),
        //         map(() => {
        //             const rootElementRect = isUndefined(options.rootElement) ? viewportRuler.getViewportRect() : options.rootElement.getBoundingClientRect()
        //             const top = rootElementRect.top + ((isUndefined(options.edges) || isUndefined(options.edges.top) || !isNumber(options.edges.top)) ? 0 : options.edges.top)
        //             const right = rootElementRect.right + ((isUndefined(options.edges) || isUndefined(options.edges.right) || !isNumber(options.edges.right)) ? 0 : options.edges.right)
        //             const bottom = rootElementRect.bottom + ((isUndefined(options.edges) || isUndefined(options.edges.bottom) || !isNumber(options.edges.bottom)) ? 0 : options.edges.bottom)
        //             const left = rootElementRect.left + ((isUndefined(options.edges) || isUndefined(options.edges.left) || !isNumber(options.edges.left)) ? 0 : options.edges.left)
        //             return { top, right, bottom, left, width: right - left, height: bottom - top }
        //         }),
        //         debounceTime(20)
        //     )),
        //     shareReplay(1)
        // )
    }

    public get useIntersectionObserver(): boolean {
        return this.triggerMode === 'intersectionObserver'
    }
    
    public get useScrolling(): boolean {
        return this.triggerMode === 'scrolling'
    }

    public createAnimationPlayer(animationName: string, el: ElementRef<HTMLElement>, timingOverride?: string, delayOverride?: string): AnimationPlayer {
        if (Object.keys(ZWPAnimations).indexOf(animationName) === -1) { throw new Error(`Animation with name '${animationName}' does not exist.`) }
        const animation = (ZWPAnimations as any)[animationName] as AnimationReferenceMetadata
        // animation.options = { ...animation.options, delay: delayOverride }
        return this.animationBuilder.build(animation).create(el.nativeElement, { params: { timing: timingOverride, delay: delayOverride}})
    }
    
    public setup(animationContainerId: string, options: ZWPAnimationOptions) {
        this.createOptions(animationContainerId, options)
        this.setupViewRect(animationContainerId)
    }

    public trigger(animationContainerId: string, el: ElementRef<HTMLElement>, threshold: number): OperatorFunction<boolean, boolean> {
        // console.log('trigger', animationContainerId, el, threshold)
        return source => this.zone.onStable.pipe(
            take(1),
            switchMap(() => source),
            switchMap(trigger => (threshold <= 0) ? of(trigger) : (this.useIntersectionObserver ? this.intersecting(animationContainerId, el, threshold) : this.scrolling(animationContainerId, el, threshold))),
        )
    }

    private intersecting(animationContainerId: string, el: ElementRef<HTMLElement>, threshold: number): Observable<boolean> {
        const existingOptions = this.optionsMap.get(animationContainerId)
        if (isUndefined(existingOptions)) { throw new Error(`Options for animation container with id '${animationContainerId}' do not exist.`) }
        return existingOptions.pipe(
            map(options => {
                const rootElement = isUndefined(options.rootElement) ? null : options.rootElement
                const top = options.edges?.top || 0
                const right = options.edges?.right || 0
                const bottom = options.edges?.bottom || 0
                const left = options.edges?.left || 0
                const rootMargin = `${-top}px ${-right}px ${-bottom}px ${-left}px`
                // console.log('intersecting', animationContainerId, el, threshold, options, rootElement, rootMargin)
                return { rootElement, rootMargin } as IntersectionObserverInit
            }),
            switchMap(options => this.observe(el, threshold, options))
        )
    }

    private observe(el: ElementRef<HTMLElement>, threshold: number, options: IntersectionObserverInit): Observable<boolean> {
        return new Observable<boolean>(observer => {
            const intersectionObserver = new IntersectionObserver(entries => {
                const ratio = entries[0].intersectionRatio
                if (ratio >= threshold) {
                    this.zone.run(() => observer.next(true))
                }
                if (ratio <= 0) {
                    this.zone.run(() => observer.next(false))
                }

            }, { ...options, threshold: [0, threshold] })
            intersectionObserver.observe(el.nativeElement)
            return () => intersectionObserver.disconnect()
        })
    }

    private scrolling(animationContainerId: string, el: ElementRef<HTMLElement>, threshold: number): Observable<boolean> {
        return this.scrollDispatcher.ancestorScrolled(el, 0).pipe(
            startWith(0),
            switchMap(() => this.visibilityRatio(animationContainerId, el)),
            scan((acc, ratio) => (ratio >= threshold) || (acc && ratio > 0), false),
            distinctUntilChanged(),
            source => new Observable(observer => source.subscribe(v => this.zone.run(() => observer.next(v))))
        )
    }

    private visibilityRatio(animationContainerId: string, el: ElementRef<HTMLElement>): Observable<number> {
        const existingViewRect = this.getViewRect(animationContainerId)
        if (isUndefined(existingViewRect)) { throw new Error(`View rect for animation container with id '${animationContainerId}' does not exist.`) }
        return existingViewRect.pipe(
            map(viewRect => {
                const elRect: GeometryRect = el.nativeElement.getBoundingClientRect()
                if (rectContainsRect(viewRect, elRect)) { return 1 }
                const a = Math.round(elRect.width * elRect.height)
                const b = Math.max(0, Math.min(elRect.right, viewRect.right) - Math.max(elRect.left, viewRect.left))
                const c = Math.max(0, Math.min(elRect.bottom, viewRect.bottom) - Math.max(elRect.top, viewRect.top))

                return Math.round(b * c / a * 10) / 10
            })
        )
    }

    getOptions(animationContainerId: string): Subject<ZWPAnimationOptions> | undefined {
        return this.optionsMap.get(animationContainerId)
    }

    createOptions(animationContainerId: string, options: ZWPAnimationOptions) {
        const existingOptions = this.getOptions(animationContainerId)
        if (!isUndefined(existingOptions)) { throw new Error(`Options for animation container with id '${animationContainerId}' already exist.`) }
        this.optionsMap.set(animationContainerId, new BehaviorSubject<ZWPAnimationOptions>({}))
        this.getOptions(animationContainerId)?.next(options)
    }

    removeOptions(animationContainerId: string) {
        const existingOptions = this.getOptions(animationContainerId)
        if (isUndefined(existingOptions)) { throw new Error(`Options for animation container with id '${animationContainerId}' do not exist.`) }
        this.optionsMap.delete(animationContainerId)
    }

    getViewRect(animationContainerId: string): Observable<GeometryRect> | undefined {
        return this.viewRectsMap.get(animationContainerId)
    }

    setupViewRect(animationContainerId: string) {
        const existingOptions = this.getOptions(animationContainerId)
        if (isUndefined(existingOptions)) { throw new Error(`Options for animation container with id '${animationContainerId}' do not exist.`) }
        const existingViewRect = this.getViewRect(animationContainerId)
        if (!isUndefined(existingViewRect)) { throw new Error(`View rect for animation container with id '${animationContainerId}' already exists.`) }
        const newViewRect = existingOptions.pipe(
            switchMap(options => this.viewportRuler.change(100).pipe(
                startWith(null),
                map(() => {
                    const rootElementRect = isUndefined(options.rootElement) ? this.viewportRuler.getViewportRect() : options.rootElement.getBoundingClientRect()
                    const top = rootElementRect.top + ((isUndefined(options.edges) || isUndefined(options.edges.top) || !isNumber(options.edges.top)) ? 0 : options.edges.top)
                    const right = rootElementRect.right + ((isUndefined(options.edges) || isUndefined(options.edges.right) || !isNumber(options.edges.right)) ? 0 : options.edges.right)
                    const bottom = rootElementRect.bottom + ((isUndefined(options.edges) || isUndefined(options.edges.bottom) || !isNumber(options.edges.bottom)) ? 0 : options.edges.bottom)
                    const left = rootElementRect.left + ((isUndefined(options.edges) || isUndefined(options.edges.left) || !isNumber(options.edges.left)) ? 0 : options.edges.left)
                    return { top, right, bottom, left, width: right - left, height: bottom - top }
                }),
                debounceTime(20)
            )),
            shareReplay(1)
        )
        this.viewRectsMap.set(animationContainerId, newViewRect)
    }

    removeViewRect(animationContainerId: string) {
        const existingViewRect = this.getViewRect(animationContainerId)
        if (isUndefined(existingViewRect)) { throw new Error(`View rect for animation container with id '${animationContainerId}' does not exist.`) }
        this.viewRectsMap.delete(animationContainerId)
    }
}