import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from "@angular/core";
import { ZWPPanelLayoutFacade } from "../../+state/facades";
import { PanelPosition, ResizeEvent } from "../../model";

@Component({
    selector: 'zwp-panel-layout',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <mat-drawer-container fxFlexFill [hasBackdrop]="false" [style.backgroundColor]="'system-background' | zwpColorTheme">
        <mat-drawer 
            position="start"
            [mode]="leftPanelDisplayMode$ | async | materialPanelDisplayMode" 
            [opened]="leftPanelOpen$ | async" 
            [style.width]="(leftPanelSize$ | async) + 'px'"
            [style.borderRightColor]="dividerColor"
            [style.borderRightStyle]="'solid'" 
            [style.borderRightWidth]="'1px'"
            zwpBackgroundColor="system-background"
            disableClose
            zwpResizable
            [enableGhostResize]="true"
            (resizeEnd)="onResizeLeftPanel($event)"
            [class]="(leftPanelHasShadow$ | async) === true ? '' : 'mat-drawer-side'"
            *ngIf="leftPanelMouseEvents$ | async as mouseEvents"
            
        >
            <div [style.zIndex]="10" fxLayout="row" fxFlexFill fxFlex="grow">
                <div fxLayout="column" fxLayoutAlign="start stretch" fxFlex="grow" (mouseenter)="onLeftPanelMouseEnter(mouseEvents.mouseEnter)"
                *ngIf="leftPanelClickDismissals$ | async as leftPanelClickDismissals" 
                (click)="onLeftPanelClick(leftPanelClickDismissals.left)"
                zwpCustomScroll [scrollDirection]="'vertical'" [scrollbarMode]="'custom'"
                >
                    <ng-content select="[leftPanel]"></ng-content>
                </div>
            </div>
            <div 
                [style.zIndex]="11"
                [style.position]="'absolute'"
                [style.height]="'100%'"
                [style.marginLeft]="'calc(100% - 10px)'"
                fxLayout="row" 
                fxFlex="grow"
                fxLayoutAlign="end stretch"
            >
                <div 
                    fxLayout="column"
                    [style.cursor]="(leftPanelDragHandleExpanded$ | async) === true ? 'col-resize' : ''" 
                    [fxFlex]="'10px'"
                    [style.backgroundColor]="(leftPanelDragHandleExpanded$ | async) === true ? panelDragHandleColor : 'transparent'" 
                    (mouseenter)="onLeftPanelDragHandleMouseEnter()" 
                    (mouseout)="onLeftPanelDragHandleMouseOut()"
                    zwpResizeHandle [resizeEdges]="{ right: (leftPanelExpanded$ | async) === true }"
                ></div>  
            </div>
        </mat-drawer>

        <mat-drawer 
            position="end"
            [mode]="rightPanelDisplayMode$ | async | materialPanelDisplayMode" 
            [opened]="rightPanelOpen$ | async" 
            [style.width]="(rightPanelSize$ | async) + 'px'"
            [style.borderLeftColor]="dividerColor"
            [style.borderLeftStyle]="'solid'" 
            [style.borderLeftWidth]="'1px'"
            disableClose
            zwpResizable
            [enableGhostResize]="true"
            (resizeEnd)="onResizeRightPanel($event)"
            [class]="(rightPanelHasShadow$ | async) === true ? '' : 'mat-drawer-side'"
            *ngIf="rightPanelMouseEvents$ | async as mouseEvents"
        >   
            <div [style.zIndex]="10" fxLayout="row" fxFlex="grow">
                <div fxLayout="column" fxLayoutAlign="start stretch" fxFlex="grow" (mouseenter)="onRightPanelMouseEnter(mouseEvents.mouseEnter)">
                    <ng-content select="[rightPanel]"></ng-content>
                </div>
            </div>
            <div [style.zIndex]="11" [style.position]="'absolute'" [style.height]="'100%'" fxLayout="row"  fxFlex="grow">
                <div 
                    fxLayout="column" 
                    [style.cursor]="(rightPanelDragHandleExpanded$ | async) === true ? 'col-resize' : ''" 
                    fxFlex="10px"
                    [style.backgroundColor]="(rightPanelDragHandleExpanded$ | async) === true ? panelDragHandleColor : 'transparent'" 
                    (mouseenter)="onRightPanelDragHandleMouseEnter()" 
                    (mouseout)="onRightPanelDragHandleMouseOut()"
                    zwpResizeHandle [resizeEdges]="{ left: (rightPanelExpanded$ | async) === true }"
                ></div>
            </div>
        </mat-drawer>

        <mat-drawer-content 
            *ngIf="mainPanelClickDismissals$ | async as mainPanelClickDismissals" 
            [style.marginLeft]="(mainPanelMarginLeft$ | async) + 'px'" 
            [style.marginRight]="(mainPanelMarginRight$ | async) + 'px'" 
            (click)="onMainPanelClick(mainPanelClickDismissals)"
        >
            <div fxLayout="column" fxLayoutAlign="start stretch" fxFlexFill >
                <div fxLayout="row" fxFlex="grow" fxLayoutAlign="start start" [style.overflow]="'hidden'">
                    <div fxLayout="column" fxLayoutAlign="start stretch" fxFlexFill>
                        <ng-content select="[mainPanel]"></ng-content>
                    </div>
                </div>
                <div 
                    *ngIf="bottomPanelOpen$ | async" 
                    fxLayout="row" 
                    [fxFlex]="(bottomPanelSize$ | async) + 'px'" 
                    zwpResizable 
                    [style.overflow]="'hidden'"
                    [enableGhostResize]="true" 
                    (resizeEnd)="onResizeBottomPanel($event)"
                >
                    <div fxLayout="column" [style.zIndex]="10" fxFlexFill fxFlex="grow">
                        <div fxLayout="row" fxFlex="grow" fxLayoutAlign="start start" [style.overflow]="'hidden'">
                            <div fxLayout="column" fxFlexFill>
                                <ng-content select="[bottomPanel]"></ng-content>
                            </div>
                        </div>
                    </div>
                    <div fxLayout="column" [style.zIndex]="11" fxFlex="grow" [style.position]="'absolute'" [style.width]="'100%'">
                        <div 
                            fxLayout="row" 
                            fxFlex="10px" 
                            zwpResizeHandle 
                            [resizeEdges]="{ top: (bottomPanelExpanded$ | async) === true }" 
                            [style.borderTopColor]="dividerColor" 
                            [style.borderTopStyle]="'solid'" 
                            [style.borderTopWidth]="'1px'"
                            [style.backgroundColor]="(bottomPanelDragHandleExpanded$ | async) === true ? panelDragHandleColor : 'transparent'"
                            [style.cursor]="(bottomPanelDragHandleExpanded$ | async) === true ? 'row-resize' : ''" 
                            (mouseenter)="onBottomPanelDragHandleMouseEnter()" 
                            (mouseout)="onBottomPanelDragHandleMouseOut()"
                        ></div>
                        
                    </div>
                </div>
            </div>
            
        </mat-drawer-content>
    </mat-drawer-container>
    `
})
export class PanelLayoutComponent {
    @Input() dividerColor = "lightgrey"
    @Input() panelDragHandleColor = "#cccccc88"

    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)

    leftPanelOpen$ = this.panelLayoutFacade.leftPanelOpen$
    leftPanelExpanded$ = this.panelLayoutFacade.leftPanelExpanded$
    leftPanelCollapsedSize$ = this.panelLayoutFacade.leftPanelCollapsedSize$
    leftPanelExpandedSize$ = this.panelLayoutFacade.leftPanelExpandedSize$
    leftPanelDisplayMode$ = this.panelLayoutFacade.leftPanelDisplayMode$
    leftPanelSize$ = this.panelLayoutFacade.leftPanelSize$
    leftPanelHasShadow$ = this.panelLayoutFacade.leftPanelHasShadow$
    leftPanelMouseEvents$ = this.panelLayoutFacade.leftPanelMouseEvents$
    leftPanelDragHandleExpanded$ = this.panelLayoutFacade.leftPanelDragHandleExpanded$

    rightPanelOpen$ = this.panelLayoutFacade.rightPanelOpen$
    rightPanelExpanded$ = this.panelLayoutFacade.rightPanelExpanded$
    rightPanelCollapsedSize$ = this.panelLayoutFacade.rightPanelCollapsedSize$
    rightPanelExpandedSize$ = this.panelLayoutFacade.rightPanelExpandedSize$
    rightPanelDisplayMode$ = this.panelLayoutFacade.rightPanelDisplayMode$
    rightPanelSize$ = this.panelLayoutFacade.rightPanelSize$
    rightPanelHasShadow$ = this.panelLayoutFacade.rightPanelHasShadow$
    rightPanelMouseEvents$ = this.panelLayoutFacade.rightPanelMouseEvents$
    rightPanelDragHandleExpanded$ = this.panelLayoutFacade.rightPanelDragHandleExpanded$

    bottomPanelOpen$ = this.panelLayoutFacade.bottomPanelOpen$
    bottomPanelExpanded$ = this.panelLayoutFacade.bottomPanelExpanded$
    bottomPanelCollapsedSize$ = this.panelLayoutFacade.bottomPanelCollapsedSize$
    bottomPanelExpandedSize$ = this.panelLayoutFacade.bottomPanelExpandedSize$
    bottomPanelDisplayMode$ = this.panelLayoutFacade.bottomPanelDisplayMode$
    bottomPanelSize$ = this.panelLayoutFacade.bottomPanelSize$
    bottomPanelDragHandleExpanded$ = this.panelLayoutFacade.bottomPanelDragHandleExpanded$

    mainPanelMarginLeft$ = this.panelLayoutFacade.mainPanelMarginLeft$
    mainPanelMarginRight$ = this.panelLayoutFacade.mainPanelMarginRight$
    mainPanelMarginBottom$ = this.panelLayoutFacade.mainPanelMarginBottom$
    mainPanelClickDismissals$ = this.panelLayoutFacade.mainPanelClickDismissals$
    
    leftPanelClickDismissals$ = this.panelLayoutFacade.leftPanelClickDismissals$

    openLeftPanel() { this.panelLayoutFacade.openPanel(PanelPosition.left) }
    closeLeftPanel() { this.panelLayoutFacade.closePanel(PanelPosition.left) }
    expandLeftPanel() { this.panelLayoutFacade.expandPanel(PanelPosition.left) }
    collapseLeftPanel() { this.panelLayoutFacade.collapsePanel(PanelPosition.left) }
    toggleLeftPanelOpen() { this.panelLayoutFacade.togglePanelOpen(PanelPosition.left) }

    openRightPanel() { this.panelLayoutFacade.openPanel(PanelPosition.right) }
    closeRightPanel() { this.panelLayoutFacade.closePanel(PanelPosition.right) }
    expandRightPanel() { this.panelLayoutFacade.expandPanel(PanelPosition.right) }
    collapseRightPanel() { this.panelLayoutFacade.collapsePanel(PanelPosition.right) }
    toggleRightPanelOpen() { this.panelLayoutFacade.togglePanelOpen(PanelPosition.right) }

    openBottomPanel() { this.panelLayoutFacade.openPanel(PanelPosition.bottom) }
    closeBottomPanel() { this.panelLayoutFacade.closePanel(PanelPosition.bottom) }
    expandBottomPanel() { this.panelLayoutFacade.expandPanel(PanelPosition.bottom) }
    collapseBottomPanel() { this.panelLayoutFacade.collapsePanel(PanelPosition.bottom) }
    toggleBottomPanelOpen() { this.panelLayoutFacade.togglePanelOpen(PanelPosition.bottom) }

    onResizeLeftPanel(event: ResizeEvent) {
        if (event.boundingRectangle.width !== undefined && event.edges.right && event.edges.right !== 0) {
            this.panelLayoutFacade.setPanelExpandedSize(PanelPosition.left, event.boundingRectangle.width)
        }
    }

    onResizeRightPanel(event: ResizeEvent) {
        if (event.boundingRectangle.width !== undefined && event.edges.left && event.edges.left !== 0) {
            this.panelLayoutFacade.setPanelExpandedSize(PanelPosition.right, event.boundingRectangle.width)
        }
    }

    onResizeBottomPanel(event: ResizeEvent) {
        if (event.boundingRectangle.height !== undefined && event.edges.top && event.edges.top !== 0) {
            this.panelLayoutFacade.setPanelExpandedSize(PanelPosition.bottom, event.boundingRectangle.height)
        }
    }

    onLeftPanelMouseEnter(hasMouseEnter: boolean) { if (hasMouseEnter === true) { this.expandLeftPanel() } }
    onLeftPanelMouseOut(hasMouseOut: boolean) { if (hasMouseOut === true) { this.collapseLeftPanel() } }
    onLeftPanelDragHandleMouseEnter() { this.panelLayoutFacade.focusDragHandle(PanelPosition.left) }
    onLeftPanelDragHandleMouseOut() { this.panelLayoutFacade.defocusDragHandle(PanelPosition.left) }
    onRightPanelMouseEnter(hasMouseEnter: boolean) { if (hasMouseEnter === true) { this.expandRightPanel() } }
    onRightPanelMouseOut(hasMouseOut: boolean) { if (hasMouseOut === true) { this.collapseRightPanel() } }
    onRightPanelDragHandleMouseEnter() { this.panelLayoutFacade.focusDragHandle(PanelPosition.right) }
    onRightPanelDragHandleMouseOut() { this.panelLayoutFacade.defocusDragHandle(PanelPosition.right) }
    onBottomPanelDragHandleMouseEnter() { this.panelLayoutFacade.focusDragHandle(PanelPosition.bottom) }
    onBottomPanelDragHandleMouseOut() { this.panelLayoutFacade.defocusDragHandle(PanelPosition.bottom) }

    onMainPanelClick(mainPanelClickDismissals: {left: boolean, right: boolean, bottom: boolean}) {
        if (mainPanelClickDismissals.left) { this.collapseLeftPanel() }
        if (mainPanelClickDismissals.right) { this.collapseRightPanel() }
        if (mainPanelClickDismissals.bottom) { this.collapseBottomPanel() }
    }

    onLeftPanelClick(panelClickDismissLeftPanel: boolean) {
        if (panelClickDismissLeftPanel) { this.collapseLeftPanel() }
    }
}