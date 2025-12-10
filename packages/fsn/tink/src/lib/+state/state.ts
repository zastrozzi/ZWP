import { EnvironmentProviders } from '@angular/core'
import { provideState } from '@ngrx/store'
import { Identifiers } from './identifiers'
import { Reducers } from './reducers'
import { Effects } from './effects'
import { createNamespacedFeatureKey } from '@zwp/platform.common'

export * from './actions'
export * from './identifiers'
export * from './reducers'
export * from './selectors'
export * from './facades'
export * from './effects'

export const environmentProviders: EnvironmentProviders[] = [
    provideState(
        createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.ACCOUNT_CONSENT_STATE_FEATURE_KEY),
        Reducers.accountConsentReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.ACCOUNT_STATE_FEATURE_KEY),
        Reducers.accountReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.CREDENTIAL_STATE_FEATURE_KEY),
        Reducers.credentialReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.MERCHANT_STATE_FEATURE_KEY),
        Reducers.merchantReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.PROVIDER_CONSENT_STATE_FEATURE_KEY),
        Reducers.providerConsentReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.PROVIDER_STATE_FEATURE_KEY),
        Reducers.providerReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.TRANSACTION_STATE_FEATURE_KEY),
        Reducers.transactionReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.USER_STATE_FEATURE_KEY),
        Reducers.userReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.WEBHOOK_ENDPOINT_STATE_FEATURE_KEY),
        Reducers.webhookEndpointReducer
    ),

    
    ...Effects.environmentProviders
]
