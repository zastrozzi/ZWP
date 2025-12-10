import { Provider } from '@angular/core'
import { GoogleCloudAPIConfig } from '../config'

import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'
import { ModuleAPIState } from '@zwp/platform.common'

export * from './abstract'
export * from './live'
export * from './mock'

export const environmentProviders = (apiConfig: GoogleCloudAPIConfig): Provider[] => [
    { 
        provide: AbstractServices.STORAGE_BUCKET_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.StorageBucketLiveAPIService : MockServices.StorageBucketMockAPIService
    },
    { 
        provide: AbstractServices.STORAGE_OBJECT_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.StorageObjectLiveAPIService : MockServices.StorageObjectMockAPIService
    }
]