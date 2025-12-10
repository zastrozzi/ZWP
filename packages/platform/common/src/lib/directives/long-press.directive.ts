import { Directive, ElementRef, EventEmitter, OnDestroy, Output } from "@angular/core"
import { merge, of, Subscription, timer } from "rxjs"
import { distinctUntilChanged, filter, map, switchMap } from "rxjs/operators"
import { ZWPPointerEventService } from "../services"
  
@Directive({
    selector: "[zwpLongPress]"
})
export class LongPressDirective implements OnDestroy {
    private subscriptions: Subscription = new Subscription()
    threshold = 300
  
    @Output() longPressDuration: EventEmitter<number> = new EventEmitter()
    @Output() isLongPressed: EventEmitter<boolean> = new EventEmitter()
  
    constructor(private el: ElementRef, private pointerEventsService: ZWPPointerEventService) {
        // const mouseDown = fromEvent<MouseEvent>(this.el.nativeElement, "mousedown").pipe(
        //     filter(event => event.button == 0),
        //     map((event) => true)
        // )
        // const touchstart = fromEvent(this.el.nativeElement, 'touchstart').pipe(map(() => true))
        // const touchEnd = fromEvent(this.el.nativeElement, 'touchend').pipe(map(() => false))
        // const mouseUp = fromEvent<MouseEvent>(this.el.nativeElement, "mouseup").pipe(
        //     filter(event => event.button == 0),
        //     map(() => false)
        // )

        const pressDown = this.pointerEventsService.pointerDownEvents({element: this.el}).pipe(
            filter(coord => coord.buttonType == 0),
            map(() => true)
        )

        const pressUp = this.pointerEventsService.pointerUpEvents({element: this.el}).pipe(
            filter(coord => coord.buttonType == 0),
            map(() => false)
        )
        
        const isLongPressedSubscription = merge(pressDown, pressUp)
            .pipe(
                switchMap(state =>
                    state ? timer(this.threshold, 100) : of(0)
                ),
                // filter(value => !!value),
                map((x) => x > 0 ? true : false),
                distinctUntilChanged()
            )
            .subscribe((isPressed) => this.isLongPressed.emit(isPressed))

        const longPressDurationSubscription = merge(pressDown, pressUp)
            .pipe(
                switchMap(state =>
                    state ? timer(this.threshold, 100) : of(0)
                ),
                distinctUntilChanged()
            )
            .subscribe((pressDuration) => this.longPressDuration.emit(pressDuration))

        this.subscriptions.add(isLongPressedSubscription)
        this.subscriptions.add(longPressDurationSubscription)
    }
  
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
}