// import { ZWPApplicationMetadataFacade } from './zwp.application-metadata.facade'
import { ZWPApplicationFacade } from './zwp.application.facade'
import { ZWPHistoryStoreFacade } from './zwp.history-store.facade'
import { ZWPPersistenceProfileFacade } from './zwp.persistence-profile.facade'
import { ZWPRouterFacade } from './zwp.router.facade'
import { ZWPThemingFacade } from './zwp.theming.facade'

export * from './zwp.application.facade'
export * from './zwp.history-store.facade'
export * from './zwp.keyboard.facade'
export * from './zwp.persistence-profile.facade'
export * from './zwp.router.facade'
export * from './zwp.theming.facade'
// export * from './zwp.application-metadata.facade'

export const COMMON_EXPORTABLE_FACADES = [
    ZWPApplicationFacade,
    ZWPHistoryStoreFacade,
    // ZWPKeyboardFacade,
    ZWPRouterFacade,
    ZWPThemingFacade,
    ZWPPersistenceProfileFacade
    // ZWPApplicationMetadataFacade
]