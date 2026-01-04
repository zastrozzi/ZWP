import { EnvironmentProviders, Provider } from '@angular/core'
import { provideState } from '@ngrx/store'
import { Identifiers } from './identifiers'
import { Reducers } from './reducers'
import { Effects } from './effects'
import { createNamespacedFeatureKey } from '@zwp/platform.common'
import { PlatformDummyDataModuleConfig } from '../config'

export * from './actions'
export * from './facades'
export * from './reducers'
export * from './selectors'
export * from './identifiers'

export const environmentProviders = (config: PlatformDummyDataModuleConfig): (Provider | EnvironmentProviders)[] => [
    ...(config.includeProjectsState
        ? [
              provideState(
                  createNamespacedFeatureKey(
                      Identifiers.PLATFORM_DUMMY_DATA_ACTION_IDENTIFIER,
                      Identifiers.PROJECT_STATE_FEATURE_KEY
                  ),
                  Reducers.projectReducer
              ),
          ]
        : []),
    ...Effects.environmentProviders(config),
]
