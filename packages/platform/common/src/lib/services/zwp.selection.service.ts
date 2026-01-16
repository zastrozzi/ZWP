import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ZWPDebuggableInjectable } from '../decorators'
import { GeometryPoint, GeometryRect, Nilable } from "../model";
import { calculateFixedElementRect, isUndefined, rectContainsPoint } from "../utils";

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPSelectionService', options: { skipMethodDebugger: true } })
export class ZWPSelectionService implements OnDestroy {
    protected _overlayElement: HTMLElement | undefined
    protected _selectionBoxElement: HTMLElement | undefined
    protected _document: Document

    selectionBoxRect$: BehaviorSubject<Nilable<GeometryRect>> = new BehaviorSubject<Nilable<GeometryRect>>(undefined)

    constructor(@Inject(DOCUMENT) document: any, @Inject(PLATFORM_ID) protected platformId: any) {
        // super('ZWPSelectionService', { skipMethodDebugger: true })
        this._document = document
    }

    ngOnDestroy(): void {
        this._overlayElement?.remove()
        // this.debuggableServiceDestroy()
    }

    getOverlayElement(): HTMLElement {
        if (isUndefined(this._overlayElement)) { 
            // console.log('no overlay element')
            this._createOverlay() 
        }
        return this._overlayElement as HTMLElement
    }

    getOverlayElementRect(): GeometryRect {
        return calculateFixedElementRect(this.getOverlayElement())
    }

    getSelectionBoxElement(): HTMLElement {
        if (isUndefined(this._selectionBoxElement)) { this.createSelectionBox({width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0}, {x: 0, y: 0}) }
        return this._selectionBoxElement as HTMLElement
    }

    getSelectionBoxElementRect(): GeometryRect {
        return calculateFixedElementRect(this.getSelectionBoxElement())
    }

    createSelectionBox(containerRect: GeometryRect, point: GeometryPoint): void {
        if (!isUndefined(this._selectionBoxElement)) { this.removeSelectionBox() }
        if (!rectContainsPoint(containerRect, point)) { return }
        const selectionBoxClass = 'zwp-selection-box'
        const selectionBox = this._document.createElement('div')
        const overlayBoundingRect = this.getOverlayElement().getBoundingClientRect()
        selectionBox.classList.add(selectionBoxClass)
        selectionBox.style.setProperty('position', 'fixed')
        selectionBox.style.setProperty('top', `${point.y}px`)
        selectionBox.style.setProperty('bottom', `${overlayBoundingRect.bottom - point.y}px`)
        selectionBox.style.setProperty('left', `${point.x}px`)
        selectionBox.style.setProperty('right', `${overlayBoundingRect.right - point.x}px`)
        selectionBox.style.setProperty('user-select', 'none')
        selectionBox.style.setProperty('-webkit-user-select', 'none')
        // selectionBox.style.setProperty('width', '100%')
        // selectionBox.style.setProperty('height', '100%')
        selectionBox.style.setProperty('border', 'solid 1px #007aff88')
        selectionBox.style.setProperty('background-color', '#007aff22')
        this.getOverlayElement().appendChild(selectionBox)
        this._selectionBoxElement = selectionBox
        this.selectionBoxRect$.next(this.getSelectionBoxElementRect())
    }

    updateSelectionBox(containerRect: GeometryRect, initialPoint: GeometryPoint, point: GeometryPoint): void {
        if (isUndefined(this._selectionBoxElement)) { return }
        if (!rectContainsPoint(containerRect, point)) { return }
        const overlayRect = this.getOverlayElementRect()
        const selectionBoxRect = this.getSelectionBoxElementRect()
        if (point.x < selectionBoxRect.left || (point.x > selectionBoxRect.left && point.x < selectionBoxRect.right && point.x < initialPoint.x)) { 
            this._selectionBoxElement.style.setProperty('left', `${point.x}px`)
        }
        if (point.x > selectionBoxRect.right || (point.x > selectionBoxRect.left && point.x < selectionBoxRect.right && point.x > initialPoint.x)) { 
            this._selectionBoxElement.style.setProperty('right', `${overlayRect.right - point.x}px`)
        }
        if (point.y < selectionBoxRect.top || (point.y > selectionBoxRect.top && point.y < selectionBoxRect.bottom && point.y < initialPoint.y)) { 
            this._selectionBoxElement.style.setProperty('top', `${point.y}px`)
        }
        if (point.y > selectionBoxRect.bottom || (point.y > selectionBoxRect.top && point.y < selectionBoxRect.bottom && point.y > initialPoint.y)) { 
            this._selectionBoxElement.style.setProperty('bottom', `${overlayRect.bottom - point.y}px`)
        }
        this.selectionBoxRect$.next(this.getSelectionBoxElementRect())
        
        
        // if (point.y < selectionBoxRect.top) { 
        //     this._selectionBoxElement.style.setProperty('top', `${point.y}px`)
        //     this._selectionBoxElement.style.setProperty('height', `${selectionBoxRect.height + (selectionBoxRect.top - point.y)}px`)
        // }
        // if (point.y > selectionBoxRect.top && point.y < selectionBoxRect.bottom) { 
        //     this._selectionBoxElement.style.setProperty('bottom', `${point.y}px`)
        //     this._selectionBoxElement.style.setProperty('height', `${selectionBoxRect.height - (selectionBoxRect.bottom - point.y)}px`)
        // }
        // if (point.y > selectionBoxRect.bottom) {
        //     this._selectionBoxElement.style.setProperty('bottom', `${point.y}px`)
        //     this._selectionBoxElement.style.setProperty('height', `${selectionBoxRect.height + (point.y - selectionBoxRect.bottom)}px`)
        // }
    }

    removeSelectionBox(): void {
        this._selectionBoxElement?.remove()
        this.selectionBoxRect$.next(null)
    }

    protected _createOverlay(): void {
        const overlayClass = 'zwp-selection-overlay'

        const overlay = this._document.createElement('div')
        overlay.classList.add(overlayClass)
        overlay.style.setProperty('position', 'fixed')
        // overlay.style.setProperty('text-align', 'start')
        overlay.style.setProperty('z-index', '2000')
        overlay.style.setProperty('pointer-events', 'none')
        overlay.style.setProperty('top', '0')
        overlay.style.setProperty('left', '0')
        overlay.style.setProperty('height', '100%')
        overlay.style.setProperty('width', '100%')
        overlay.style.setProperty('user-select', 'none')
        overlay.style.setProperty('-webkit-user-select', 'none')
        this._document.body.appendChild(overlay)
        this._overlayElement = overlay
    }
}