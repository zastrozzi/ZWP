import { InjectionToken } from '@angular/core';

export interface TilloAPIConfig {
    remoteBaseUrl: string,
    localBaseUrl: string,
    apiState: 'live' | 'mock'
}

export const TILLO_API_CONFIG = new InjectionToken<TilloAPIConfig>('rewards-network.tillo.api.config')
export const TILLO_API_BASE_URL = new InjectionToken<string>('rewards-network.tillo.api.base-url')