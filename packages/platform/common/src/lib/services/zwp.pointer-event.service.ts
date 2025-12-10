import { ElementRef, Injectable, NgZone, OnDestroy, Renderer2, RendererFactory2 } from "@angular/core"
import { filter, Observable, Observer, share } from "rxjs"
import { ZWPDebuggableInjectable } from '../decorators'
import { PointerEventCoordinate, PointerEventInputType } from "../model"
import { isTouchDevice, isUndefined } from "../utils"

@Injectable({providedIn: 'root'})
@ZWPDebuggableInjectable({serviceName: 'ZWPPointerEventService', options: { skipMethodDebugger: true }})
export class ZWPPointerEventService implements OnDestroy {
    protected pointerDown$: Observable<PointerEventCoordinate>
    protected pointerMove$: Observable<PointerEventCoordinate>
    protected pointerUp$: Observable<PointerEventCoordinate>
    private renderer: Renderer2

    constructor(rendererFactory: RendererFactory2, private zone: NgZone) {
        // super('ZWPPointerEventService', { skipMethodDebugger: true })
        this.renderer = rendererFactory.createRenderer(null, null)
        // this.renderer.destroy()
        this.pointerDown$ = new Observable((observer: Observer<PointerEventCoordinate>) => {
            let unsubscribeMouseDown: () => void
            let unsubscribeTouchStart: (() => void)

            this.zone.runOutsideAngular(() => {
                unsubscribeMouseDown = this.renderer.listen('document', 'mousedown', (event: MouseEvent) => {
                    
                    observer.next({ location: {x: event.clientX, y: event.clientY}, event: event, inputType: PointerEventInputType.MOUSE, buttonType: event.button })
                })

                if (isTouchDevice()) {
                    unsubscribeTouchStart = this.renderer.listen('document', 'touchstart', (event: TouchEvent) => {
                        observer.next({ location: {x: event.touches[0].clientX, y: event.touches[0].clientY}, event: event, inputType: PointerEventInputType.TOUCH, buttonType: 0 })
                    })
                }
            })

            return () => {
                unsubscribeMouseDown()
                if (isTouchDevice() && !isUndefined(unsubscribeTouchStart)) { unsubscribeTouchStart() }
            }
        }).pipe(share())

        this.pointerMove$ = new Observable((observer: Observer<PointerEventCoordinate>) => {
            let unsubscribeMouseMove: () => void
            let unsubscribeTouchMove: (() => void)

            this.zone.runOutsideAngular(() => {
                unsubscribeMouseMove = this.renderer.listen('document', 'mousemove', (event: MouseEvent) => {
                    observer.next({ location: {x: event.clientX, y: event.clientY}, event: event, inputType: PointerEventInputType.MOUSE, buttonType: event.button })
                })

                if (isTouchDevice()) {
                    unsubscribeTouchMove = this.renderer.listen('document', 'touchmove', (event: TouchEvent) => {
                        observer.next({ location: {x: event.targetTouches[0].clientX, y: event.targetTouches[0].clientY}, event: event, inputType: PointerEventInputType.TOUCH, buttonType: 0 })
                    })
                }
            })

            return () => {
                unsubscribeMouseMove()
                if (isTouchDevice()) { unsubscribeTouchMove() }
            }
        }).pipe(share())

        this.pointerUp$ = new Observable((observer: Observer<PointerEventCoordinate>) => {
            let unsubscribeMouseUp: () => void
            let unsubscribeTouchEnd: (() => void)
            let unsubscribeTouchCancel: (() => void)

            this.zone.runOutsideAngular(() => {
                unsubscribeMouseUp = this.renderer.listen('document', 'mouseup', (event: MouseEvent) => {
                    // console.log('up', event.target)
                    observer.next({ location: {x: event.clientX, y: event.clientY}, event: event, inputType: PointerEventInputType.MOUSE, buttonType: event.button })
                })

                if (isTouchDevice()) {
                    unsubscribeTouchEnd = this.renderer.listen('document', 'touchend', (event: TouchEvent) => {
                        observer.next({ location: {x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY}, event: event, inputType: PointerEventInputType.TOUCH, buttonType: 0 })
                    })
                    unsubscribeTouchCancel = this.renderer.listen('document', 'touchcancel', (event: TouchEvent) => {
                        observer.next({ location: {x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY}, event: event, inputType: PointerEventInputType.TOUCH, buttonType: 0 })
                    })
                }
            })

            return () => {
                unsubscribeMouseUp()
                if (isTouchDevice()) { 
                    unsubscribeTouchEnd() 
                    unsubscribeTouchCancel()
                }
            }
        }).pipe(share())
    }

    ngOnDestroy(): void {
        this.renderer.destroy()
        // this.debuggableServiceDestroy()
    }

    pointerDownEvents(options: {element?: ElementRef, descendants?: boolean, inputType?: PointerEventInputType, prefilter?: (value: PointerEventCoordinate, index: number) => boolean} = {}): Observable<PointerEventCoordinate> {
        return this.pointerDown$.pipe(
            filter(options.prefilter ?? (() => true)),
            filter(coord => !isUndefined(options.inputType) ? coord.inputType === options.inputType : true),
            filter(
                coord => !isUndefined(options.element) ? 
                    (!isUndefined(options.descendants) && options.descendants === false) ? 
                        (options.element.nativeElement as HTMLElement).isSameNode(coord.event.target as HTMLElement) 
                        : options.element.nativeElement.contains(coord.event.target) 
                    : true
            )
        )
    }

    pointerUpEvents(options: {element?: ElementRef, descendants?: boolean, inputType?: PointerEventInputType, prefilter?: (value: PointerEventCoordinate, index: number) => boolean} = {}): Observable<PointerEventCoordinate> {
        return this.pointerUp$.pipe(
            filter(options.prefilter ?? (() => true)),
            filter(coord => !isUndefined(options.inputType) ? coord.inputType === options.inputType : true),
            filter(
                coord => !isUndefined(options.element) ? 
                    (!isUndefined(options.descendants) && options.descendants === false) ? 
                        (options.element.nativeElement as HTMLElement).isSameNode(coord.event.target as HTMLElement) 
                        : options.element.nativeElement.contains(coord.event.target) 
                    : true
            )
        )
    }

    pointerMoveEvents(options: {element?: ElementRef, descendants?: boolean, inputType?: PointerEventInputType, prefilter?: (value: PointerEventCoordinate, index: number) => boolean} = {}): Observable<PointerEventCoordinate> {
        return this.pointerMove$.pipe(
            filter(options.prefilter ?? (() => true)),
            filter(coord => !isUndefined(options.inputType) ? coord.inputType === options.inputType : true),
            filter(
                coord => !isUndefined(options.element) ? 
                    (!isUndefined(options.descendants) && options.descendants === false) ? 
                        (options.element.nativeElement as HTMLElement).isSameNode(coord.event.target as HTMLElement) 
                        : options.element.nativeElement.contains(coord.event.target) 
                    : true
            )
        )
    }

    // mouseDownEventsForElement(element: ElementRef): Observable<PointerEventCoordinate> {
    //     return this.pointerDown$.pipe(
    //         filter(coord => coord.inputType === PointerEventInputType.MOUSE),
    //         filter(coord => element.nativeElement.contains(coord.event.target))
    //     )
    // }

    // mouseUpEventsForElement(element: ElementRef): Observable<PointerEventCoordinate> {
    //     return this.pointerUp$.pipe(
    //         filter(coord => coord.inputType === PointerEventInputType.MOUSE),
    //         filter(coord => element.nativeElement.contains(coord.event.target))
    //     )
    // }

    // mouseMoveEventsForElement(element: ElementRef): Observable<PointerEventCoordinate> {
    //     return this.pointerMove$.pipe(
    //         filter(coord => coord.inputType === PointerEventInputType.MOUSE),
    //         filter(coord => element.nativeElement.contains(coord.event.target))
    //     )
    // }

    // touchDownEventsForElement(element: ElementRef): Observable<PointerEventCoordinate> {
    //     return this.pointerDown$.pipe(
    //         filter(coord => coord.inputType === PointerEventInputType.TOUCH),
    //         filter(coord => element.nativeElement.contains(coord.event.target))
    //     )
    // }

    // touchUpEventsForElement(element: ElementRef): Observable<PointerEventCoordinate> {
    //     return this.pointerUp$.pipe(
    //         filter(coord => coord.inputType === PointerEventInputType.TOUCH),
    //         filter(coord => element.nativeElement.contains(coord.event.target))
    //     )
    // }

    // touchMoveEventsForElement(element: ElementRef): Observable<PointerEventCoordinate> {
    //     return this.pointerMove$.pipe(
    //         filter(coord => coord.inputType === PointerEventInputType.TOUCH),
    //         filter(coord => element.nativeElement.contains(coord.event.target))
    //     )
    // }
}