import { ContentChildren, Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, QueryList } from "@angular/core";
import { animationFrameScheduler, BehaviorSubject, distinctUntilChanged, fromEvent, interval, map, mergeMap, of, repeat, scheduled, Subject, Subscription, takeLast, window } from "rxjs";
import { ZWPScrollEvent, ZWPScrollEventType } from "../model";
import { ZWPScrollingService } from "../services/zwp.scrolling.service";
import { ScrollDestinationDirective } from "./scroll-destination.directive";

@Directive({
    selector: '[zwpScrollHost]'
})
export class ScrollHostDirective implements OnInit, OnDestroy {
    @Input() zwpScrollHost = ''
    @Output() zwpScrollHostScrolled: EventEmitter<ZWPScrollEvent> = new EventEmitter<ZWPScrollEvent>()
    @Output() zwpScrollHostScrollDirectionChange: EventEmitter<ZWPScrollEventType> = new EventEmitter<ZWPScrollEventType>()
    @ContentChildren(ScrollDestinationDirective) scrollDestinations: QueryList<ScrollDestinationDirective> | undefined

    scrollHostVerticalAxisPosition$ = new BehaviorSubject<number>(0)
    scrollHostHorizontalAxisPosition$ = new BehaviorSubject<number>(0)
    scrollHostScrolled$ = new Subject<ZWPScrollEvent>()
    scrollHostScrollDirection$ = new Subject<ZWPScrollEventType>()

    constructor(private el: ElementRef, private scrollingService: ZWPScrollingService, private zone: NgZone) {}

    protected readonly subscriptions = new Subscription()

    // protected _elementScrolled: Observable<Event> = new Observable((observer: Observer<Event>) =>
    //     this.zone.runOutsideAngular(() =>
    //     fromEvent(this.el.nativeElement, 'scroll')
    //         .pipe(takeUntil(this._destroyed))
    //         .subscribe((event) => observer.next(event as Event))
    //     )
    // )

    ngOnInit(): void {
        // let frame = 0
        // let second = 0
        const scrollSub = fromEvent(this.el.nativeElement, 'scroll')
            .pipe(
                map(event => (event as any).currentTarget),
                window(scheduled(interval(0), animationFrameScheduler).pipe(repeat())),
                mergeMap(w => (w as any).pipe(takeLast(1)))
            )
            .subscribe(() => {
            
            // const dateSeconds = new Date().getSeconds()
            // if (dateSeconds !== second) { 
            //     second = dateSeconds
            //     frame = 0
            // } else { frame++ }
            // console.log(dateSeconds, 'dateSeconds')
            const newPosition = this.scrollingService.getScrollHostAxisPosition(this.zwpScrollHost)
            const currentVerticalPosition = this.scrollHostVerticalAxisPosition$.getValue()
            const currentHorizontalPosition = this.scrollHostHorizontalAxisPosition$.getValue()
            let scrollEventType: ZWPScrollEventType
            if (newPosition.axis === 'vertical' && newPosition.position > currentVerticalPosition) {
                scrollEventType = 'scrollDown'
                this.zone.runOutsideAngular(() => { 
                    this.scrollHostVerticalAxisPosition$.next(newPosition.position) 
                    if (newPosition.position > 0) { this.scrollHostScrollDirection$.next(scrollEventType) }
                })
                // this.zwpScrollHostScrolled.emit({ type: scrollEventType, scrollAxisPosition: newPosition })
            }
            if (newPosition.axis === 'vertical' && newPosition.position < currentVerticalPosition) {
                scrollEventType = 'scrollUp'
                this.zone.runOutsideAngular(() => { 
                    this.scrollHostVerticalAxisPosition$.next(newPosition.position) 
                    if (newPosition.position > 0) { this.scrollHostScrollDirection$.next(scrollEventType) }
                })
                
            }
            if (newPosition.axis === 'horizontal' && newPosition.position > currentHorizontalPosition) {
                scrollEventType = 'scrollRight'
                this.zone.runOutsideAngular(() => { 
                    this.scrollHostHorizontalAxisPosition$.next(newPosition.position) 
                    if (newPosition.position > 0) { this.scrollHostScrollDirection$.next(scrollEventType) }
                })
                // this.zwpScrollHostScrolled.emit({ type: scrollEventType, scrollAxisPosition: newPosition })
            }
            if (newPosition.axis === 'horizontal' && newPosition.position < currentHorizontalPosition) {
                scrollEventType = 'scrollLeft'
                this.zone.runOutsideAngular(() => { 
                    this.scrollHostHorizontalAxisPosition$.next(newPosition.position) 
                    if (newPosition.position > 0) { this.scrollHostScrollDirection$.next(scrollEventType) }
                    
                })
                // this.zwpScrollHostScrolled.emit({ type: scrollEventType, scrollAxisPosition: newPosition })
            }
            this.zone.runOutsideAngular(() => { this.scrollHostScrolled$.next({ type: scrollEventType, scrollAxisPosition: newPosition }) })
        })

        const scrollDirectionSub = this.scrollHostScrollDirection$.pipe(distinctUntilChanged()).subscribe((scrollDirection) => {
            this.zwpScrollHostScrollDirectionChange.emit(scrollDirection)
        })

        this.subscriptions.add(scrollSub)
        this.subscriptions.add(scrollDirectionSub)

        this.scrollingService.registerScrollHost(this.el, this.zwpScrollHost, this.scrollHostScrolled$)
    }

    ngOnDestroy(): void {
        this.scrollingService.deregisterScrollHost(this.zwpScrollHost)
        this.subscriptions.unsubscribe()
    }

    
}