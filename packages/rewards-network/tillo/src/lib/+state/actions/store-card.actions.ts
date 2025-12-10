import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, createActionGroup, props } from '@ngrx/store'

const STORE_CARD_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER,
    Identifiers.STORE_CARD_FEATURE_KEY,
]

const updateStoreCardFilters = createAction(
    createActionType(STORE_CARD_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.StoreCardFilters>>()
)

const resetStoreCardFilters = createAction(
    createActionType(STORE_CARD_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetStoreState = createAction(createActionType(STORE_CARD_ACTION_IDENTIFIERS, 'Reset State'))

const initialiseStoreCardState = createAction(createActionType(STORE_CARD_ACTION_IDENTIFIERS, 'Initialise State'))

const selectStoreCard = createAction(
    createActionType(STORE_CARD_ACTION_IDENTIFIERS, 'Select Store Card'),
    props<{ storeCardId: string }>()
)

const deselectStoreCard = createAction(createActionType(STORE_CARD_ACTION_IDENTIFIERS, 'Deselect Store Card'))

const resetPagination = createAction(createActionType(STORE_CARD_ACTION_IDENTIFIERS, 'Reset Pagination'))

const listStoreCards = createRemoteActionGroup<
    {
        brandId: Nullable<string>
        enduserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.StoreCardResponse>>>
    },
    PaginatedResponse<Model.StoreCardResponse>
>('List Store Cards', ...STORE_CARD_ACTION_IDENTIFIERS)

const getStoreCard = createRemoteActionGroup<{ storeCardId: string }, Model.StoreCardResponse>(
    'Get Store Card',
    ...STORE_CARD_ACTION_IDENTIFIERS
)

const updateStoreCard = createRemoteActionGroup<
    { storeCardId: string; update: Model.UpdateStoreCardRequest },
    Model.StoreCardResponse
>('Update Store Card', ...STORE_CARD_ACTION_IDENTIFIERS)

const deleteStoreCard = createRemoteActionGroup<{ storeCardId: string }, { storeCardId: string }>(
    'Delete Store Card',
    ...STORE_CARD_ACTION_IDENTIFIERS
)

const createStoreCard = createRemoteActionGroup<
    { enduserId: string; request: Model.CreateStoreCardRequest },
    Model.StoreCardResponse
>('Create Store Card For Enduser', ...STORE_CARD_ACTION_IDENTIFIERS)

export const StoreCardLocalActions = {
    updateStoreCardFilters,
    resetStoreCardFilters,
    resetStoreState,
    initialiseStoreCardState,
    selectStoreCard,
    deselectStoreCard,
    resetPagination,
}

export const StoreCardRemoteActions = createRemoteActionMap(STORE_CARD_ACTION_IDENTIFIERS, {
    listStoreCards,
    getStoreCard,
    updateStoreCard,
    deleteStoreCard,
    createStoreCard,
})
