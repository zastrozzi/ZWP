import { InjectionToken } from '@angular/core'
import { BaseModuleAPIConfig } from '@zwp/platform.common'

export interface IdentityAPIConfig extends BaseModuleAPIConfig {
    remoteBaseUrl: string,
    localBaseUrl: string
}

export const IDENTITY_API_CONFIG = new InjectionToken<IdentityAPIConfig>('platform.identity.api.config')
export const IDENTITY_API_BASE_URL = new InjectionToken<string>('platform.identity.api.base-url')