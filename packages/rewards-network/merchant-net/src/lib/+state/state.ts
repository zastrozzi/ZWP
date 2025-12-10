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
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.ASSET_STATE_FEATURE_KEY),
        Reducers.assetReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.BRAND_STATE_FEATURE_KEY),
        Reducers.brandReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.CATEGORY_STATE_FEATURE_KEY),
        Reducers.categoryReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.INVOICE_LINE_STATE_FEATURE_KEY),
        Reducers.invoiceReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.INVOICE_PAYMENT_STATE_FEATURE_KEY),
        Reducers.invoicePaymentReducer
    ),
    
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.INVOICE_STATE_FEATURE_KEY),
        Reducers.invoiceReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.LOCATION_STATE_FEATURE_KEY),
        Reducers.locationReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.LOYALTY_CARD_STATE_FEATURE_KEY),
        Reducers.loyaltyCardReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.LOYALTY_CARD_SCHEME_STATE_FEATURE_KEY),
        Reducers.loyaltyCardSchemeReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.LOYALTY_CARD_SCHEME_BRAND_STATE_FEATURE_KEY),
        Reducers.loyaltyCardSchemeBrandReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.MERCHANT_STATE_FEATURE_KEY),
        Reducers.merchantReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.OFFER_LAYOUT_ELEMENT_STATE_FEATURE_KEY),
        Reducers.offerLayoutElementReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.OFFER_LAYOUT_STATE_FEATURE_KEY),
        Reducers.offerLayoutReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.OFFER_STATE_FEATURE_KEY),
        Reducers.offerReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.SECTOR_STATE_FEATURE_KEY),
        Reducers.sectorReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.BRAND_TILLO_BRAND_STATE_FEATURE_KEY),
        Reducers.brandTilloBrandReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER, Identifiers.WEB_LOCATION_STATE_FEATURE_KEY),
        Reducers.webLocationReducer
    ),
    ...Effects.environmentProviders
]