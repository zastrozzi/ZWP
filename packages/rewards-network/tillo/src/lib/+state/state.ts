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
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER, Identifiers.BRAND_STATE_FEATURE_KEY),
        Reducers.brandReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER, Identifiers.DIGITAL_CODE_STATE_FEATURE_KEY),
        Reducers.digitalCodeReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER, Identifiers.FLOAT_STATE_FEATURE_KEY),
        Reducers.floatReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER, Identifiers.STORE_CARD_FEATURE_KEY),
        Reducers.storeCardReducer
    ),

    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER, Identifiers.TRANSACTION_SPREAD_FEATURE_KEY),
        Reducers.TransactionSpreadReducer
    ),
    
    ...Effects.environmentProviders
]
