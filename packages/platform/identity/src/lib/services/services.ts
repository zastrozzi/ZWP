import { Provider } from '@angular/core'
import { IdentityAPIConfig } from '../config'

import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'
import { ModuleAPIState } from '@zwp/platform.common'

export * from './abstract'
export * from './live'
export * from './mock'

export const environmentProviders = (apiConfig: IdentityAPIConfig): Provider[] => [
    {
        provide: AbstractServices.ADMIN_USER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.PlatformAdminUserLiveAPIService : MockServices.PlatformAdminUserMockAPIService
    },
    {
        provide: AbstractServices.ENDUSER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.PlatformEnduserLiveAPIService : MockServices.PlatformEnduserMockAPIService
    }
]