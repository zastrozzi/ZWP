import { ZWPScrollAxisPosition } from "./zwp.scroll-axis.position"
// import { ZWPScrollAxis } from "./zwp.scroll-options"

export type ZWPScrollEventType = 'scrollUp' | 'scrollDown' | 'scrollLeft' | 'scrollRight'

export interface ZWPScrollEvent {
    type: ZWPScrollEventType
    scrollAxisPosition: ZWPScrollAxisPosition
}