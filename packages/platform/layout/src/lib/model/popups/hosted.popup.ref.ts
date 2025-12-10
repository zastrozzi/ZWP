import { HostedPopupPosition } from "./hosted.popup.position"

export interface HostedPopupRef {
    refId?: string
    position: HostedPopupPosition
    componentName: string
}