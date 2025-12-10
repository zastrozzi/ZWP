import { Injectable } from "@angular/core";
import { ZWPDebuggableInjectable } from "@zwp/platform.common";
import { select, Store } from "@ngrx/store";
import { PanelDisplayMode, PanelPosition, RightPanelEntity } from "../../model";
import { PanelLayoutActions } from "../actions";
import { PanelLayoutSelectors } from "../selectors";
import { v4 } from 'uuid'
import { Portal, PortalOutlet, TemplatePortal } from "@angular/cdk/portal";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPPanelLayoutFacade', options: { skipMethodDebugger: true } })
export class ZWPPanelLayoutFacade {
    constructor(private store: Store) {
        // super('ZWPPanelLayoutFacade', { skipMethodDebugger: true })
    }
    
    leftPanelOpen$ = this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelOpen))
    leftPanelExpanded$ = this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelExpanded))
    leftPanelCollapsedSize$ = this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelCollapsedSize))
    leftPanelExpandedSize$ = this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelExpandedSize))
    leftPanelDisplayMode$ = this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelDisplayMode))
    leftPanelSize$ = this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelSize))
    leftPanelHasShadow$ = this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelHasShadow))
    leftPanelMouseEvents$ = this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelMouseEvents))
    leftPanelDragHandleExpanded$ = this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelDragHandleExpanded))
    leftPanelClickDismissals$ = this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelClickDismissals))

    rightPanelOpen$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelOpen))
    rightPanelExpanded$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelExpanded))
    rightPanelCollapsedSize$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelCollapsedSize))
    rightPanelExpandedSize$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelExpandedSize))
    rightPanelDisplayMode$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelDisplayMode))
    rightPanelSize$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelSize))
    rightPanelHasShadow$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelHasShadow))
    rightPanelMouseEvents$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelMouseEvents))
    rightPanelDragHandleExpanded$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelDragHandleExpanded))

    bottomPanelOpen$ = this.store.pipe(select(PanelLayoutSelectors.BottomPanelSelectors.selectBottomPanelOpen))
    bottomPanelExpanded$ = this.store.pipe(select(PanelLayoutSelectors.BottomPanelSelectors.selectBottomPanelExpanded))
    bottomPanelCollapsedSize$ = this.store.pipe(select(PanelLayoutSelectors.BottomPanelSelectors.selectBottomPanelCollapsedSize))
    bottomPanelExpandedSize$ = this.store.pipe(select(PanelLayoutSelectors.BottomPanelSelectors.selectBottomPanelExpandedSize))
    bottomPanelDisplayMode$ = this.store.pipe(select(PanelLayoutSelectors.BottomPanelSelectors.selectBottomPanelDisplayMode))
    bottomPanelSize$ = this.store.pipe(select(PanelLayoutSelectors.BottomPanelSelectors.selectBottomPanelSize))
    bottomPanelDragHandleExpanded$ = this.store.pipe(select(PanelLayoutSelectors.BottomPanelSelectors.selectBottomPanelDragHandleExpanded))

    mainPanelMarginLeft$ = this.store.pipe(select(PanelLayoutSelectors.MainPanelSelectors.selectMainPanelMarginLeft))
    mainPanelMarginRight$ = this.store.pipe(select(PanelLayoutSelectors.MainPanelSelectors.selectMainPanelMarginRight))
    mainPanelMarginBottom$ = this.store.pipe(select(PanelLayoutSelectors.MainPanelSelectors.selectMainPanelMarginBottom))
    mainPanelClickDismissals$ = this.store.pipe(select(PanelLayoutSelectors.MainPanelSelectors.selectMainPanelClickDismissals))

    detailPanelSize$ = this.store.pipe(select(PanelLayoutSelectors.DetailPanelSelectors.selectDetailPanelSize))
    detailPanelDragHandleFocused$ = this.store.pipe(select(PanelLayoutSelectors.DetailPanelSelectors.selectDetailPanelDragHandleFocused))

    allRightPanels$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.allRightPanels))
    selectedRightPanelId$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectedRightPanelId))
    selectedRightPanel$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectedRightPanel))
    rightPanelPortal$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectedRightPanelPortal))
    rightPanelCategories$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.rightPanelCategories))
    rightPanelsByCategory$ = this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.rightPanelsByCategory))
    getRightPanelById$ = (id: string) => this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.getRightPanelById(id)))
    
    
    openPanel(panelPosition: PanelPosition): void {
        switch (panelPosition) {
            case PanelPosition.left: return this.store.dispatch(PanelLayoutActions.openLeftPanel())
            case PanelPosition.right: return this.store.dispatch(PanelLayoutActions.openRightPanel())
            case PanelPosition.bottom: return this.store.dispatch(PanelLayoutActions.openBottomPanel())
            default: return
        }
    }

    closePanel(panelPosition: PanelPosition): void {
        switch (panelPosition) {
            case PanelPosition.left: return this.store.dispatch(PanelLayoutActions.closeLeftPanel())
            case PanelPosition.right: return this.store.dispatch(PanelLayoutActions.closeRightPanel())
            case PanelPosition.bottom: return this.store.dispatch(PanelLayoutActions.closeBottomPanel())
            default: return
        }
    }

    togglePanelOpen(panelPosition: PanelPosition): void {
        switch (panelPosition) {
            case PanelPosition.left: return this.store.dispatch(PanelLayoutActions.toggleLeftPanelOpen())
            case PanelPosition.right: return this.store.dispatch(PanelLayoutActions.toggleRightPanelOpen())
            case PanelPosition.bottom: return this.store.dispatch(PanelLayoutActions.toggleBottomPanelOpen())
            default: return
        }
    }

    expandPanel(panelPosition: PanelPosition): void {
        switch (panelPosition) {
            case PanelPosition.left: return this.store.dispatch(PanelLayoutActions.expandLeftPanel())
            case PanelPosition.right: return this.store.dispatch(PanelLayoutActions.expandRightPanel())
            case PanelPosition.bottom: return this.store.dispatch(PanelLayoutActions.expandBottomPanel())
            default: return
        }
    }

    collapsePanel(panelPosition: PanelPosition): void {
        switch (panelPosition) {
            case PanelPosition.left: return this.store.dispatch(PanelLayoutActions.collapseLeftPanel())
            case PanelPosition.right: return this.store.dispatch(PanelLayoutActions.collapseRightPanel())
            case PanelPosition.bottom: return this.store.dispatch(PanelLayoutActions.collapseBottomPanel())
            default: return
        }
    }

    setPanelCollapsedSize(panelPosition: PanelPosition, size: number): void {
        switch (panelPosition) {
            case PanelPosition.left: return this.store.dispatch(PanelLayoutActions.setLeftPanelCollapsedSize({ size }))
            case PanelPosition.right: return this.store.dispatch(PanelLayoutActions.setRightPanelCollapsedSize({ size }))
            case PanelPosition.bottom: return this.store.dispatch(PanelLayoutActions.setBottomPanelCollapsedSize({ size }))
            case PanelPosition.detail: return this.store.dispatch(PanelLayoutActions.setDetailPanelSize({ size }))
            default: return
        }
    }

    setPanelExpandedSize(panelPosition: PanelPosition, size: number): void {
        switch (panelPosition) {
            case PanelPosition.left: return this.store.dispatch(PanelLayoutActions.setLeftPanelExpandedSize({ size }))
            case PanelPosition.right: return this.store.dispatch(PanelLayoutActions.setRightPanelExpandedSize({ size }))
            case PanelPosition.bottom: return this.store.dispatch(PanelLayoutActions.setBottomPanelExpandedSize({ size }))
            case PanelPosition.detail: return this.store.dispatch(PanelLayoutActions.setDetailPanelSize({ size }))
            default: return
        }
    }

    setPanelDisplayMode(panelPosition: PanelPosition, mode: PanelDisplayMode): void {
        switch (panelPosition) {
            case PanelPosition.left: return this.store.dispatch(PanelLayoutActions.setLeftPanelDisplayMode({ mode }))
            case PanelPosition.right: return this.store.dispatch(PanelLayoutActions.setRightPanelDisplayMode({ mode }))
            case PanelPosition.bottom: return this.store.dispatch(PanelLayoutActions.setBottomPanelDisplayMode({ mode }))
            default: return
        }
    }

    focusDragHandle(panelPosition: PanelPosition): void {
        switch (panelPosition) {
            case PanelPosition.left: return this.store.dispatch(PanelLayoutActions.focusLeftPanelDragHandle())
            case PanelPosition.right: return this.store.dispatch(PanelLayoutActions.focusRightPanelDragHandle())
            case PanelPosition.bottom: return this.store.dispatch(PanelLayoutActions.focusBottomPanelDragHandle())
            case PanelPosition.detail: return this.store.dispatch(PanelLayoutActions.focusDetailPanelDragHandle())
            default: return
        }
    }

    defocusDragHandle(panelPosition: PanelPosition): void {
        switch (panelPosition) {
            case PanelPosition.left: return this.store.dispatch(PanelLayoutActions.defocusLeftPanelDragHandle())
            case PanelPosition.right: return this.store.dispatch(PanelLayoutActions.defocusRightPanelDragHandle())
            case PanelPosition.bottom: return this.store.dispatch(PanelLayoutActions.defocusBottomPanelDragHandle())
            case PanelPosition.detail: return this.store.dispatch(PanelLayoutActions.defocusDetailPanelDragHandle())
            default: return
        }
    }

    addRightPanel(newRightPanel: Partial<RightPanelEntity>) {
        if (newRightPanel.componentName === undefined) { throw new Error('Component name must be defined') }
        const fullRightPanel: RightPanelEntity = {
            id: newRightPanel.id ?? v4(), 
            label: newRightPanel.label ?? 'Right Panel', 
            category: newRightPanel.category ?? 'all',
            icon: newRightPanel.icon ?? 'web_asset', 
            color: newRightPanel.color, 
            themeColor: newRightPanel.themeColor ?? 'primary',
            componentName: newRightPanel.componentName,
            data: newRightPanel.data ?? {}
        }
        this.store.dispatch(PanelLayoutActions.createRightPanelRequest({ rightPanelEntity: fullRightPanel }))
    }

    removeRightPanel(rightPanelId: string) {
        this.store.dispatch(PanelLayoutActions.removeRightPanelRequest({ id: rightPanelId }))
    }

    selectRightPanel(rightPanelId: string) {
        this.store.dispatch(PanelLayoutActions.selectRightPanel({ id: rightPanelId }))
    }

    deselectRightPanel() {
        this.store.dispatch(PanelLayoutActions.deselectRightPanel())
    }
}