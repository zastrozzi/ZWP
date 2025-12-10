import { Provider } from '@angular/core'
// import { TemplateAPIConfig } from '../config'

import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'
import { ModuleAPIState } from '@zwp/platform.common'

export * from './abstract'
export * from './live'
export * from './mock'

// export const environmentProviders = (apiConfig: TemplateAPIConfig): Provider[] => [
    // { 
    //     provide: AbstractServices.TEMPLATE_API_SERVICE,
    //     useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TemplateLiveAPIService : MockServices.TemplateMockAPIService
    // }
// ]