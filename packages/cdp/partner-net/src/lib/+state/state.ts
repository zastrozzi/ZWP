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
        createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.ASSET_STATE_FEATURE_KEY),
        Reducers.assetReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.LOCATION_STATE_FEATURE_KEY),
        Reducers.locationReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.PARTNER_ASSET_ASSIGNMENT_STATE_FEATURE_KEY),
        Reducers.partnerAssetAssignmentReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.PARTNER_ENDUSER_SUBSCRIPTION_STATE_FEATURE_KEY),
        Reducers.partnerEnduserSubscriptionReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.PARTNER_TYPE_ASSIGNMENT_STATE_FEATURE_KEY),
        Reducers.partnerTypeAssignmentReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.PARTNER_TYPE_STATE_FEATURE_KEY),
        Reducers.partnerTypeReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.PARTNER_STATE_FEATURE_KEY),
        Reducers.partnerReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.SUBGROUP_ASSET_ASSIGNMENT_STATE_FEATURE_KEY),
        Reducers.subgroupAssetAssignmentReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.SUBGROUP_ENDUSER_SUBSCRIPTION_STATE_FEATURE_KEY),
        Reducers.subgroupEnduserSubscriptionReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.SUBGROUP_STATE_FEATURE_KEY),
        Reducers.subgroupReducer
    ),
    ...Effects.environmentProviders
]