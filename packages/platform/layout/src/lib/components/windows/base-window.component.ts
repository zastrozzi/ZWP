import { CdkDragEnd } from "@angular/cdk/drag-drop";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, inject, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { GeometryPoint } from "@zwp/platform.common";
import { ZWPWindowLayoutFacade } from "../../+state/facades";
import { ResizeEvent, WindowEntity } from "../../model";
import { WindowComponent } from './window.component'

@Component({
    selector: 'zwp-base-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ``
})
export abstract class BaseWindowComponent implements OnChanges, AfterViewInit {
    // static initialPosition: WindowPosition = { height: '500px', width: '60vw', left: 'calc(20vw + 0px)', top: 'calc(50vh - 250px)' }
    @Input() windowId!: string
    @ViewChild('windowContent') windowComponent!: WindowComponent
    private changeDetectorRef = inject(ChangeDetectorRef)

    _windowLayoutFacade: ZWPWindowLayoutFacade

    constructor() {
        this._windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    }

    

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(changes, 'got changes')
        if (changes['windowId']) {
            this.windowId = changes['windowId'].currentValue
        }
    }

    ngAfterViewInit() {
        this.initialiseWindowContent()
    }

    onDragStarted() {
        this.focus()
    }

    onDragEnded(event: CdkDragEnd) {
        const dragDistance: GeometryPoint = event.distance
        // console.log('did something yes?', this.component)
        // if (this.id === null) { return }
        // if (this.windowEntity === null) { return }
        this._windowLayoutFacade.updatePositionFromDragDistance(this.windowId, dragDistance)
    }

    onResizeWindow(event: ResizeEvent) {
        // if (this.windowEntity === null) { return }
        this._windowLayoutFacade.updatePositionFromResizeEdges(this.windowId, event.edges)
    }

    minimise() {
        // if (this.windowEntity === null) { return }
        this._windowLayoutFacade.minimiseWindow(this.windowId)
    }

    remove() {
        // if (this.windowEntity === null) { return }
        this._windowLayoutFacade.removeWindow(this.windowId)
    }

    focus() {
        // event.preventDefault()
        // event.stopPropagation()
        // if (this.windowEntity === null) { return }
        // if (this.id === null || this.label === null || this.icon === null || this.color === null || this.isExpanded === null || this.component === null) { return }
        this._windowLayoutFacade.focusWindow(this.windowId)
    }

    private initialiseWindowContent() {
        this.windowComponent.windowId = this.windowId
        this.windowComponent.initialise()
        this.changeDetectorRef.detectChanges()
    }
}