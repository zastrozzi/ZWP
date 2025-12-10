import { Overlay, OverlayConfig, ComponentType } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef, Injectable } from "@angular/core";
import { GeometryPoint, isUndefined, ZWPDebuggableInjectable } from "@zwp/platform.common";
import { v4 } from "uuid";
import { getZWPMenuComponent } from "../decorators";
import { MenuOverlayRef } from "../model";
import { MenuPositionHorizontal, MenuPositionVertical } from "../model/menus/menu.position";
import { MenuRef } from "../model/menus/menu.ref";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPMenuOverlayService', options: { skipMethodDebugger: true } })
export class ZWPMenuOverlayService {
    constructor(private overlay: Overlay) {

    }

    private menuOverlayReferences: {[id: string]: MenuOverlayRef<any> | undefined} = {}

    addMenuOverlay(menuRef: MenuRef, triggerPoint: GeometryPoint, data: any) {
        menuRef.refId = v4()
        const newMenuOverlayRef = this.createMenuOverlayRef(triggerPoint, menuRef.horizontalPosition, menuRef.verticalPosition)
        const componentType = getZWPMenuComponent(menuRef.componentName)
        this.attachPortalToOverlay(newMenuOverlayRef, componentType)
        this.attachMenuRefToOverlay(newMenuOverlayRef, menuRef)
        this.setMenuOverlayRef(menuRef.refId, newMenuOverlayRef)
        this.updateComponentData(menuRef.refId, data)
    }

    removeMenuOverlay(id: string, removeParent?: boolean) {
        const menuOverlayRef = this.getMenuOverlayRef(id)
        menuOverlayRef?.componentRef?.destroy()
        menuOverlayRef?.overlayRef?.detach()
        menuOverlayRef?.overlayRef?.dispose()
        this.menuOverlayReferences[id] = undefined
        if (removeParent === true && !isUndefined(menuOverlayRef) && !isUndefined(menuOverlayRef.menuRef) && !isUndefined(menuOverlayRef.menuRef.parentId)) {
            this.removeMenuOverlay(menuOverlayRef.menuRef.parentId, removeParent)
        }
    }

    removeMenuOverlays(ids: string[], removeParent?: boolean) {
        ids.forEach(id => this.removeMenuOverlay(id, removeParent))
    }

    removeAllMenuOverlays() {
        Object.values(this.menuOverlayReferences).forEach((menuOverlayRef) => {
            menuOverlayRef?.componentRef?.destroy()
            menuOverlayRef?.overlayRef?.detach()
            menuOverlayRef?.overlayRef?.dispose()
        })
        this.menuOverlayReferences = {}
    }

    private createMenuOverlayRef(triggerPoint: GeometryPoint, horizontalPosition: MenuPositionHorizontal, verticalPosition: MenuPositionVertical): MenuOverlayRef<any> {
        const overlayConfig = new OverlayConfig({
            hasBackdrop: false,
            panelClass: 'zwp-menu-overlay-panel-shadow',
            // width: position.width,
            // height: position.height,
            positionStrategy: this.overlay.position().flexibleConnectedTo(triggerPoint).withGrowAfterOpen().withPositions([
                {
                    originX: horizontalPosition === 'before' ? 'end' : 'start',
                    overlayX: horizontalPosition === 'before' ? 'end' : 'start',
                    originY: verticalPosition === 'above' ? 'top' : 'bottom',
                    overlayY: verticalPosition === 'below' ? 'top' : 'bottom'
                }
            ])
        })

        const newOverlayRef = this.overlay.create(overlayConfig)
        return { overlayRef: newOverlayRef }
    }

    private attachPortalToOverlay<C>(menuOverlayRef: MenuOverlayRef<any>, component: ComponentType<C>) {
        const overlayPortal = new ComponentPortal(component)
        const componentRef: ComponentRef<C> | undefined = menuOverlayRef?.overlayRef?.attach(overlayPortal)
        menuOverlayRef.componentRef = componentRef
        menuOverlayRef.overlayRef?.hostElement.style.setProperty('z-index', '3000')
    }

    private attachMenuRefToOverlay(menuOverlayRef: MenuOverlayRef<any>, menuRef: MenuRef) {
        menuOverlayRef.menuRef = menuRef
    }

    private getMenuOverlayRef(id: string): MenuOverlayRef<any> | undefined {
        return this.menuOverlayReferences[id]
    }

    private setMenuOverlayRef(id: string, menuOverlayRef: MenuOverlayRef<any>) {
        this.menuOverlayReferences[id] = menuOverlayRef
    }

    updateComponentData(refId: string, data: any) {
        const menuOverlayRef = this.getMenuOverlayRef(refId)
        menuOverlayRef?.componentRef?.setInput('menuOverlayData', data)
        menuOverlayRef?.componentRef?.setInput('menuRef', menuOverlayRef?.menuRef)
        if (!isUndefined(menuOverlayRef)) {
            this.setMenuOverlayRef(refId, menuOverlayRef)
        }
    }
}