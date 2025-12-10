import { InjectionToken } from '@angular/core'
import { BaseModuleAPIConfig } from '@zwp/platform.common'

export interface GoogleCloudAPIConfig extends BaseModuleAPIConfig{
    remoteBaseUrl: string,
    localBaseUrl: string
}

export const GOOGLE_CLOUD_API_CONFIG = new InjectionToken<GoogleCloudAPIConfig>('platform.google-cloud.api.config')
export const GOOGLE_CLOUD_API_BASE_URL = new InjectionToken<string>('platform.google-cloud.api.base-url')