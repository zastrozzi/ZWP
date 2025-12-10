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
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.LOYALTY_CARD_SCHEME_STATE_FEATURE_KEY,
]

const updateLoyaltyCardSchemeFilters = createAction(
    createActionType(LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.LoyaltyCardSchemeFilters>>()
)

const resetLoyaltyCardSchemeFilters = createAction(
    createActionType(LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const updateLoyaltyCardSchemeFiltersForPaginatedListComponent = createAction(
    createActionType(LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS, 'Update Filters With Context'),
    props<UpdateRemoteFiltersWithContext<Model.Filters.LoyaltyCardSchemeFilters, Model.LoyaltyCardSchemePaginatedListComponentContext>>()
)

const resetLoyaltyCardSchemeFiltersForPaginatedListComponent = createAction(
    createActionType(LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS, 'Reset Filters With Context'),
    props<ResetRemoteFiltersWithContext<Model.LoyaltyCardSchemePaginatedListComponentContext>>()
)

const resetLoyaltyCardSchemeState = createAction(
    createActionType(LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseLoyaltyCardSchemeState = createAction(
    createActionType(LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectLoyaltyCardScheme = createAction(
    createActionType(LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS, 'Select LoyaltyCardScheme'),
    props<{ loyaltyCardSchemeId: string }>()
)

const deselectLoyaltyCardScheme = createAction(
    createActionType(LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS, 'Deselect LoyaltyCardScheme')
)

const resetPagination = createAction(createActionType(LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS, 'Reset Pagination'))

const createLoyaltyCardScheme = createRemoteActionGroup<
    { merchantId: string; request: Model.CreateLoyaltyCardSchemeRequest },
    Model.LoyaltyCardSchemeResponse
>('Create LoyaltyCardScheme', ...LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS)

const getLoyaltyCardScheme = createRemoteActionGroup<{ loyaltyCardSchemeId: string }, Model.LoyaltyCardSchemeResponse>(
    'Get LoyaltyCardScheme',
    ...LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS
)

const listLoyaltyCardSchemes = createRemoteActionGroup<
    {
        brandId: Nullable<string>,
        merchantId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeResponse>>>
    },
    PaginatedResponse<Model.LoyaltyCardSchemeResponse>
>('List LoyaltyCardSchemes', ...LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS)

const updateLoyaltyCardScheme = createRemoteActionGroup<
    { loyaltyCardSchemeId: string; update: Model.UpdateLoyaltyCardSchemeRequest },
    Model.LoyaltyCardSchemeResponse
>('Update LoyaltyCardScheme', ...LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS)

const deleteLoyaltyCardScheme = createRemoteActionGroup<
    { loyaltyCardSchemeId: string, force: boolean },
    { loyaltyCardSchemeId: string }
>('Delete LoyaltyCardScheme', ...LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS)

export const LoyaltyCardSchemeLocalActions = {
    updateLoyaltyCardSchemeFilters,
    resetLoyaltyCardSchemeFilters,
    updateLoyaltyCardSchemeFiltersForPaginatedListComponent,
    resetLoyaltyCardSchemeFiltersForPaginatedListComponent,
    resetLoyaltyCardSchemeState,
    initialiseLoyaltyCardSchemeState,
    selectLoyaltyCardScheme,
    deselectLoyaltyCardScheme,
    resetPagination,
}

export const LoyaltyCardSchemeRemoteActions = createRemoteActionCRUDMap(LOYALTY_CARD_SCHEME_ACTION_IDENTIFIERS, {
    create: createLoyaltyCardScheme,
    get: getLoyaltyCardScheme,
    list: listLoyaltyCardSchemes,
    update: updateLoyaltyCardScheme,
    delete: deleteLoyaltyCardScheme,
})
