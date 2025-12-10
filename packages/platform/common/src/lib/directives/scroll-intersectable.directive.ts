import { Directive, OnInit, OnDestroy, Input, ElementRef, Output, EventEmitter } from "@angular/core"
import { distinctUntilChanged, Subject, Subscription } from "rxjs"
import { ZWPScrollingService } from "../services"

@Directive({
    selector: '[zwpScrollIntersectable]'
})
export class ScrollIntersectableDirective implements OnInit, OnDestroy {
    @Input() zwpScrollIntersectable = ''
    @Input() zwpScrollIntersectableHost = ''
    @Output() currentScrollIntersectors = new EventEmitter<string[]>()

    protected readonly subscriptions = new Subscription()

    currentScrollIntersectors$ = new Subject<string[]>()

    constructor(public el: ElementRef, private scrollingService: ZWPScrollingService) {}

    ngOnInit(): void {
        this.scrollingService.registerScrollIntersectable(this.el, this.zwpScrollIntersectable, this.zwpScrollIntersectableHost)
        const scrollHostScrolledSub = this.scrollingService.getScrollHostScrolledEvents(this.zwpScrollIntersectableHost)?.subscribe(() => {
            this.currentScrollIntersectors$.next(this.scrollingService.getCurrentScrollIntersectorIdsForIntersectable(this.zwpScrollIntersectable))
        })

        const currentScrollIntersectorsSub = this.currentScrollIntersectors$.pipe(distinctUntilChanged((a1, a2) => JSON.stringify(a1) === JSON.stringify(a2))).subscribe((currentScrollIntersectors) => {
            // console.log('currentScrollIntersectors', this.zwpScrollIntersectable, currentScrollIntersectors)
            this.currentScrollIntersectors.emit(currentScrollIntersectors)
        })
        this.subscriptions.add(scrollHostScrolledSub)
        this.subscriptions.add(currentScrollIntersectorsSub)
    }

    ngOnDestroy(): void {
        this.scrollingService.deregisterScrollIntersectable(this.zwpScrollIntersectable)
        this.subscriptions.unsubscribe()
    }
}