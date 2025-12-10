import { InjectionToken } from '@angular/core';

export interface MastercardAPIConfig {
    remoteBaseUrl: string,
    localBaseUrl: string,
    apiState: 'live' | 'mock'
}

export const MASTERCARD_API_CONFIG = new InjectionToken<MastercardAPIConfig>('fsn.mastercard.api.config')
export const MASTERCARD_API_BASE_URL = new InjectionToken<string>('fsn.mastercard.api.base-url')