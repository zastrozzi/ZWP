import { InjectionToken } from '@angular/core'
import { BaseModuleAPIConfig } from '@zwp/platform.common'

export interface DynamicQueryAPIConfig extends BaseModuleAPIConfig {
    remoteBaseUrl: string,
    localBaseUrl: string
}

export const DYNAMIC_QUERY_API_CONFIG = new InjectionToken<DynamicQueryAPIConfig>('platform.dynamic-query.api.config')
export const DYNAMIC_QUERY_API_BASE_URL = new InjectionToken<string>('platform.dynamic-query.api.base-url')