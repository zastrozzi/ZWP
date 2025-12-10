import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    ResetRemoteFiltersWithContext,
    UpdateRemoteFilters,
    UpdateRemoteFiltersWithContext,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.LOYALTY_CARD_SCHEME_BRAND_STATE_FEATURE_KEY,
]

const updateLoyaltyCardSchemeBrandFilters = createAction(
    createActionType(LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.LoyaltyCardSchemeBrandFilters>>()
)

const resetLoyaltyCardSchemeBrandFilters = createAction(
    createActionType(LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)



const resetLoyaltyCardSchemeBrandState = createAction(
    createActionType(LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseLoyaltyCardSchemeBrandState = createAction(
    createActionType(LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectLoyaltyCardSchemeBrand = createAction(
    createActionType(LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS, 'Select LoyaltyCardSchemeBrand'),
    props<{ loyaltyCardSchemeBrandId: string }>()
)

const deselectLoyaltyCardSchemeBrand = createAction(
    createActionType(LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS, 'Deselect LoyaltyCardSchemeBrand')
)

const resetPagination = createAction(createActionType(LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS, 'Reset Pagination'))

const addBrandToLoyaltyCardScheme = createRemoteActionGroup<
    {
        loyaltyCardSchemeId: string
        brandId: string
    },
    Model.LoyaltyCardSchemeBrandResponse
>('Add Brand To LoyaltyCardScheme', ...LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS)

const removeBrandFromLoyaltyCardScheme = createRemoteActionGroup<
    {
        loyaltyCardSchemeId: string
        brandId: string,
        force: boolean
    },
    {
        loyaltyCardSchemeId: string
        brandId: string
    }
>('Remove Brand From LoyaltyCardScheme', ...LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS)

const listLoyaltyCardSchemeBrands = createRemoteActionGroup<
    {
        loyaltyCardSchemeId: Nullable<string>
        brandId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeBrandResponse>>>
    },
    PaginatedResponse<Model.LoyaltyCardSchemeBrandResponse>
>('List LoyaltyCardSchemeBrands', ...LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS)

const getLoyaltyCardSchemeBrand = createRemoteActionGroup<
    {
        loyaltyCardSchemeBrandId: string
    },
    Model.LoyaltyCardSchemeBrandResponse
>('Get LoyaltyCardSchemeBrand', ...LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS)

export const LoyaltyCardSchemeBrandLocalActions = {
    updateLoyaltyCardSchemeBrandFilters,
    resetLoyaltyCardSchemeBrandFilters,
    resetLoyaltyCardSchemeBrandState,
    initialiseLoyaltyCardSchemeBrandState,
    selectLoyaltyCardSchemeBrand,
    deselectLoyaltyCardSchemeBrand,
    resetPagination
}

export const LoyaltyCardSchemeBrandRemoteActions = createRemoteActionMap(
    LOYALTY_CARD_SCHEME_BRAND_ACTION_IDENTIFIERS,
    {
        addBrandToLoyaltyCardScheme,
        removeBrandFromLoyaltyCardScheme,
        listLoyaltyCardSchemeBrands,
        getLoyaltyCardSchemeBrand
    }
)