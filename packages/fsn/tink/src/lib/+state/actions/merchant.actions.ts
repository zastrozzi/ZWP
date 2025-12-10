import { Model } from '../../model'
import {
    DateQueryFilter,
    ZWPISO3166Alpha2,
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
    Identifiers.FSN_TINK_ACTION_IDENTIFIER,
    Identifiers.MERCHANT_STATE_FEATURE_KEY,
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
    { request: Model.ServerAPIModel.Merchant.CreateTinkMerchantRequest },
    Model.ServerAPIModel.Merchant.TinkMerchantResponse
>('Create Merchant', ...MERCHANT_ACTION_IDENTIFIERS)

const getMerchant = createRemoteActionGroup<
    { merchantId: string },
    Model.ServerAPIModel.Merchant.TinkMerchantResponse
>('Get Merchant', ...MERCHANT_ACTION_IDENTIFIERS)

const listMerchants = createRemoteActionGroup<
    {
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Merchant.TinkMerchantResponse>>>
    },
    PaginatedResponse<Model.ServerAPIModel.Merchant.TinkMerchantResponse>
>('List Merchants', ...MERCHANT_ACTION_IDENTIFIERS)

const deleteMerchant = createRemoteActionGroup<
    { merchantId: string },
    { merchantId: string }
>('Delete Merchant', ...MERCHANT_ACTION_IDENTIFIERS)

const refreshMerchants = createRemoteActionGroup<
    { 
       limit: Nullable<number>
    },
    {
        limit: Nullable<number>
    }
>('Refresh Merchants', ...MERCHANT_ACTION_IDENTIFIERS)

export const MerchantLocalActions = {
    updateMerchantFilters,
    resetMerchantFilters,
    resetMerchantState,
    initialiseMerchantState,
    selectMerchant,
    deselectMerchant,
    resetPagination
}

export const MerchantRemoteActions = createRemoteActionMap(
    MERCHANT_ACTION_IDENTIFIERS,
    {
        createMerchant,
        getMerchant,
        listMerchants,
        deleteMerchant,
        refreshMerchants
    }
)