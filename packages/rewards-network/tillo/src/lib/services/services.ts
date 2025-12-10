import { Provider } from '@angular/core'
import { TilloAPIConfig } from '../config'
import { ModuleAPIState } from '@zwp/platform.common'
import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'

export * from './abstract'
export * from './live'
export * from './mock'

export const environmentProviders = (apiConfig: TilloAPIConfig): Provider[] => [
    {
        provide: AbstractServices.BRAND_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TilloBrandLiveAPIService : MockServices.TilloBrandMockAPIService,
    },
    {
        provide: AbstractServices.DIGITAL_CODE_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.TilloDigitalCodeLiveAPIService
                : MockServices.TilloDigitalCodeMockAPIService,
    },

    {
        provide: AbstractServices.FLOAT_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TilloFloatLiveAPIService : MockServices.TilloFloatMockAPIService,
    },

    {
        provide: AbstractServices.STORE_CARD_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TilloStoreCardLiveAPIService : MockServices.TilloStoreCardMockAPIService,
    },
    
    {
        provide: AbstractServices.TRANSACTION_SPREAD_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TilloTransactionSpreadLiveAPIService : MockServices.TilloTransactionSpreadMockAPIService
    }
]
