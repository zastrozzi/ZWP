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
        createNamespacedFeatureKey(Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER, Identifiers.FILE_EXPLORER_STATE_FEATURE_KEY),
        Reducers.fileExplorerReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER, Identifiers.FILE_DATA_STATE_FEATURE_KEY),
        Reducers.fileDataReducer
    ),
    ...Effects.environmentProviders
]