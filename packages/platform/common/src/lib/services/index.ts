import { ZWPColorAdapterService } from './zwp.color-adapter.service'
import { ZWPCryptoService } from './zwp.crypto.service'
import { ZWPDebuggableServiceLogger } from './zwp.debuggable.service'
import { ZWPHTTPService } from './zwp.http.service'
import { ZWPIFrameService } from './zwp.iframe.service'
import { ZWPConsoleLoggingService } from './zwp.logging.service'
import { ZWPPeriodicEventService } from './zwp.periodic-event.service'
import { ZWPPlatformService } from './zwp.platform.service'
import { ZWPPointerEventService } from './zwp.pointer-event.service'
import { ZWPPopupService } from './zwp.popup.service'
import { ZWPScrollingService } from './zwp.scrolling.service'
import { ZWPSelectionService } from './zwp.selection.service'
import { ZWPLocalStorageService, ZWPSessionStorageService } from './zwp.storage.service'
import { ZWPWebSocketService } from './zwp.websocket.service'

export * from './zwp.color-adapter.service'
export * from './zwp.crypto.service'
export * from './zwp.debuggable.service'
export * from './zwp.history.service'
export * from './zwp.http.service'
export * from './zwp.iframe.service'
export * from './zwp.logging.service'
export * from './zwp.periodic-event.service'
export * from './zwp.persistence.service'
export * from './zwp.platform.service'
export * from './zwp.pointer-event.service'
export * from './zwp.popup.service'
export * from './zwp.selection.service'
export * from './zwp.scrolling.service'
export * from './zwp.storage.service'
export * from './zwp.websocket.service'

export const COMMON_EXPORTABLE_SERVICES = [
    ZWPColorAdapterService,
    ZWPConsoleLoggingService,
    ZWPCryptoService,
    ZWPHTTPService,
    ZWPIFrameService,
    ZWPLocalStorageService,
    ZWPPeriodicEventService,
    ZWPPlatformService,
    ZWPPointerEventService,
    ZWPPopupService,
    ZWPScrollingService,
    ZWPSelectionService,
    ZWPSessionStorageService,
    ZWPWebSocketService
]

export const COMMON_INTERNAL_SERVICES = [
    // ZWPDebuggableServiceLogger
]