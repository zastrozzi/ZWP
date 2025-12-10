import { ZWPMenuLayoutFacade } from './zwp.menu-layout.facade'
import { ZWPPanelLayoutFacade } from './zwp.panel-layout.facade'
import { ZWPPopupLayoutFacade } from './zwp.popup-layout.facade'
import { ZWPWindowLayoutFacade } from './zwp.window-layout.facade'
import { ZWPMainPanelFacade } from './zwp.main-panel.facade'

export * from './zwp.menu-layout.facade'
export * from './zwp.panel-layout.facade'
export * from './zwp.popup-layout.facade'
export * from './zwp.window-layout.facade'
export * from './zwp.main-panel.facade'

export const LAYOUT_FACADES = [
    ZWPMenuLayoutFacade,
    ZWPPanelLayoutFacade,
    ZWPPopupLayoutFacade,
    ZWPWindowLayoutFacade,
    ZWPMainPanelFacade
]