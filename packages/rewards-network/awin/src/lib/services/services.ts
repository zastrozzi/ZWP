import { Provider } from '@angular/core'
import { AffiliateWindowAPIConfig } from '../config'

import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'

export * from './abstract'
export * from './live'
export * from './mock'

export const environmentProviders = (apiConfig: AffiliateWindowAPIConfig): Provider[] => [
    { 
        provide: AbstractServices.AWIN_API_SERVICE,
        useExisting: apiConfig.apiState === 'live' ? LiveServices.AWinLiveAPIService : MockServices.AWinMockAPIService
    }
]