import { InjectionToken } from '@angular/core'
import { BaseModuleAPIConfig } from '@zwp/platform.common'

export interface CDPPartnerNetAPIConfig extends BaseModuleAPIConfig {
    remoteBaseUrl: string,
    localBaseUrl: string
}

export const CDP_PARTNER_NET_API_CONFIG = new InjectionToken<CDPPartnerNetAPIConfig>('cdp.partner-net.api.config')
export const CDP_PARTNER_NET_API_BASE_URL = new InjectionToken<string>('cdp.partner-net.api.base-url')