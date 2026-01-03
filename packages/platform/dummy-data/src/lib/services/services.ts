import { EnvironmentProviders, Provider } from '@angular/core'
import { PlatformDummyDataModuleConfig } from '../config'

import * as AbstractServices from './abstract'
import * as MockServices from './mock'
import { PlatformDummyDataService } from './dummy-data.service'

export * from './abstract'
export * from './mock'
export * from './dummy-data.service'

export const environmentProviders = (config: PlatformDummyDataModuleConfig): (Provider | EnvironmentProviders)[] => [
    PlatformDummyDataService,
    ...(config.includeProjectsState ? [
        {
            provide: AbstractServices.PROJECT_API_SERVICE,
            useExisting: MockServices.PlatformDummyDataProjectMockAPIService
        }
    ] : [])
]