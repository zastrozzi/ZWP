import { Directive, ElementRef, Input, OnDestroy, OnInit, Optional } from '@angular/core'
import { GeometryEdges, ZWPPointerEventService } from '@zwp/platform.common'
import { filter, Subscription, BehaviorSubject, withLatestFrom, map, distinctUntilKeyChanged } from 'rxjs'
import { ResizableDirective } from './resizable.directive'

@Directive({
    selector: '[zwpResizeHandle]'
})
export class ResizeHandleDirective implements OnInit, OnDestroy {
    @Input() resizeEdges: GeometryEdges = {}
    @Input() resizableContainer: ResizableDirective | undefined

    private pointerIsDown$ = new BehaviorSubject<boolean>(false)
    private subscriptions: Subscription = new Subscription()

    constructor(
        private element: ElementRef,
        @Optional() private resizableDirective: ResizableDirective,
        private pointerEventService: ZWPPointerEventService
    ) {}

    ngOnInit(): void {
        const pointerDownSub = this.pointerEventService.pointerDownEvents({element: this.element}).subscribe((coord) => {
            this.pointerIsDown$.next(true)
            this.onPointerDown(coord.event, coord.location.x, coord.location.y)
        })

        const pointerUpSub = this.pointerEventService.pointerUpEvents()
            .pipe(
                withLatestFrom(this.pointerIsDown$),
                filter((pair) => pair[1] === true),
                map((pair) => pair[0])
            )
            .subscribe((coord) => {
                // console.log('in handle up')
                this.pointerIsDown$.next(false)
                this.onPointerUp(coord.event, coord.location.x, coord.location.y)
            })

        const pointerMoveSub = this.pointerEventService.pointerMoveEvents()
            .pipe(
                withLatestFrom(this.pointerIsDown$),
                filter((pair) => pair[1] === true),
                map((pair) => pair[0]),
                distinctUntilKeyChanged('location', (x, y) => x.x === y.x && x.y === y.y)
            )
            .subscribe((coord) => {
                this.onPointerMove(coord.event, coord.location.x, coord.location.y)
            })

        this.subscriptions.add(pointerDownSub)
        this.subscriptions.add(pointerUpSub)
        this.subscriptions.add(pointerMoveSub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    onPointerDown(event: MouseEvent | TouchEvent, x: number, y: number): void {
        if (event.cancelable) {
            event.preventDefault()
        }
        
        this.resizable.pointerDown.next({
            location: { x, y },
            edges: this.resizeEdges
        })
    }

    onPointerUp(event: MouseEvent | TouchEvent, x: number, y: number): void {
        this.resizable.pointerUp.next({
            location: { x, y },
            edges: this.resizeEdges,
            event
        })
    }

    onPointerMove(event: MouseEvent | TouchEvent, x: number, y: number): void {
        event.preventDefault()
        this.resizable.pointerMove.next({
            location: { x, y },
            edges: this.resizeEdges,
            event
        })
    }

    private get resizable(): ResizableDirective {
        return this.resizableDirective || this.resizableContainer
    }
}
