import { ElementRef, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ZWPDebuggableInjectable } from '../decorators'
import { GeometryRect, ZWPScrollAxis, ZWPScrollAxisPosition, ZWPScrollEvent, ZWPScrollToOptions } from "../model";
import { ZWPScrollAxisAlignment } from "../model/scrolling/zwp.scroll-axis.alignment";
import { coerceNumber, isUndefined, rectIntersectsRect } from "../utils";

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPScrollingService', options: { skipMethodDebugger: true } })
export class ZWPScrollingService {

    private scrollHosts = new Map<string, ElementRef>()
    private scrollDestinations = new Map<string, ElementRef>()
    private scrollDestinationsByHost = new Map<string, Set<string>>()
    private scrollIntersectables = new Map<string, ElementRef>()
    private scrollIntersectablesByHost = new Map<string, Set<string>>()
    private scrollIntersectors = new Map<string, ElementRef>()
    private scrollIntersectorsByIntersectable = new Map<string, Set<string>>()

    scrollHostScrolledEvents$ = new Map<string, Observable<ZWPScrollEvent>>()

    constructor() {
        // super('ZWPScrollingService', { skipMethodDebugger: true, includedMethods: [
        //     'registerScrollHost',
        //     'deregisterScrollHost',
        //     'registerScrollDestination',
        //     'deregisterScrollDestination',
        //     'registerScrollIntersectable',
        //     'deregisterScrollIntersectable',
        //     'registerScrollIntersector',
        //     'deregisterScrollIntersector'
        // ] })
    }

    registerScrollHost(host: ElementRef, hostId: string, scrolledEvent$: Observable<ZWPScrollEvent>) {
        const existingHost = this.getScrollHost(hostId)
        if (!isUndefined(existingHost)) { throw new Error(`ZWP ScrollHost '${hostId}' already exists.`) }
        this.scrollHosts.set(hostId, host)
        this.scrollHostScrolledEvents$.set(hostId, scrolledEvent$)
    }

    deregisterScrollHost(id: string) {
        this.scrollHosts.delete(id)
        this.scrollDestinationsByHost.delete(id)
        this.scrollIntersectablesByHost.delete(id)
        this.scrollHostScrolledEvents$.delete(id)
    }

    registerScrollDestination(destination: ElementRef, destinationId: string, hostId: string) {
        const existingDestination = this.scrollDestinations.get(destinationId)
        if (!isUndefined(existingDestination)) { throw new Error(`ZWP ScrollDestination '${destinationId}' already exists.`) }
        const existingHost = this.getScrollHost(hostId)
        if (isUndefined(existingHost)) { throw new Error(`ZWP ScrollHost '${hostId}' does not exist.`) }
        this.scrollDestinations.set(destinationId, destination)
        const destinations = this.scrollDestinationsByHost.get(hostId)
        if (isUndefined(destinations)) {
            this.scrollDestinationsByHost.set(hostId, new Set([destinationId]))
        } else {
            destinations.add(destinationId)
        }
    }

    deregisterScrollDestination(destinationId: string) {
        this.scrollDestinations.delete(destinationId)
        for (const destinations of this.scrollDestinationsByHost.values()) {
            destinations.delete(destinationId)
        }
    }

    registerScrollIntersectable(intersectable: ElementRef, intersectableId: string, hostId: string) {
        const existingIntersectable = this.getScrollIntersectable(intersectableId)
        // const existingHost = this.getScrollHost(hostId)
        // if (isUndefined(existingHost)) { throw new Error(`ZWP ScrollHost '${hostId}' does not exist.`) }
        if (!isUndefined(existingIntersectable)) { throw new Error(`ZWP ScrollIntersectable '${intersectableId}' already exists.`) }
        this.scrollIntersectables.set(intersectableId, intersectable)
        const intersectables = this.scrollIntersectablesByHost.get(hostId)
        if (isUndefined(intersectables)) {
            this.scrollIntersectablesByHost.set(hostId, new Set([intersectableId]))
        } else {
            intersectables.add(intersectableId)
        }
    }
    
    deregisterScrollIntersectable(intersectableId: string) {
        this.scrollIntersectables.delete(intersectableId)
        for (const intersectables of this.scrollIntersectablesByHost.values()) {
            intersectables.delete(intersectableId)
        }
        this.scrollIntersectorsByIntersectable.delete(intersectableId)
    }

    registerScrollIntersector(intersector: ElementRef, intersectorId: string, intersectableId: string) {
        const existingIntersector = this.getScrollIntersector(intersectorId)
        // const existingIntersectable = this.getScrollIntersectable(intersectableId)
        if (!isUndefined(existingIntersector)) { throw new Error(`ZWP ScrollIntersector '${intersectorId}' already exists.`) }
        // if (isUndefined(existingIntersectable)) { throw new Error(`ZWP ScrollIntersectable '${intersectableId}' does not exist.`) }
        this.scrollIntersectors.set(intersectorId, intersector)
        const intersectors = this.scrollIntersectorsByIntersectable.get(intersectableId)
        if (isUndefined(intersectors)) {
            this.scrollIntersectorsByIntersectable.set(intersectableId, new Set([intersectorId]))
        } else {
            intersectors.add(intersectorId)
        }
    }

    deregisterScrollIntersector(intersectorId: string) {
        this.scrollIntersectors.delete(intersectorId)
        for (const intersectors of this.scrollIntersectorsByIntersectable.values()) {
            intersectors.delete(intersectorId)
        }
    }

    scrollToDestination(destinationId: string, options: ZWPScrollToOptions) {
        const destination = this.getScrollDestination(destinationId)
        if (isUndefined(destination)) { throw new Error(`ZWP ScrollDestination '${destinationId}' does not exist.`) }
        const hostId = this.getScrollHostIdForDestination(destinationId)
        const host = this.getScrollHostForDestination(destinationId)
        if (isUndefined(host)) { throw new Error(`ZWP ScrollHost for Destination '${destinationId}' does not exist.`) }
        const isVerticalHost = (host.nativeElement as HTMLElement).hasAttribute('zwpVScroll')
        const isHorizontalHost = (host.nativeElement as HTMLElement).hasAttribute('zwpHScroll')
        if (!isVerticalHost && !isHorizontalHost) { throw new Error(`ZWP ScrollHost '${hostId}' is not scrollable.`) }
        if (isVerticalHost && isHorizontalHost && isUndefined(options.axis)) { throw new Error(`ZWP ScrollDestination '${destinationId}' belongs to ScrollHost '${hostId}' which is both vertical and horizontal scrollable. Calls to scrollToDestination must therefore provide the intended axis.`) }
        if (!isVerticalHost && !isUndefined(options.axis) && options.axis === 'vertical') { throw new Error(`ZWP ScrollDestination '${destinationId}' belongs to ScrollHost '${hostId}' which is not vertical scrollable.`) }
        if (!isHorizontalHost && !isUndefined(options.axis) && options.axis === 'horizontal') { throw new Error(`ZWP ScrollDestination '${destinationId}' belongs to ScrollHost '${hostId}' which is not horizontal scrollable.`) }
        const scrollAxis = isUndefined(options.axis) ? isVerticalHost ? 'vertical' : 'horizontal' : options.axis
        const destinationGeometryRect = this.getGeometryRect(destination)
        const hostGeometryRect = this.getGeometryRect(host)
        const scrollAlignment = isUndefined(options.alignment) ? 'start' : options.alignment
        const hostCurrentScrollY = this.getScrollHostCurrentScrollY(host)
        const hostCurrentScrollX = this.getScrollHostCurrentScrollX(host)
        const hostNewOffset = this.calculateNewScrollOffset(
            scrollAxis,
            scrollAlignment, 
            destinationGeometryRect, 
            hostGeometryRect, 
            scrollAxis === 'vertical' ? hostCurrentScrollY : hostCurrentScrollX, 
            scrollAxis === 'vertical' ? coerceNumber(options.offset?.top, 0) : coerceNumber(options.offset?.left, 0), 
            scrollAxis === 'vertical' ? coerceNumber(options.offset?.bottom, 0) : coerceNumber(options.offset?.right, 0)
        )

        // const hostNewY = Math.max(0, destinationGeometryRect.top + hostCurrentY)
        // const hostNewX = Math.max(0, destinationGeometryRect.left + hostCurrentX)
        // this.debug('scrollToDestination', { destinationId, options, destination, host, destinationGeometryRect, hostCurrentY, hostCurrentX, hostNewY, hostNewX })
        const nativeElement: HTMLElement = host.nativeElement
        nativeElement.scrollTo({
            top: scrollAxis === 'vertical' ? hostNewOffset : undefined,
            left: scrollAxis === 'horizontal' ? hostNewOffset : undefined,
            behavior: options.behavior ?? 'smooth'
        })
    }

    hasScrollDestination(destinationId: string): boolean {
        return this.scrollDestinations.has(destinationId)
    }

    getScrollHostAxisPosition(hostId: string, axis?: ZWPScrollAxis): ZWPScrollAxisPosition {
        const host = this.getScrollHost(hostId)
        if (isUndefined(host)) { throw new Error(`ZWP ScrollHost '${hostId}' does not exist.`) }
        const isVerticalHost = (host.nativeElement as HTMLElement).hasAttribute('zwpVScroll')
        const isHorizontalHost = (host.nativeElement as HTMLElement).hasAttribute('zwpHScroll')
        if (!isVerticalHost && !isHorizontalHost) { throw new Error(`ZWP ScrollHost '${hostId}' is not scrollable.`) }
        if (isVerticalHost && isHorizontalHost && isUndefined(axis)) { throw new Error(`ZWP ScrollHost '${hostId}' is both vertical and horizontal scrollable. Calls to getScrollHostAxisPosition must therefore provide the intended axis.`) }
        if (!isVerticalHost && !isUndefined(axis) && axis === 'vertical') { throw new Error(`ZWP ScrollHost '${hostId}' is not vertical scrollable.`) }
        if (!isHorizontalHost && !isUndefined(axis) && axis === 'horizontal') { throw new Error(`ZWP ScrollHost '${hostId}' is not horizontal scrollable.`) }
        const scrollAxis = isUndefined(axis) ? isVerticalHost ? 'vertical' : 'horizontal' : axis
        return { axis: scrollAxis, position: scrollAxis === 'vertical' ? this.getScrollHostCurrentScrollY(host) : this.getScrollHostCurrentScrollX(host) }
    }

    getCurrentScrollIntersectorIdsForIntersectable(intersectableId: string): string[] {
        const intersectable = this.getScrollIntersectable(intersectableId)
        if (isUndefined(intersectable)) { return [] }
        const intersectableRect = this.getGeometryRect(intersectable)
        const intersectors = this.getAllScrollIntersectorsForIntersectable(intersectableId)
        if (intersectors.length === 0) { return [] }
        return intersectors.filter(intersector => {
            const intersectorRect = this.getGeometryRect(intersector.intersectorRef)
            return rectIntersectsRect(intersectorRect, intersectableRect)
        }).map(intersector => intersector.id)
    }

    getScrollHost(hostId: string): ElementRef<any> | undefined {
        return this.scrollHosts.get(hostId)
    }

    getScrollHostScrolledEvents(hostId: string): Observable<ZWPScrollEvent> | undefined {
        return this.scrollHostScrolledEvents$.get(hostId)
    }

    private getScrollDestination(destinationId: string): ElementRef<any> | undefined {
        return this.scrollDestinations.get(destinationId)
    }

    private getScrollIntersectable(intersectableId: string): ElementRef<any> | undefined {
        return this.scrollIntersectables.get(intersectableId)
    }

    private getScrollIntersector(intersectorId: string): ElementRef<any> | undefined {
        return this.scrollIntersectors.get(intersectorId)
    }

    private getScrollHostIdForDestination(destinationId: string): string | undefined {
        for (const [hostId, destinations] of this.scrollDestinationsByHost.entries()) {
            if (destinations.has(destinationId)) { return hostId }
        }
        return undefined
    }

    private getScrollHostForDestination(destinationId: string): ElementRef<any> | undefined {
        const hostId = this.getScrollHostIdForDestination(destinationId)
        if (isUndefined(hostId)) { return undefined }
        return this.getScrollHost(hostId)
    }

    private getScrollHostIdForIntersectable(intersectableId: string): string | undefined {
        for (const [hostId, intersectables] of this.scrollIntersectablesByHost.entries()) {
            if (intersectables.has(intersectableId)) { return hostId }
        }
        return undefined
    }

    private getScrollHostForIntersectable(intersectableId: string): ElementRef<any> | undefined {
        const hostId = this.getScrollHostIdForIntersectable(intersectableId)
        if (isUndefined(hostId)) { return undefined }
        return this.getScrollHost(hostId)
    }

    private getScrollIntersectableIdsForHost(hostId: string): string[] {
        const intersectables = this.scrollIntersectablesByHost.get(hostId)
        if (isUndefined(intersectables)) { return [] }
        return Array.from(intersectables)
    }

    private getAllScrollIntersectorsForIntersectable(intersectableId: string): {id: string, intersectorRef: ElementRef<any>}[] {
        const intersectorIds = this.scrollIntersectorsByIntersectable.get(intersectableId)
        if (isUndefined(intersectorIds)) { return [] }
        return Array.from(intersectorIds.values()).compactMap(id => {
            const intersectorRef = this.getScrollIntersector(id)
            if (isUndefined(intersectorRef)) { return undefined }
            return { id, intersectorRef }
        })
    }

    private getScrollHostCurrentScrollY(host: ElementRef): number {
        return (host.nativeElement as HTMLElement).scrollTop
    }

    private getScrollHostCurrentScrollX(host: ElementRef): number {
        return (host.nativeElement as HTMLElement).scrollLeft
    }

    private getGeometryRect(element: ElementRef): GeometryRect {
        return (element.nativeElement as HTMLElement).getBoundingClientRect()
    }

    private calculateNewScrollOffset(axis: ZWPScrollAxis, alignment: ZWPScrollAxisAlignment, destinationRect: GeometryRect, hostRect: GeometryRect, currentHostScroll: number, startOffset: number, endOffset: number): number {
        const hostRectStart = axis === 'vertical' ? hostRect.top : hostRect.left
        const hostRectEnd = axis === 'vertical' ? hostRect.bottom : hostRect.right
        const destinationRectStart = axis === 'vertical' ? destinationRect.top : destinationRect.left
        const destinationRectEnd = axis === 'vertical' ? destinationRect.bottom : destinationRect.right
        const hostRectLength = axis === 'vertical' ? hostRect.height : hostRect.width
        const destinationRectLength = axis === 'vertical' ? destinationRect.height : destinationRect.width

        if (alignment === 'nearest') {
            const destinationRectIntersectsHostRect = rectIntersectsRect(destinationRect, hostRect)
            const closestEdge = destinationRectIntersectsHostRect ? (Math.abs(destinationRectStart - hostRectStart) < Math.abs(destinationRectEnd - hostRectEnd) ? 'start' : 'end') : (destinationRectStart < hostRectStart ? 'start' : 'end')
            return closestEdge === 'start' ? (destinationRectStart - hostRectStart + currentHostScroll + startOffset) : (destinationRectStart - hostRectStart + currentHostScroll + hostRectLength - destinationRectLength - endOffset)
        }
        
        switch (alignment) {
            case 'start':
                return destinationRectStart - hostRectStart + currentHostScroll + startOffset
            case 'center':
                return destinationRectStart - hostRectStart + currentHostScroll + startOffset - (hostRectLength / 2) + (destinationRectLength / 2) 
                // return destinationRectStart - hostRectStart + currentHostScroll + (hostRectLength / 2) - (destinationRectLength / 2)
            case 'end':
                return destinationRectEnd - hostRectEnd + currentHostScroll - endOffset
            default:
                throw new Error(`ZWP ScrollTo Alignment '${alignment}' is not supported.`)
        }
    }
}