import { InjectionToken } from '@angular/core'
import { BaseModuleAPIConfig } from '@zwp/platform.common'

export interface MerchantNetAPIConfig extends BaseModuleAPIConfig {
    remoteBaseUrl: string,
    localBaseUrl: string
}

export const MERCHANT_NET_API_CONFIG = new InjectionToken<MerchantNetAPIConfig>('rewards-network.merchant-net.api.config')
export const MERCHANT_NET_API_BASE_URL = new InjectionToken<string>('rewards-network.merchant-net.api.base-url')