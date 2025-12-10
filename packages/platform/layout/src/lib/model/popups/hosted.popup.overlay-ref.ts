import { OverlayRef } from "@angular/cdk/overlay"
import { ComponentRef } from "@angular/core"
// import { GeometryBoundingRectangle } from "@zwp/platform.common"
// import { HostedPopupPosition } from "./hosted.popup.position"
import { HostedPopupRef } from "./hosted.popup.ref"

export interface HostedPopupOverlayRef<C> {
    popupRef?: HostedPopupRef
    overlayRef?: OverlayRef
    componentRef?: ComponentRef<C>
}