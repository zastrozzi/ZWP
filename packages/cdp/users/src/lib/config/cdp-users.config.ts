import { InjectionToken } from "@angular/core"
import { BaseModuleAPIConfig } from '@zwp/platform.common'

export interface CDPUsersAPIConfig extends BaseModuleAPIConfig {
    remoteBaseUrl: string,
    localBaseUrl: string
}

export const CDP_USERS_API_CONFIG = new InjectionToken<CDPUsersAPIConfig>('cdp.users.api.config')
export const CDP_USERS_API_BASE_URL = new InjectionToken<string>('cdp.users.api.base-url')