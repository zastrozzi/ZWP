import { EnvironmentProviders } from '@angular/core'
import { provideState } from '@ngrx/store'
import { Identifiers } from './identifiers'
import { Reducers } from './reducers'
import { Effects } from './effects'
import { createNamespacedFeatureKey } from '@zwp/platform.common'

export * from './actions'
export * from './effects'
export * from './facades'
export * from './reducers'
export * from './selectors'
export * from './identifiers'

export const environmentProviders: EnvironmentProviders[] = [
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ADMIN_USER_ACTIVITY_STATE_FEATURE_KEY
        ),
        Reducers.adminUserActivityReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ADMIN_USER_CREDENTIAL_STATE_FEATURE_KEY
        ), 
        Reducers.adminUserCredentialReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ADMIN_USER_DEVICE_STATE_FEATURE_KEY
        ), 
        Reducers.adminUserDeviceReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ADMIN_USER_EMAIL_STATE_FEATURE_KEY
        ), 
        Reducers.adminUserEmailReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ADMIN_USER_SESSION_STATE_FEATURE_KEY
        ), 
        Reducers.adminUserSessionReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ADMIN_USER_STATE_FEATURE_KEY
        ), 
        Reducers.adminUserReducer
    ),

    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ENDUSER_ADDRESS_STATE_FEATURE_KEY
        ), 
        Reducers.enduserAddressReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ENDUSER_CREDENTIAL_STATE_FEATURE_KEY
        ), 
        Reducers.enduserCredentialReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ENDUSER_DEVICE_STATE_FEATURE_KEY
        ), 
        Reducers.enduserDeviceReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ENDUSER_EMAIL_STATE_FEATURE_KEY
        ), 
        Reducers.enduserEmailReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ENDUSER_PHONE_STATE_FEATURE_KEY
        ), 
        Reducers.enduserPhoneReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ENDUSER_SESSION_STATE_FEATURE_KEY
        ), 
        Reducers.enduserSessionReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ENDUSER_ACTIVITY_STATE_FEATURE_KEY
        ), 
        Reducers.enduserActivityReducer
    ),
    provideState(
        createNamespacedFeatureKey(
            Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
            Identifiers.ENDUSER_STATE_FEATURE_KEY
        ), 
        Reducers.enduserReducer
    ),
    ...Effects.environmentProviders
]