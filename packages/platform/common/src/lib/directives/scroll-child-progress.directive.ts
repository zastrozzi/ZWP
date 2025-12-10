import { Directive, OnInit, OnDestroy, Input, ElementRef, Output, EventEmitter } from "@angular/core"
import { distinctUntilChanged, Subject, Subscription } from "rxjs"
import { ZWPScrollingService } from "../services"
import { calculateAbsoluteElementRect } from "../utils"

@Directive({
    selector: '[zwpScrollChildProgress]'
})
export class ScrollChildProgressDirective implements OnInit, OnDestroy {
    @Input() zwpScrollChildHost = ''
    @Output() scrollChildProgress = new EventEmitter<number>()

    protected readonly subscriptions = new Subscription()

    scrollChildProgress$ = new Subject<number>()

    constructor(public el: ElementRef, private scrollingService: ZWPScrollingService) {}

    ngOnInit(): void {
        
        const scrollHostScrolledSub = this.scrollingService.getScrollHostScrolledEvents(this.zwpScrollChildHost)?.subscribe(event => {
            const scrollChildRect = calculateAbsoluteElementRect(this.el.nativeElement)
            if (scrollChildRect.top >= event.scrollAxisPosition.position) { this.scrollChildProgress$.next(0) }
            else if (scrollChildRect.bottom <= event.scrollAxisPosition.position) { this.scrollChildProgress$.next(1) }
            else {
                const scrollChildProgress = (event.scrollAxisPosition.position - scrollChildRect.top) / (scrollChildRect.bottom - scrollChildRect.top)
                this.scrollChildProgress$.next(scrollChildProgress)
            }
        })

        const scrollChildProgressSub = this.scrollChildProgress$.pipe(distinctUntilChanged()).subscribe(progress => {
            this.scrollChildProgress.emit(progress)
        })

        this.subscriptions.add(scrollHostScrolledSub)
        this.subscriptions.add(scrollChildProgressSub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
}