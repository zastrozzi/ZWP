import { EnvironmentProviders, Provider } from '@angular/core'
import { provideState } from '@ngrx/store'
import { Identifiers } from './identifiers'
import { Reducers } from './reducers'
import { Effects } from './effects'
import {
    _providePersistenceFeature,
    createNamespacedFeatureKey,
    ZWP_NGRX_MODULE_ROOT_CONFIG,
} from '@zwp/platform.common'
import { ZWPFilesModuleRootConfig } from '../config'

export * from './actions'
export * from './facades'
export * from './reducers'
export * from './selectors'
export * from './identifiers'

export const createEnvironmentProviders = (config: ZWPFilesModuleRootConfig): (Provider | EnvironmentProviders)[] => {
    return [
        ...(config.persist ? _providePersistenceFeature(
            createNamespacedFeatureKey(
                Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER,
                Identifiers.FILE_EXPLORER_STATE_FEATURE_KEY
            ),
            Reducers.persistentFileExplorer
        ) : []),
        ...(config.persist ? _providePersistenceFeature(
            createNamespacedFeatureKey(
                Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER,
                Identifiers.FILE_DATA_STATE_FEATURE_KEY
            ),
            Reducers.persistentFileData
        ) : []),
        provideState(
            createNamespacedFeatureKey(
                Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER,
                Identifiers.FILE_EXPLORER_STATE_FEATURE_KEY
            ),
            Reducers.fileExplorerReducer
        ),
        provideState(
            createNamespacedFeatureKey(
                Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER,
                Identifiers.FILE_DATA_STATE_FEATURE_KEY
            ),
            Reducers.fileDataReducer
        ),
        ...Effects.environmentProviders,
    ]
}
