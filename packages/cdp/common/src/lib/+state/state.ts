import { EnvironmentProviders } from '@angular/core'
import { provideState } from '@ngrx/store'
import { Identifiers } from './identifiers'
import { Reducers } from './reducers'
import { Effects } from './effects'
import { createNamespacedFeatureKey } from '@zwp/platform.common'

export * from './actions'
export * from './facades'
export * from './reducers'
export * from './selectors'
export * from './identifiers'

export const environmentProviders: EnvironmentProviders[] = [
    provideState(
        createNamespacedFeatureKey(Identifiers.CDP_COMMON_ACTION_IDENTIFIER, Identifiers.UTILITY_DOCK_STATE_FEATURE_KEY),
        Reducers.utilityDockReducer
    ),
    ...Effects.environmentProviders
]