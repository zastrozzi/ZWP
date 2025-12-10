import { Overlay } from "@angular/cdk/overlay";
import { Injectable } from "@angular/core";
import { ZWPDebuggableInjectable } from "@zwp/platform.common";
import { HostedPopupOverlayRef } from "../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPPopupOverlayService', options: { skipMethodDebugger: true } })
export class ZWPPopupOverlayService {
    constructor(private overlay: Overlay) {
        
    }

    private popupOverlayReferences: {[id: string]: HostedPopupOverlayRef<unknown> | undefined} = {}

    // addPopupOverlay(popupRef: PopupRef, )
}