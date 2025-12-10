import { ComponentType, GlobalPositionStrategy, Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef, Injectable, Injector } from "@angular/core";
import { GeometryEdges, GeometryPoint, isUndefined, ZWPDebuggableInjectable } from "@zwp/platform.common";
import { getZWPWindowComponent, WINDOW_COMPONENT_DATA } from "../decorators";
import { WindowEntity, WindowOverlayRef, WindowPosition, WINDOW_OVERLAY_ZINDEX_CLASSES } from "../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPWindowOverlayService', options: { skipMethodDebugger: true } })
export class ZWPWindowOverlayService {
    constructor(private overlay: Overlay) {
        // super('WindowOverlayService', { 
            // skipMethodDebugger: true
            // includedMethods: ['restoreWindowOverlays']
        //  })
    }

    private windowOverlayReferences: {[id: string]: WindowOverlayRef<any> | undefined} = {}

    addWindowOverlay(newWindow: WindowEntity): boolean {
        if (isUndefined(newWindow)) { return false }
        const existingWindowOverlayRef = this.getWindowOverlayRef(newWindow.id)
        if (existingWindowOverlayRef !== undefined) {
            return this.focusWindowOverlay(newWindow.id)
        } else {
            const newWindowOverlayRef = this.createWindowOverlayRef(newWindow.position)
            const componentType = getZWPWindowComponent(newWindow.componentName)
            // console.log(componentType, 'from get')
            const attached = this.attachPortalToOverlay(newWindowOverlayRef, newWindow.component ?? componentType, newWindow.data)
            if (attached !== true) { return false }
            if (newWindow.isExpanded === false) {
                newWindowOverlayRef.overlayRef?.addPanelClass('zwp-window-overlay-hidden')
            }
            this.setWindowOverlayRef(newWindow.id, newWindowOverlayRef)
            const reordered = this.reorderWindowOverlays(newWindow.id, newWindowOverlayRef)
            const updated = this.updateComponentData(newWindow.id)
            if (updated !== true) { return false }
            if (reordered !== true) { return false }
            return true
        }
    }

    restoreWindowOverlays(windowEntities: WindowEntity[]): boolean {
        let success = true
        windowEntities.forEach((windowEntity) => {
            const added = this.addWindowOverlay(windowEntity)
            if (added === false) { success = false }
        })
        return success
    }

    expandWindowOverlay(windowId: string) {
        const windowOverlayRef = this.getWindowOverlayRef(windowId)
        if (windowOverlayRef === undefined) { return }
        this.updateComponentData(windowId)
        windowOverlayRef.overlayRef?.removePanelClass('zwp-window-overlay-hidden')
        this.setWindowOverlayRef(windowId, windowOverlayRef)
        this.reorderWindowOverlays(windowId, windowOverlayRef)
    }

    focusWindowOverlay(id: string): boolean {
        const windowOverlayRef = this.getWindowOverlayRef(id)
        if (windowOverlayRef === undefined) { return false }
        const reordered = this.reorderWindowOverlays(id, windowOverlayRef)
        return reordered
    }

    minimiseWindowOverlay(windowId: string) {
        const windowOverlayRef = this.getWindowOverlayRef(windowId)
        if (windowOverlayRef === undefined) { return }
        this.updateComponentData(windowId)
        windowOverlayRef.overlayRef?.addPanelClass('zwp-window-overlay-hidden')
        this.setWindowOverlayRef(windowId, windowOverlayRef)
    }

    removeWindowOverlay(id: string) {
        const windowOverlayRef = this.getWindowOverlayRef(id)
        if (windowOverlayRef === undefined) { return }
        windowOverlayRef?.componentRef?.destroy()
        windowOverlayRef.overlayRef?.detach()
        windowOverlayRef.overlayRef?.dispose()
        this.windowOverlayReferences[id] = undefined
    }

    removeAllWindowOverlays() {
        Object.values(this.windowOverlayReferences).forEach((windowOverlayRef) => {
            windowOverlayRef?.componentRef?.destroy()
            windowOverlayRef?.overlayRef?.detach()
            windowOverlayRef?.overlayRef?.dispose()
        })
        this.windowOverlayReferences = {}
    }

    updateWindowOverlayPosition(id: string, position: WindowPosition): boolean {
        const windowOverlayRef = this.getWindowOverlayRef(id)
        if (windowOverlayRef === undefined) { return false }
        if (windowOverlayRef.overlayRef === undefined) { return false }
        const newPositionStrategy = this.generatePositionStrategy(position)
        windowOverlayRef.overlayRef.updatePositionStrategy(newPositionStrategy)
        windowOverlayRef.overlayRef.updateSize({width: position.width, height: position.height})
        windowOverlayRef.overlayRef.updatePosition()
        
        this.setWindowOverlayRef(id, windowOverlayRef)
        return true
    }

    calculateNewWindowOverlayPositionFromDrag(id: string, distance: GeometryPoint): WindowPosition | undefined {
        const windowOverlayRef = this.getWindowOverlayRef(id)
        if (windowOverlayRef === undefined) { return }
        const currentPosition = this.getPositionFromWindowOverlay(windowOverlayRef)
        if (currentPosition === undefined) { return }
        const newPosition = this.generateNewWindowPositionFromDrag(currentPosition, distance)
        return newPosition
    }

    calculateNewWindowOverlayPositionFromResize(id: string, edges: GeometryEdges): WindowPosition | undefined {
        const windowOverlayRef = this.getWindowOverlayRef(id)
        if (windowOverlayRef === undefined) { return }
        const currentPosition = this.getPositionFromWindowOverlay(windowOverlayRef)
        if (currentPosition === undefined) { return }
        const newPosition = this.generateNewWindowPositionFromResize(currentPosition, edges)
        return newPosition
    }

    // updateWindowOverlayPosition(id: string, position: WindowPosition): WindowPosition | undefined {
    //     let windowOverlayRef = this.getWindowOverlayRef(id)
    //     if (windowOverlayRef === undefined) { return }
    //     let currentPosition = this.getPositionFromWindowOverlay(windowOverlayRef)
    //     if (currentPosition === undefined) { return }
    //     let newPosition = this.calculateNewWindowPosition(currentPosition, distance)
    //     let newPositionStrategy = this.generatePositionStrategy(newPosition)
    //     windowOverlayRef.overlayRef?.updatePositionStrategy(newPositionStrategy)
    //     windowOverlayRef.overlayRef?.updatePosition()
    //     this.setWindowOverlayRef(id, windowOverlayRef)
    //     return newPosition
    // }

    private createWindowOverlayRef(position: WindowPosition): WindowOverlayRef<any> {
        const overlayConfig = new OverlayConfig({
            hasBackdrop: false,
            panelClass: 'zwp-window-overlay-panel-shadow',
            width: position.width,
            height: position.height,
            positionStrategy: this.overlay.position().global().left(position.left).top(position.top)
        })

        const newOverlayRef = this.overlay.create(overlayConfig)
        return { overlayRef: newOverlayRef }
    }

    private getWindowOverlayRef(id: string): WindowOverlayRef<any> | undefined {
        return this.windowOverlayReferences[id]
    }

    private setWindowOverlayRef(id: string, windowOverlayRef: WindowOverlayRef<any>) {
        this.windowOverlayReferences[id] = windowOverlayRef
    }

    

    private attachPortalToOverlay<C>(windowOverlayRef: WindowOverlayRef<any>, component: ComponentType<C>, data: object): boolean {
        const overlayPortal = new ComponentPortal(
            component,
            null,
            Injector.create({
                providers: [
                    { provide: WINDOW_COMPONENT_DATA, useValue: data }
                ]
            })
        )
        if (windowOverlayRef === undefined) { return false }
        if (windowOverlayRef.overlayRef === undefined) { return false }
        const componentRef: ComponentRef<C> = windowOverlayRef.overlayRef.attach(overlayPortal)
        windowOverlayRef.componentRef = componentRef
        return true
    }

    updateComponentData(windowId: string): boolean {
        const windowOverlayRef = this.getWindowOverlayRef(windowId)
        if (windowOverlayRef === undefined) { return false }
        if (windowOverlayRef.componentRef === undefined) { return false }
        // windowOverlayRef.componentRef.instance.windowEntity = windowEntity
        windowOverlayRef.componentRef.setInput('windowId', windowId)
        this.setWindowOverlayRef(windowId, windowOverlayRef)
        return true
    }

    getWindowOverlayZIndex(id: string): number {
        const windowOverlayRef = this.getWindowOverlayRef(id)
        
        if (windowOverlayRef === undefined) { return 0 }
        const zIndexClass = windowOverlayRef.overlayRef?.hostElement.classList.toString().split(' ').filter(c => c.startsWith('zwp-window-overlay-zindex-')).map(c => parseInt(c.slice(27)))[0]
        return zIndexClass ?? 0
    }

    getHigherWindowOverlayZIndexClass(current: number): string {
        return `zwp-window-overlay-zindex-${current + 1}`
    }

    getHigherWindowOverlayZIndexClassForId(id: string): string {
        const zIndex = this.getWindowOverlayZIndex(id)
        return this.getHigherWindowOverlayZIndexClass(zIndex)
    }

    normaliseWindowPosition(position: WindowPosition): WindowPosition {
        const topHasCalc = position.top.includes('calc')
        const leftHasCalc = position.left.includes('calc')
        const heightHasCalc = position.height.includes('calc')
        const widthHasCalc = position.width.includes('calc')
        const topHasPercentage = position.top.includes('vh')
        const leftHasPercentage = position.left.includes('vw')
        const heightHasPercentage = position.height.includes('vh')
        const widthHasPercentage = position.width.includes('vw')

        const top = topHasCalc ? position.top : topHasPercentage ? `calc(${position.top} + 0px)` : `calc(0vh + ${position.top})`
        const left = leftHasCalc ? position.left : leftHasPercentage ? `calc(${position.left} + 0px)` : `calc(0vw + ${position.left})`
        const height = heightHasCalc ? position.height : heightHasPercentage ? `calc(${position.height} + 0px)` : `calc(0vh + ${position.height})`
        const width = widthHasCalc ? position.width : widthHasPercentage ? `calc(${position.width} + 0px)` : `calc(0vw + ${position.width})`

        return { top: top, left: left, width: width, height: height }
    }

    private generateNewWindowPositionFromDrag(position: WindowPosition, distance: GeometryPoint): WindowPosition {
        const topOffsetNegative = position.top.includes('-')
        const topOffsetCalc = position.top.split('v')[0]
        const topOffsetStripped = position.top.split('h')[1].replace(' ', '').replace('px)', '').replace('-', '').replace('+', '')
        const topOffsetInt = parseInt(topOffsetStripped)
        const leftOffsetNegative = position.left.includes('-')
        const leftOffsetCalc = position.left.split('v')[0]
        const leftOffsetStripped = position.left.split('w')[1].replace(' ', '').replace('px)', '').replace('-', '').replace('+', '')
        const leftOffsetInt = parseInt(leftOffsetStripped)
        const newTopOffset = ((topOffsetNegative ? -1 : 1) * topOffsetInt) + distance.y
        const newLeftOffset = ((leftOffsetNegative ? -1 : 1) * leftOffsetInt) + distance.x
        const newLeftPosition = `${leftOffsetCalc}vw ${newLeftOffset < 0 ? '-' : '+'} ${Math.abs(newLeftOffset)}px)`
        const newTopPosition = `${topOffsetCalc}vh ${newTopOffset < 0 ? '-' : '+'} ${Math.abs(newTopOffset)}px)`

        return { top: newTopPosition, left: newLeftPosition, width: position.width, height: position.height }
    }

    private generateNewWindowPositionFromResize(position: WindowPosition, edges: GeometryEdges): WindowPosition {
        // let positionStrategy = overlayRef['_positionStrategy'] as GlobalPositionStrategy
        // console.log(positionStrategy, 'position strategy')
        // let topOffset: string = (positionStrategy as any)['_topOffset']
        // let leftOffset: string = (positionStrategy as any)['_xOffset']
        const topOrLeftResize = (edges.left !== undefined && edges.left !== 0) || (edges.top !== undefined && edges.top !== 0)
        const bottomOrRightResize = (edges.bottom !== undefined && edges.bottom !== 0) || (edges.right !== undefined && edges.right !== 0)

        // console.log(position, 'existing position')
        // console.log(edges, 'edges')

        if (topOrLeftResize === true) {
            const topOffsetNegative = position.top.includes('-')
            const topOffsetCalc = position.top.split('v')[0]
            const topOffsetStripped = position.top.split('h')[1].replace(' ', '').replace('px)', '').replace('-', '').replace('+', '')
            const topOffsetInt = parseInt(topOffsetStripped)
            const leftOffsetNegative = position.left.includes('-')
            const leftOffsetCalc = position.left.split('v')[0]
            const leftOffsetStripped = position.left.split('w')[1].replace(' ', '').replace('px)', '').replace('-', '').replace('+', '')
            const leftOffsetInt = parseInt(leftOffsetStripped)
            const newTopOffset = ((topOffsetNegative ? -1 : 1) * topOffsetInt) + (typeof(edges.top) === 'number' ? edges.top : 0)
            const newLeftOffset = ((leftOffsetNegative ? -1 : 1) * leftOffsetInt) + (typeof(edges.left) === 'number' ? edges.left : 0)
            const newLeftPosition = `${leftOffsetCalc}vw ${newLeftOffset < 0 ? '-' : '+'} ${Math.abs(newLeftOffset)}px)`
            const newTopPosition = `${topOffsetCalc}vh ${newTopOffset < 0 ? '-' : '+'} ${Math.abs(newTopOffset)}px)`

            const heightOffsetNegative = position.height.includes('-')
            const heightOffsetCalc = position.height.split('v')[0]
            const heightOffsetHasCalc = heightOffsetCalc.startsWith('c')
            const heightOffsetStripped = position.height.split('h')[1].replace(' ', '').replace('px)', '').replace('-', '').replace('+', '')
            const heightOffsetInt = parseInt(heightOffsetStripped.length > 0 ? heightOffsetStripped : '0')
            const widthOffsetNegative = position.width.includes('-')
            const widthOffsetCalc = position.width.split('v')[0]
            const widthOffsetHasCalc = widthOffsetCalc.startsWith('c')
            const widthOffsetStripped = position.width.split('w')[1].replace(' ', '').replace('px)', '').replace('-', '').replace('+', '')
            const widthOffsetInt = parseInt(widthOffsetStripped.length > 0 ? widthOffsetStripped : '0')
            const newHeightOffset = ((heightOffsetNegative ? -1 : 1) * heightOffsetInt) - (typeof(edges.top) === 'number' ? edges.top : 0)
            const newWidthOffset = ((widthOffsetNegative ? -1 : 1) * widthOffsetInt) - (typeof(edges.left) === 'number' ? edges.left : 0)
            const newHeightPosition = `${heightOffsetHasCalc ? '' : 'calc('}${heightOffsetCalc}vh ${newHeightOffset < 0 ? '-' : '+'} ${Math.abs(newHeightOffset)}px)`
            const newWidthPosition = `${widthOffsetHasCalc ? '' : 'calc('}${widthOffsetCalc}vw ${newWidthOffset < 0 ? '-' : '+'} ${Math.abs(newWidthOffset)}px)`

            const newPosition = { top: newTopPosition, left: newLeftPosition, width: newWidthPosition, height: newHeightPosition }
            // console.log('top or left', newPosition)
            return newPosition
        }

        if (bottomOrRightResize === true) {
            const heightOffsetNegative = position.height.includes('-')
            const heightOffsetCalc = position.height.split('v')[0]
            const heightOffsetHasCalc = heightOffsetCalc.startsWith('c')
            const heightOffsetStripped = position.height.split('h')[1].replace(' ', '').replace('px)', '').replace('-', '').replace('+', '')
            const heightOffsetInt = parseInt(heightOffsetStripped.length > 0 ? heightOffsetStripped : '0')
            const widthOffsetNegative = position.width.includes('-')
            const widthOffsetCalc = position.width.split('v')[0]
            const widthOffsetHasCalc = widthOffsetCalc.startsWith('c')
            const widthOffsetStripped = position.width.split('w')[1].replace(' ', '').replace('px)', '').replace('-', '').replace('+', '')
            const widthOffsetInt = parseInt(widthOffsetStripped.length > 0 ? widthOffsetStripped : '0')
            const newHeightOffset = ((heightOffsetNegative ? -1 : 1) * heightOffsetInt) + (typeof(edges.bottom) === 'number' ? edges.bottom : 0)
            const newWidthOffset = ((widthOffsetNegative ? -1 : 1) * widthOffsetInt) + (typeof(edges.right) === 'number' ? edges.right : 0)
            const newHeightPosition = `${heightOffsetHasCalc ? '' : 'calc('}${heightOffsetCalc}vh ${newHeightOffset < 0 ? '-' : '+'} ${Math.abs(newHeightOffset)}px)`
            const newWidthPosition = `${widthOffsetHasCalc ? '' : 'calc('}${widthOffsetCalc}vw ${newWidthOffset < 0 ? '-' : '+'} ${Math.abs(newWidthOffset)}px)`

            const newPosition = { top: position.top, left: position.left, width: newWidthPosition, height: newHeightPosition }
            // console.log('bottom or right', newPosition)
            return newPosition
        }
        return position
    }

    private generatePositionStrategy(position: WindowPosition): GlobalPositionStrategy {
        const newStrategy = this.overlay.position().global()
            .left(position.left)
            .top(position.top)
        return newStrategy
    }

    private getPositionFromWindowOverlay(windowOverlayRef: WindowOverlayRef<any>): WindowPosition | undefined {
        if (windowOverlayRef.overlayRef === undefined) { return }
        const positionStrategy = windowOverlayRef.overlayRef['_positionStrategy'] as GlobalPositionStrategy
        // console.log(positionStrategy, 'position strategy')
        const topOffset: string = (positionStrategy as any)['_topOffset']
        const leftOffset: string = (positionStrategy as any)['_xOffset']
        const width: string = windowOverlayRef.overlayRef['_config'].width
        const height: string = windowOverlayRef.overlayRef['_config'].height
        return  { top: topOffset, left: leftOffset, width: width, height: height }
    }

    private reorderWindowOverlays(topWindowOverlayRefId: string, newWindowOverlayRef: WindowOverlayRef<any>): boolean {
        const currentWindowOverlayRefs = Object.entries(this.windowOverlayReferences).filter(x => !!x[1]).filter(x => x[0] !== topWindowOverlayRefId).sort((x, y) => { 
            const xZIndex = x[1]?.overlayRef?.hostElement.classList.toString().split(' ').filter(c => c.startsWith('zwp-window-overlay-zindex-')).map(c => parseInt(c.slice(22)))[0]
            const yZIndex = y[1]?.overlayRef?.hostElement.classList.toString().split(' ').filter(c => c.startsWith('zwp-window-overlay-zindex-')).map(c => parseInt(c.slice(22)))[0]
            return (xZIndex ?? 0) - (yZIndex ?? 0)
        })

        currentWindowOverlayRefs.forEach((ref, index) => {
            const windowOverlayRef = ref[1]
            windowOverlayRef?.overlayRef?.hostElement.classList.remove(...WINDOW_OVERLAY_ZINDEX_CLASSES)
            windowOverlayRef?.overlayRef?.hostElement.classList.add(`zwp-window-overlay-zindex-${index}`)
            if (windowOverlayRef === undefined) { return }
            this.setWindowOverlayRef(ref[0], windowOverlayRef)
        })

        if (newWindowOverlayRef.overlayRef === undefined) { return false }

        newWindowOverlayRef.overlayRef.hostElement.classList.remove(...WINDOW_OVERLAY_ZINDEX_CLASSES)
        newWindowOverlayRef.overlayRef.hostElement.classList.add(`zwp-window-overlay-zindex-${currentWindowOverlayRefs.length}`)
        this.setWindowOverlayRef(topWindowOverlayRefId, newWindowOverlayRef)
        return true
    }
}