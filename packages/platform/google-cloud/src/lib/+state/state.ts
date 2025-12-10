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
        createNamespacedFeatureKey(Identifiers.PLATFORM_GOOGLE_CLOUD_ACTION_IDENTIFIER, Identifiers.FILE_UPLOAD_STATE_FEATURE_KEY),
        Reducers.fileUploadReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_GOOGLE_CLOUD_ACTION_IDENTIFIER, Identifiers.STORAGE_BUCKET_STATE_FEATURE_KEY),
        Reducers.storageBucketReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_GOOGLE_CLOUD_ACTION_IDENTIFIER, Identifiers.STORAGE_OBJECT_STATE_FEATURE_KEY),
        Reducers.storageObjectReducer
    ),
    ...Effects.environmentProviders
]