import { ZWPMenuOverlayService } from './menu-overlay.service'
import { ZWPWindowOverlayService } from './window-overlay.service'
import { ZWPSnackbarService } from './snackbar.service'

export * from './window-overlay.service'
export * from './menu-overlay.service'
export * from './snackbar.service'


export const LAYOUT_SERVICES = [
    ZWPWindowOverlayService,
    ZWPMenuOverlayService,
    ZWPSnackbarService
]