import { ZWPApplicationEffects } from "./application.effects"
import { ZWPHistoryStoreEffects } from "./history-store.effects"
import { ZWPKeyboardEffects } from "./keyboard.effects"
import { ZWPPersistenceProfileEffects } from "./persistence-profile.effects"
import { ZWPPersistenceEffects } from "./persistence.effects"
import { ZWPRouterEffects } from "./router.effects"
import { ZWPThemingEffects } from "./theming.effects"

export const COMMON_INTERNAL_EFFECTS = [
    ZWPPersistenceEffects,
    ZWPThemingEffects,
    ZWPApplicationEffects,
    ZWPPersistenceProfileEffects,
    ZWPRouterEffects,
    ZWPKeyboardEffects,
    ZWPHistoryStoreEffects
]