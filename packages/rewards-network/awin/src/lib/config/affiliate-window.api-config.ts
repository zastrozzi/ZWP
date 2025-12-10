import { InjectionToken } from '@angular/core'
import { BaseModuleAPIConfig } from '@zwp/platform.common'

export interface AffiliateWindowAPIConfig extends BaseModuleAPIConfig {
    remoteBaseUrl: string,
    localBaseUrl: string
}

export const AFFILIATE_WINDOW_API_CONFIG = new InjectionToken<AffiliateWindowAPIConfig>('rewards-network.awin.api.config')
export const AFFILIATE_WINDOW_API_BASE_URL = new InjectionToken<string>('rewards-network.awin.api.base-url')