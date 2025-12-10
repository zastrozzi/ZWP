import { InjectionToken } from '@angular/core';

export interface TinkAPIConfig {
    remoteBaseUrl: string,
    localBaseUrl: string,
    apiState: 'live' | 'mock'
}

export const TINK_API_CONFIG = new InjectionToken<TinkAPIConfig>('fsn.tink.api.config')
export const TINK_API_BASE_URL = new InjectionToken<string>('fsn.tink.api.base-url')