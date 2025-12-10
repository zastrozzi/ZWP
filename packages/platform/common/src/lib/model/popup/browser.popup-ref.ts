import { GeometryPoint, GeometryRect, GeometrySize } from '../geometry'
import { Undefinable } from '../types'
import { BrowserPopupEvent } from './browser.popup-event'

export interface BrowserPopupRef {
    name: string
    url: string
    position: GeometryRect
    window: Undefinable<Window>
    eventHandler: (popupEvent: BrowserPopupEvent) => void
}