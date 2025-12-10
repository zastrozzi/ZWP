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

const MERCHANT_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.MERCHANT_STATE_FEATURE_KEY
]

const updateMerchantFilters = createAction(
    createActionType(MERCHANT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.MerchantFilters>>()
)

const resetMerchantFilters = createAction(
    createActionType(MERCHANT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetMerchantState = createAction(
    createActionType(MERCHANT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseMerchantState = createAction(
    createActionType(MERCHANT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectMerchant = createAction(
    createActionType(MERCHANT_ACTION_IDENTIFIERS, 'Select Merchant'),
    props<{ merchantId: string }>()
)

const deselectMerchant = createAction(
    createActionType(MERCHANT_ACTION_IDENTIFIERS, 'Deselect Merchant')
)

const resetPagination = createAction(
    createActionType(MERCHANT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createMerchant = createRemoteActionGroup<
    { request: Model.CreateMerchantRequest },
    Model.MerchantResponse
>('Create Merchant', ...MERCHANT_ACTION_IDENTIFIERS)

const getMerchant = createRemoteActionGroup<
    { merchantId: string },
    Model.MerchantResponse
>('Get Merchant', ...MERCHANT_ACTION_IDENTIFIERS)

const listMerchants = createRemoteActionGroup<
    { pagination: Nullable<Partial<PaginatedQueryParams<Model.MerchantResponse>>> },
    PaginatedResponse<Model.MerchantResponse>
>('List Merchants', ...MERCHANT_ACTION_IDENTIFIERS)

const updateMerchant = createRemoteActionGroup<
    { merchantId: string; update: Model.UpdateMerchantRequest },
    Model.MerchantResponse
>('Update Merchant', ...MERCHANT_ACTION_IDENTIFIERS)

const deleteMerchant = createRemoteActionGroup<
    { merchantId: string },
    { merchantId: string }
>('Delete Merchant', ...MERCHANT_ACTION_IDENTIFIERS)

export const MerchantLocalActions = {
    updateMerchantFilters,
    resetMerchantFilters,
    resetMerchantState,
    initialiseMerchantState,
    selectMerchant,
    deselectMerchant,
    resetPagination
}

export const MerchantRemoteActions = createRemoteActionCRUDMap(
    MERCHANT_ACTION_IDENTIFIERS,
    {
        create: createMerchant,
        get: getMerchant,
        list: listMerchants,
        update: updateMerchant,
        delete: deleteMerchant
    }
)