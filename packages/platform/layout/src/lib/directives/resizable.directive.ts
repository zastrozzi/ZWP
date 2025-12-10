import { isPlatformBrowser } from "@angular/common";
import { Directive, Input, OnDestroy, OnInit, Output, EventEmitter, Inject, PLATFORM_ID, Renderer2, ElementRef, NgZone } from "@angular/core";
import { 
    calculateAbsoluteElementRect, 
    calculateFixedElementRect, 
    calculateGeometryRectDiffForEdges, 
    deepCloneNode, 
    GeometryEdges, 
    GeometryPoint, 
    GeometryRect, 
    ZWPPointerEventService, 
    MouseDownData, 
    MouseMoveData, 
    MouseUpData, 
    Nullable, 
    transferElementData, 
    transferScrollData, 
    transformGeometryRectForEdges 
} from "@zwp/platform.common";
import { filter, map, merge, mergeMap, Observable, pairwise, share, Subject, Subscription, take, takeUntil, tap } from "rxjs";
import { defaultResizeCursors, GhostElementPositioning, MOUSE_MOVE_THROTTLE, ResizeCursors, getResizeCursor, ResizeEvent, ResizeNode } from "../model";


const RESIZE_ACTIVE_CLASS = 'zwp-resize-active';
const RESIZE_GHOST_ELEMENT_CLASS = 'zwp-resize-ghost-element';

@Directive({ selector: '[zwpResizable]' })
export class ResizableDirective implements OnInit, OnDestroy {
    
    @Input() enableGhostResize = false
    @Input() resizeSnapGrid: GeometryEdges = {}
    @Input() resizeCursors: Partial<ResizeCursors> = defaultResizeCursors
    @Input() ghostElementPositioning: GhostElementPositioning = 'fixed'
    @Input() allowNegativeResizes = false
    @Input() mouseMoveThrottle: number = MOUSE_MOVE_THROTTLE

    @Output() resizeStart: EventEmitter<ResizeEvent> = new EventEmitter<ResizeEvent>()
    @Output() resizing: EventEmitter<ResizeEvent> = new EventEmitter<ResizeEvent>()
    @Output() resizeEnd: EventEmitter<ResizeEvent> = new EventEmitter<ResizeEvent>()

    pointerUp: Subject<MouseUpData> = new Subject()
    pointerDown: Subject<MouseDownData> = new Subject()
    pointerMove: Subject<MouseMoveData> = new Subject()

    private readonly subscriptions: Subscription = new Subscription()

    private destroy$ = new Subject<void>()

    @Input() validateResize: (resizeEvent: ResizeEvent) => boolean = () => true

    constructor(
        @Inject(PLATFORM_ID) private platformId: object,
        private renderer: Renderer2,
        public el: ElementRef,
        private zone: NgZone,
        private pointerEventService: ZWPPointerEventService
    ) {
        
    }

    ngOnInit(): void {
        const pointerDown$: Observable<MouseDownData> = merge(this.pointerEventService.pointerDownEvents(), this.pointerDown)
        // const pointerDown$: Observable<MouseDownData> = merge(this.pointerEventService.pointerDownEvents({element: this.el}), this.pointerDown)

        const pointerMove$: Observable<MouseMoveData> = merge(this.pointerEventService.pointerMoveEvents(), this.pointerMove).pipe(
            tap(({ event }) => {
                if (currentResize && event.cancelable) {
                    event.preventDefault()
                }
            }),
            share()
        )

        const pointerUp$: Observable<MouseUpData> = merge(this.pointerEventService.pointerUpEvents(), this.pointerUp).pipe(
            tap(({ event }) => {
                
                if (currentResize && event.cancelable) {
                    // console.log(event, currentResize)
                    event.stopPropagation()
                    event.preventDefault()
                }
            }),
            share()
        )

        let currentResize: Nullable<ResizeNode> = null

        const removeGhostElement = () => {
            if (currentResize && currentResize.clonedNode) {
                this.el.nativeElement.parentElement.removeChild(currentResize.clonedNode)
                this.renderer.setStyle(this.el.nativeElement, 'visibility', 'inherit')
            }
        }

        const getResizeCursors = (): ResizeCursors => ({ ...defaultResizeCursors, ...this.resizeCursors })

        const pointerDrag$: Observable<GeometryPoint> = pointerDown$
            .pipe(
                mergeMap((startCoords) => {
                    const getDiff = (moveCoords: GeometryPoint) => ({ x: moveCoords.x - startCoords.location.x, y: moveCoords.y - startCoords.location.y })

                    const getSnapGrid = () => {
                        const snapGrid: GeometryPoint = { x: 1, y: 1 }

                        if (currentResize) {
                            if (this.resizeSnapGrid.left && currentResize.edges.left) {
                                snapGrid.x = +this.resizeSnapGrid.left
                            } else if (this.resizeSnapGrid.right && currentResize.edges.right) {
                                snapGrid.x = +this.resizeSnapGrid.right
                            }

                            if (this.resizeSnapGrid.top && currentResize.edges.top) {
                                snapGrid.y = +this.resizeSnapGrid.top
                            } else if (this.resizeSnapGrid.bottom && currentResize.edges.bottom) {
                                snapGrid.y = +this.resizeSnapGrid.bottom
                            }
                        }
                        return snapGrid
                    }

                    const getGrid = (coords: GeometryPoint, snapGrid: GeometryPoint) => ({ x: Math.ceil(coords.x / snapGrid.x), y: Math.ceil(coords.y / snapGrid.y) })

                    return (
                        merge(pointerMove$.pipe(take(1)).pipe(map((coords) => [null, coords])), pointerMove$.pipe(pairwise())) as Observable<[{ location: GeometryPoint }, { location: GeometryPoint }]>
                    )
                    .pipe(
                        map(([previousCoords, newCoords]) => {
                            return [
                                previousCoords ? getDiff(previousCoords.location) : previousCoords,
                                getDiff(newCoords.location)
                            ]
                        }),
                        filter(([previousCoords, newCoords]) => {
                            if (!previousCoords) { return true }
                            const snapGrid = getSnapGrid()
                            const previousGrid = getGrid(previousCoords, snapGrid)
                            const newGrid = getGrid(newCoords, snapGrid)
                            return (previousGrid.x !== newGrid.x) || (previousGrid.y !== newGrid.y) 
                        }),
                        map(([, newCoords]) => {
                            const snapGrid = getSnapGrid()
                            return { x: Math.round(newCoords.x / snapGrid.x) * snapGrid.x, y: Math.round(newCoords.y * snapGrid.y) * snapGrid.y }
                        }),
                        takeUntil(merge(pointerUp$, pointerDown$))
                    )
                }),
                filter(() => !!currentResize)
            )

        
        const pointerDragSub = pointerDrag$.pipe(
            map((transform) => {
                if (currentResize) {
                    return transformGeometryRectForEdges(currentResize.initialRect, transform, currentResize.edges)
                } else {
                    return {top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0}
                }
            }),
            filter((newBoundingRect: GeometryRect) => {
                return (this.allowNegativeResizes || !!(newBoundingRect.height && newBoundingRect.width && newBoundingRect.height > 0 && newBoundingRect.width > 0))
            }),
            filter((newBoundingRect: GeometryRect) => { 
                if (currentResize) {
                    return this.validateResize({ 
                        boundingRectangle: newBoundingRect, 
                        edges: calculateGeometryRectDiffForEdges({ 
                            edges: currentResize.edges, 
                            initialRect: currentResize.initialRect, 
                            newRect: newBoundingRect
                        })
                    })
                } else {
                    return true
                }
                
            })
        )
        .subscribe((newBoundingRect: GeometryRect) => {
            if (currentResize && currentResize.clonedNode) {
                this.renderer.setStyle(currentResize.clonedNode, 'height', `${newBoundingRect.height}px`)
                this.renderer.setStyle(currentResize.clonedNode, 'width', `${newBoundingRect.width}px`)
                this.renderer.setStyle(currentResize.clonedNode, 'top', `${newBoundingRect.top}px`)
                this.renderer.setStyle(currentResize.clonedNode, 'left', `${newBoundingRect.left}px`)
                
            }
      
            if (this.resizing.observed) {
                this.zone.run(() => {
                    if (currentResize) {
                        this.resizing.emit({
                            edges: calculateGeometryRectDiffForEdges({
                                edges: currentResize.edges,
                                initialRect: currentResize.initialRect,
                                newRect: newBoundingRect,
                            }),
                            boundingRectangle: newBoundingRect
                        })
                    }
                    
                })
            }
            if (currentResize) { currentResize.currentRect = newBoundingRect }
        })

        const pointerDownSub = pointerDown$.pipe(
            map(({ edges }) => edges || {}),
            filter((edges: GeometryEdges) => Object.keys(edges).length > 0)
        )
        .subscribe((edges: GeometryEdges) => {
            if (currentResize) { removeGhostElement() }
            const initialRect: GeometryRect = this.ghostElementPositioning === 'absolute' ? calculateAbsoluteElementRect(this.el.nativeElement) : calculateFixedElementRect(this.el.nativeElement)
            currentResize = { edges, initialRect, currentRect: initialRect }
            const resizeCursors = getResizeCursors()
            const cursor = getResizeCursor(currentResize.edges, resizeCursors)
            this.renderer.setStyle(document.body, 'cursor', cursor)
            this.setElementClass(this.el, RESIZE_ACTIVE_CLASS, true)
            if (this.enableGhostResize) {
                currentResize.clonedNode = deepCloneNode(this.el.nativeElement);
                this.el.nativeElement.parentElement.appendChild(currentResize.clonedNode)
                this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden')
                this.renderer.setStyle(currentResize.clonedNode, 'position', this.ghostElementPositioning)
                this.renderer.setStyle(currentResize.clonedNode, 'left', `${currentResize.initialRect.left}px`)
          
                this.renderer.setStyle(currentResize.clonedNode, 'top', `${currentResize.initialRect.top}px`)
                this.renderer.setStyle(currentResize.clonedNode, 'height', `${currentResize.initialRect.height}px`)
                this.renderer.setStyle(currentResize.clonedNode, 'width', `${currentResize.initialRect.width}px`)
                
                this.renderer.setStyle(currentResize.clonedNode, 'cursor', getResizeCursor(currentResize.edges, resizeCursors))
                this.renderer.addClass(currentResize.clonedNode, RESIZE_GHOST_ELEMENT_CLASS)
                
                transferElementData('div[zwpVScroll]', this.el.nativeElement, currentResize.clonedNode, transferScrollData)
                transferElementData('div[zwpHScroll]', this.el.nativeElement, currentResize.clonedNode, transferScrollData)
                // currentResize.clonedNode!.scrollTop = currentResize.initialScrollPosition.y
                // currentResize.clonedNode!.scrollLeft = currentResize.initialScrollPosition.x
            }
            if (this.resizeStart.observed) {
                this.zone.run(() => {
                    this.resizeStart.emit({
                        edges: calculateGeometryRectDiffForEdges({
                            edges,
                            initialRect,
                            newRect: initialRect,
                        }),
                        boundingRectangle: transformGeometryRectForEdges(initialRect)
                    })
                })
            }
        })

        const pointerUpSub = pointerUp$.subscribe(() => {
            if (currentResize) {
                this.renderer.removeClass(this.el.nativeElement, RESIZE_ACTIVE_CLASS)
                this.renderer.setStyle(document.body, 'cursor', '')
                this.renderer.setStyle(this.el.nativeElement, 'cursor', '')
                if (this.resizeEnd.observed) {
                    this.zone.run(() => {
                        if (currentResize) {
                            this.resizeEnd.emit({
                                edges: calculateGeometryRectDiffForEdges({
                                    edges: currentResize.edges,
                                    initialRect: currentResize.initialRect,
                                    newRect: currentResize.currentRect
                                }),
                                boundingRectangle: currentResize.currentRect
                            })
                        }
                    })
                }
                removeGhostElement()
                currentResize = null
            }
        })

        this.subscriptions.add(pointerDownSub)
        this.subscriptions.add(pointerDragSub)
        this.subscriptions.add(pointerUpSub)
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.renderer.setStyle(document.body, 'cursor', '')
            this.pointerDown.complete()
            this.pointerUp.complete()
            this.pointerMove.complete()
            this.destroy$.next()
        }
        this.subscriptions.unsubscribe()
    }

    private setElementClass(elm: ElementRef, name: string, add: boolean): void {
        if (add) {
          this.renderer.addClass(elm.nativeElement, name)
        } else {
          this.renderer.removeClass(elm.nativeElement, name)
        }
    }
}