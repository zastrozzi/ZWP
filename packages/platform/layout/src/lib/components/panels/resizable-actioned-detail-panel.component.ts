import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { ZWPPanelLayoutFacade } from '../../+state/facades'
import { PanelPosition, ResizeEvent } from '../../model'

@Component({
    selector: 'zwp-resizable-actioned-detail-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="row"
            fxFlexFill
            zwpResizable
            [enableGhostResize]="true"
            (resizeEnd)="onResizeDetailPanel($event)"
        >
            <div
                fxLayout="column"
                fxLayoutAlign="space-between stretch"
                [fxFlex]="(detailPanelSize$ | async) + 'px'"
                [style.zIndex]="10"
            >
                <div
                    fxLayout="column"
                    fxFlex="grow"
                    zwpCustomScroll
                    [scrollDirection]="'vertical'"
                    [scrollbarMode]="'custom'"
                >
                    <div
                        fxLayout="column"
                        fxLayoutGap="5px"
                        fxFlex="grow"
                        zwpPadding="5"
                        zwpBackgroundColor="system-background"
                    >
                        <ng-content select="[detail]"></ng-content>
                    </div>
                </div>

                <zwp-divider></zwp-divider>
                <div
                    fxLayout="column"
                    fxLayoutAlign="start stretch"
                    fxFlex="noshrink"
                    fxLayoutGap="5px"
                    zwpPadding="5"
                    zwpCorners="10"
                    zwpMargin="0 5 5 5"
                    zwpBackgroundColor="tertiary-system-background"
                >
                    <span zwpTextStyle="caption2" zwpFontWeight="600" zwpPadding="5 0">Quick Actions</span>
                    <ng-content select="[actions]" fxFlex="noshrink"></ng-content>
                </div>
            </div>
            <div
                [style.zIndex]="11"
                [style.marginLeft]="'calc(-10px)'"
                [style.height]="'100%'"
                fxLayout="row"
                fxFlex="grow"
                fxLayoutAlign="end stretch"
            >
                <div
                    fxLayout="column"
                    [style.cursor]="(detailPanelDragHandleFocused$ | async) === true ? 'col-resize' : ''"
                    [fxFlex]="'10px'"
                    [style.backgroundColor]="
                        (detailPanelDragHandleFocused$ | async) === true ? panelDragHandleColor : 'transparent'
                    "
                    (mouseenter)="onDetailPanelDragHandleMouseEnter()"
                    (mouseout)="onDetailPanelDragHandleMouseOut()"
                    zwpResizeHandle
                    [resizeEdges]="{ right: true }"
                ></div>
            </div>
        </div>
    `,
})
export class ResizableActionedDetailPanelComponent {
    @Input() panelWidth = 300
    @Input() panelResizable = true
    @Input() panelDragHandleColor = '#cccccc88'

    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)

    detailPanelSize$ = this.panelLayoutFacade.detailPanelSize$
    detailPanelDragHandleFocused$ = this.panelLayoutFacade.detailPanelDragHandleFocused$

    onResizeDetailPanel(event: ResizeEvent) {
        if (event.boundingRectangle.width !== undefined && event.edges.right && event.edges.right !== 0) {
            this.panelLayoutFacade.setPanelExpandedSize(PanelPosition.detail, event.boundingRectangle.width)
        }
    }

    resetPanelSize() {
        this.panelLayoutFacade.setPanelExpandedSize(PanelPosition.detail, this.panelWidth)
    }

    onDetailPanelDragHandleMouseEnter() {
        this.panelLayoutFacade.focusDragHandle(PanelPosition.detail)
    }
    onDetailPanelDragHandleMouseOut() {
        this.panelLayoutFacade.defocusDragHandle(PanelPosition.detail)
    }
}
