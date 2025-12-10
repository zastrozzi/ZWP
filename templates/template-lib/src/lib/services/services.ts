import { Provider } from '@angular/core'
import { TemplateAPIConfig } from '../config'

import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'

export * from './abstract'
export * from './live'
export * from './mock'

export const environmentProviders = (apiConfig: TemplateAPIConfig): Provider[] => [
    { 
        provide: AbstractServices.TEMPLATE_API_SERVICE,
        useExisting: apiConfig.apiState === 'live' ? LiveServices.TemplateLiveAPIService : MockServices.TemplateMockAPIService
    }
]