import { Undefinable } from "@zwp/platform.common"
import { ZWPPrivacyModuleCookieBannerConfig } from "./cookie-banner.config"
import { ZWPPrivacyModuleIPLocationAPIProvider } from "./ip-location.api-provider"

export interface ZWPPrivacyModuleRootConfig {
    ipLocationEnabled: boolean
    ipLocationAPIProvider: Undefinable<ZWPPrivacyModuleIPLocationAPIProvider>
    ipInfoApiKey: Undefinable<string>
    ipInfoDBApiKey: Undefinable<string>
    cookieBanner: ZWPPrivacyModuleCookieBannerConfig
}