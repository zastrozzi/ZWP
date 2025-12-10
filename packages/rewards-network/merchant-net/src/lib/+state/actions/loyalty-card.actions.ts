import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const LOYALTY_CARD_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.LOYALTY_CARD_STATE_FEATURE_KEY,
]

const updateLoyaltyCardFilters = createAction(
    createActionType(LOYALTY_CARD_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.LoyaltyCardFilters>>()
)

const resetLoyaltyCardFilters = createAction(
    createActionType(LOYALTY_CARD_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetLoyaltyCardState = createAction(createActionType(LOYALTY_CARD_ACTION_IDENTIFIERS, 'Reset State'))

const initialiseLoyaltyCardState = createAction(createActionType(LOYALTY_CARD_ACTION_IDENTIFIERS, 'Initialise State'))

const selectLoyaltyCard = createAction(
    createActionType(LOYALTY_CARD_ACTION_IDENTIFIERS, 'Select LoyaltyCard'),
    props<{ loyaltyCardId: string }>()
)

const deselectLoyaltyCard = createAction(createActionType(LOYALTY_CARD_ACTION_IDENTIFIERS, 'Deselect LoyaltyCard'))

const resetPagination = createAction(createActionType(LOYALTY_CARD_ACTION_IDENTIFIERS, 'Reset Pagination'))

const createLoyaltyCard = createRemoteActionGroup<
    { enduserId: string; request: Model.CreateLoyaltyCardRequest },
    Model.LoyaltyCardResponse
>('Create LoyaltyCard', ...LOYALTY_CARD_ACTION_IDENTIFIERS)

const getLoyaltyCard = createRemoteActionGroup<{ loyaltyCardId: string }, Model.LoyaltyCardResponse>(
    'Get LoyaltyCard',
    ...LOYALTY_CARD_ACTION_IDENTIFIERS
)

const listLoyaltyCards = createRemoteActionGroup<
    {
        parent: {
            cardSchemeId: Nullable<string>
            enduserId: Nullable<string>
            brandId: Nullable<string>,
            merchantId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardResponse>>>
    },
    PaginatedResponse<Model.LoyaltyCardResponse>
>('List LoyaltyCards', ...LOYALTY_CARD_ACTION_IDENTIFIERS)

const updateLoyaltyCard = createRemoteActionGroup<
    { loyaltyCardId: string; update: Model.UpdateLoyaltyCardRequest },
    Model.LoyaltyCardResponse
>('Update LoyaltyCard', ...LOYALTY_CARD_ACTION_IDENTIFIERS)

const deleteLoyaltyCard = createRemoteActionGroup<{ loyaltyCardId: string, force: boolean }, { loyaltyCardId: string }>(
    'Delete LoyaltyCard',
    ...LOYALTY_CARD_ACTION_IDENTIFIERS
)

export const LoyaltyCardLocalActions = {
    updateLoyaltyCardFilters,
    resetLoyaltyCardFilters,
    resetLoyaltyCardState,
    initialiseLoyaltyCardState,
    selectLoyaltyCard,
    deselectLoyaltyCard,
    resetPagination,
}

export const LoyaltyCardRemoteActions = createRemoteActionCRUDMap(LOYALTY_CARD_ACTION_IDENTIFIERS, {
    create: createLoyaltyCard,
    get: getLoyaltyCard,
    list: listLoyaltyCards,
    update: updateLoyaltyCard,
    delete: deleteLoyaltyCard,
})
