import { EnvironmentProviders, Provider } from '@angular/core'
import { provideEffects } from '@ngrx/effects'
import { PlatformDummyDataProjectEffects } from './project.effects'
import { PlatformDummyDataModuleConfig } from '../../config'
import { PlatformDummyDataDataGenerationEffects } from './data-generation.effects'

export const environmentProviders = (config: PlatformDummyDataModuleConfig): (Provider | EnvironmentProviders)[] => [
    ...(config.includeProjectsState ? [provideEffects(PlatformDummyDataProjectEffects, PlatformDummyDataDataGenerationEffects)] : []),
]
