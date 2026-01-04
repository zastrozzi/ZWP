import { EnvironmentProviders, Provider } from '@angular/core'
import { provideEffects } from '@ngrx/effects'
import { PlatformDummyDataProjectEffects } from './project.effects'
import { PlatformDummyDataModuleConfig } from '../../config'

export const environmentProviders = (config: PlatformDummyDataModuleConfig): (Provider | EnvironmentProviders)[] => [
    ...(config.includeProjectsState ? [provideEffects(PlatformDummyDataProjectEffects)] : []),
]
