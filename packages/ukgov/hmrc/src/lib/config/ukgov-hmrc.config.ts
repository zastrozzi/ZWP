import { InjectionToken } from "@angular/core"
import { BaseModuleAPIConfig } from '@zwp/platform.common'

export interface UKGovHMRCAPIConfig extends BaseModuleAPIConfig {
    remoteBaseUrl: string,
    localBaseUrl: string
}

export const UKGOV_HMRC_API_CONFIG = new InjectionToken<UKGovHMRCAPIConfig>('ukgov.hmrc.api.config')
export const UKGOV_HMRC_API_BASE_URL = new InjectionToken<string>('ukgov.hmrc.api.base-url')