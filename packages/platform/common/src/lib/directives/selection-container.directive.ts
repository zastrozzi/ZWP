import { AfterContentInit, ContentChildren, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList } from "@angular/core";
import { BehaviorSubject, combineLatest, distinctUntilChanged, distinctUntilKeyChanged, filter, map, Subscription, withLatestFrom } from "rxjs";
import { v4 } from "uuid";
import { GeometryPoint, GeometryRect, PointerEventCoordinate, PointerEventInputType } from "../model";
import { ZWPPointerEventService, ZWPSelectionService } from "../services";
import { calculateFixedElementRect, isNull, isUndefined, rectContainsPoint, rectIntersectsRect } from "../utils";

@Directive({
    selector: '[zwpSelectionContainerItem]'
})
export class SelectionContainerItemDirective {
    @Input() zwpSelectionContainerItemId: string | undefined

    constructor(private element: ElementRef) {}

    get elementRect(): {id: string, rect: GeometryRect} {
        return {id: this.zwpSelectionContainerItemId ?? v4(), rect: calculateFixedElementRect(this.element.nativeElement)}
    }
}

@Directive({
    selector: '[zwpSelectionContainer]'
})
export class SelectionContainerDirective implements OnInit, OnDestroy, AfterContentInit {
    private subscriptions: Subscription = new Subscription()
    private pointerIsDown$ = new BehaviorSubject<boolean>(false)
    private selectionContainerItemElementRects$ = new BehaviorSubject<{id: string, rect: GeometryRect}[]>([])
    private initialDownPosition: GeometryPoint | null = null
    private selectionBoxRect$ = this.selectionService.selectionBoxRect$

    private intersectingSelectionContainerItemRects$ = combineLatest([this.selectionBoxRect$, this.selectionContainerItemElementRects$]).pipe(
        filter(pair => !isNull(pair[0])),
        map(pair => isUndefined(pair[0]) ? [] : pair[1].filter(elementRect => rectIntersectsRect(pair[0] as GeometryRect, elementRect.rect))),
        distinctUntilChanged((x, y) => x.length === y.length)
    )

    @ContentChildren(SelectionContainerItemDirective, {descendants: true}) selectionContainerItems: QueryList<SelectionContainerItemDirective> | undefined

    @Output() zwpSelectionChange: EventEmitter<string[]> = new EventEmitter<string[]>()

    constructor(
        private element: ElementRef,
        private pointerEventService: ZWPPointerEventService,
        private selectionService: ZWPSelectionService
    ) {}
    
    ngOnInit(): void {
        const pointerEventFilter = (coord: PointerEventCoordinate) => { 
            let notContaining = true
            this.selectionContainerItemElementRects.forEach(rect => {
                if (rectContainsPoint(rect.rect, coord.location)) { notContaining = false }
            })
            return notContaining
        }
        const pointerDownSub = this.pointerEventService.pointerDownEvents({element: this.element, inputType: PointerEventInputType.MOUSE, prefilter: pointerEventFilter})
            .subscribe((coord) => {
                const selectionContainerRect = calculateFixedElementRect(this.element.nativeElement)
                this.pointerIsDown$.next(true)
                this.initialDownPosition = coord.location
                this.selectionService.createSelectionBox(selectionContainerRect, coord.location)
            })

        const pointerUpSub = this.pointerEventService.pointerUpEvents({inputType: PointerEventInputType.MOUSE})
            .pipe(
                withLatestFrom(this.pointerIsDown$),
                filter((pair) => pair[1] === true),
                map((pair) => pair[0])
            )
            .subscribe(() => {
                // console.log('in handle up')
                this.pointerIsDown$.next(false)
                this.initialDownPosition = null
                this.selectionService.removeSelectionBox()
            })

        const pointerMoveSub = this.pointerEventService.pointerMoveEvents({inputType: PointerEventInputType.MOUSE})
            .pipe(
                withLatestFrom(this.pointerIsDown$),
                filter((pair) => pair[1] === true),
                map((pair) => pair[0]),
                distinctUntilKeyChanged('location', (x, y) => x.x === y.x && x.y === y.y)
            )
            .subscribe((coord) => {
                if (!isNull(this.initialDownPosition)) {
                    const selectionContainerRect = calculateFixedElementRect(this.element.nativeElement)
                    this.selectionService.updateSelectionBox(selectionContainerRect, this.initialDownPosition, coord.location)
                }
                
            })

        const intersectionsSub = this.intersectingSelectionContainerItemRects$.subscribe(intersectingItems => {
            this.zwpSelectionChange.emit(intersectingItems.map(item => item.id))
        })


        this.subscriptions.add(intersectionsSub)
        this.subscriptions.add(pointerDownSub)
        this.subscriptions.add(pointerUpSub)
        this.subscriptions.add(pointerMoveSub)
    }
    ngAfterContentInit(): void {
        const selectionContainerItemRectsSub = this.selectionContainerItems?.changes.subscribe(() => {
            this.selectionContainerItemElementRects$.next(this.selectionContainerItemElementRects)
        })

        this.subscriptions.add(selectionContainerItemRectsSub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    get selectionContainerItemElementRects(): {id: string, rect: GeometryRect}[] {
        if (isUndefined(this.selectionContainerItems)) { return [] }
        return this.selectionContainerItems.map(item => item.elementRect)
    }
}

