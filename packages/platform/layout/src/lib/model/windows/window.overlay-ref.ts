import { OverlayRef } from "@angular/cdk/overlay"
import { ComponentRef } from "@angular/core"

export interface WindowOverlayRef<C> {
    overlayRef?: OverlayRef
    componentRef?: ComponentRef<C>
}