import { ComponentRef, inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { isNull, ZWPDebuggableInjectable, Nullable, transformEnum } from '@zwp/platform.common'
import { UtilityDockActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'
import { Overlay, OverlayConfig } from '@angular/cdk/overlay'
import { getZWPUtilityPanelComponent } from '@zwp/platform.layout'
import { ComponentPortal, ComponentType } from '@angular/cdk/portal'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'CDPCommonUtilityDockFacade', options: { skipMethodDebugger: true } })
export class CDPCommonUtilityDockFacade {
    private store = inject(Store)
    private overlay = inject(Overlay)

    private dockPanelOverlayReferences: {[panelType: string]: Model.UtilityDockPanelOverlayRef<any> | null} = {}

    utilityDockPanels$ = this.store.pipe(select(Selectors.UtilityDockSelectors.selectAllUtilityDockPanels))
    anyUtilityDockPanelIsExpanded$ = this.store.pipe(select(Selectors.UtilityDockSelectors.selectAnyUtilityDockPanelIsExpanded))
    utilityDockPanelById$ = (id: string) =>
        this.store.pipe(select(Selectors.UtilityDockSelectors.selectUtilityDockPanelById(id)))
    utilityDockPanel$ = (panelType: Model.UtilityDockPanelType) =>
        this.store.pipe(select(Selectors.UtilityDockSelectors.selectUtilityDockPanel(panelType)))
    utilityDockPanelIsExpanded$ = (panelType: Model.UtilityDockPanelType) =>
        this.store.pipe(select(Selectors.UtilityDockSelectors.selectUtilityDockPanelIsExpanded(panelType)))

    openUtilityDockPanel(panelType: Model.UtilityDockPanelType) {
        return this.store.dispatch(UtilityDockActions.openUtilityDockPanel({ panelType }))
    }

    closeUtilityDockPanel(panelType: Model.UtilityDockPanelType) {
        return this.store.dispatch(UtilityDockActions.closeUtilityDockPanel({ panelType }))
    }

    toggleUtilityDockPanel(panelType: Model.UtilityDockPanelType) {
        return this.store.dispatch(UtilityDockActions.toggleUtilityDockPanel({ panelType }))
    }

    private addUtilityDockPanelOverlay(panelType: Model.UtilityDockPanelType): boolean {
        const existingOverlayRef = this.getUtilityDockPanelOverlay(panelType)
        if (!isNull(existingOverlayRef)) { return false }
        const componentType = getZWPUtilityPanelComponent(transformEnum(panelType, Model.UtilityDockPanelType, Model.UtilityDockPanelTypeComponentType))
        const panelOverlayRef = this.createUtilityDockPanelOverlayRef()
        const attached = this.attachPortalToOverlay(panelOverlayRef, componentType)
        if (attached !== true) { return false }
        this.setUtilityDockPanelOverlayRef(panelType, panelOverlayRef)
        return true
    }

    private removeUtilityDockPanelOverlay(panelType: Model.UtilityDockPanelType) {
        //
    }

    private getUtilityDockPanelOverlay(panelType: Model.UtilityDockPanelType): Nullable<Model.UtilityDockPanelOverlayRef<any>> {
        return this.dockPanelOverlayReferences[panelType] ?? null
    }

    private setUtilityDockPanelOverlayRef(id: string, panelOverlayRef: Model.UtilityDockPanelOverlayRef<any>) {
        this.dockPanelOverlayReferences[id] = panelOverlayRef
    }

    private createUtilityDockPanelOverlayRef(): Model.UtilityDockPanelOverlayRef<any> {
        const overlayConfig = new OverlayConfig({
            hasBackdrop: false,
            // panelClass: 'zwp-window-overlay-panel-shadow',
            width: '400px',
            height: '800px',
            positionStrategy: this.overlay.position().global().bottom('50px').right('50px')
        })

        const newOverlayRef = this.overlay.create(overlayConfig)
        return { overlayRef: newOverlayRef }
    }

    private attachPortalToOverlay<C>(panelOverlayRef: Model.UtilityDockPanelOverlayRef<any>, component: ComponentType<C>): boolean {
        const overlayPortal = new ComponentPortal(component)
        if (panelOverlayRef === undefined) { return false }
        if (panelOverlayRef.overlayRef === undefined) { return false }
        const componentRef: ComponentRef<C> = panelOverlayRef.overlayRef.attach(overlayPortal)
        panelOverlayRef.componentRef = componentRef
        return true
    }
}
