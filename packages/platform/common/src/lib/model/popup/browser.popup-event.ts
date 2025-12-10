import { Undefinable } from '../types'
import { BrowserPopupEventType } from './browser.popup-event.type'

export interface BrowserPopupEvent {
    type: BrowserPopupEventType
    refId: string
    payload: Undefinable<any>
}