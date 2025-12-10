import { ComponentType } from "@angular/cdk/portal";
import { Injectable } from "@angular/core";
import { GeometryPoint, ZWPDebuggableInjectable } from "@zwp/platform.common";
import { Store } from "@ngrx/store";
import { MenuPositionHorizontal, MenuPositionVertical } from "../../model/menus/menu.position";
import { MenuRef } from "../../model/menus/menu.ref";
import { ZWPMenuOverlayService } from "../../services/menu-overlay.service";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPMenuLayoutFacade', options: { skipMethodDebugger: true } })
export class ZWPMenuLayoutFacade {
    constructor(private store: Store, private menuOverlayService: ZWPMenuOverlayService) {
        // super('ZWPMenuLayoutFacade', { skipMethodDebugger: true })
    }

    private menuComponentTypes: Set<ComponentType<any>> = new Set<ComponentType<any>>()

    registerMenuComponentTypes(menuTypes: ComponentType<any>[]) {
        menuTypes.forEach(menuType => this.registerMenuComponentType(menuType))
    }

    registerMenuComponentType(menuType: ComponentType<any>) {
        if (!this.menuComponentTypes.has(menuType)) { this.menuComponentTypes.add(menuType) }
    }

    openMenu(menuType: string, triggerPoint: GeometryPoint, horizontalPosition: MenuPositionHorizontal, verticalPosition: MenuPositionVertical, data: any) {
        const menuRef: MenuRef = { componentName: menuType, horizontalPosition, verticalPosition }
        this.menuOverlayService.addMenuOverlay(menuRef, triggerPoint, data)
    }

    closeMenu(id: string) {
        this.menuOverlayService.removeMenuOverlay(id, true)
    }
}