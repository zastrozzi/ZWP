import { Provider } from '@angular/core'
import { MastercardAPIConfig } from '../config'

import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'

export * from './abstract'
export * from './live'
export * from './mock'

export const environmentProviders = (apiConfig: MastercardAPIConfig): Provider[] => [
    
]