import { OverlayRef } from "@angular/cdk/overlay"
import { ComponentRef } from "@angular/core"
import { MenuRef } from "./menu.ref"

export interface MenuOverlayRef<C> {
    // parentId?: string
    menuRef?: MenuRef
    overlayRef?: OverlayRef
    componentRef?: ComponentRef<C>
}