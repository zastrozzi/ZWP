import { Model } from '../../model';
import {
    
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionGroup,
    createRemoteActionMap
} from '@zwp/platform.common';
import { Identifiers } from '../identifiers';
import { createAction, createActionGroup, props } from '@ngrx/store';

const TRANSACTION_SPREAD_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER,
    Identifiers.TRANSACTION_SPREAD_FEATURE_KEY
]

const updateTransactionSpreadFilters = createAction(
    createActionType(TRANSACTION_SPREAD_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.TransactionSpreadFilters>>()
)

const resetTransactionSpreadFilters = createAction(
    createActionType(TRANSACTION_SPREAD_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetTransactionSpreadState = createAction(
    createActionType(TRANSACTION_SPREAD_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseTransactionSpreadState = createAction(
    createActionType(TRANSACTION_SPREAD_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectTransactionSpread = createAction(
    createActionType(TRANSACTION_SPREAD_ACTION_IDENTIFIERS, 'Select Store Card'),
    props<{ transactionSpreadId: string }>()
)

const deselectTransactionSpread = createAction(
    createActionType(TRANSACTION_SPREAD_ACTION_IDENTIFIERS, 'Deselect Store Card')
)

const resetPagination = createAction(
    createActionType(TRANSACTION_SPREAD_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getTransactionSpread = createRemoteActionGroup<
    { transactionSpreadId: string },
    Model.TransactionSpreadResponse>
    ('Get Transaction Spread', ...TRANSACTION_SPREAD_ACTION_IDENTIFIERS)

const updateTransactionSpread = createRemoteActionGroup<
    { transactionSpreadId: string, update: Model.UpdateTransactionSpreadRequest },
    Model.TransactionSpreadResponse>
    ('Update Transaction Spread', ...TRANSACTION_SPREAD_ACTION_IDENTIFIERS)

const listTransactionSpread = createRemoteActionGroup<
    {pagination: Nullable<Partial<PaginatedQueryParams<Model.TransactionSpreadResponse>>>},
    PaginatedResponse<Model.TransactionSpreadResponse>>
    ('List Transaction Spread', ...TRANSACTION_SPREAD_ACTION_IDENTIFIERS)

const deleteTransactionSpread = createRemoteActionGroup<
    { transactionSpreadId: string },
    { transactionSpreadId: string }>
    ('Delete Transaction Spread', ...TRANSACTION_SPREAD_ACTION_IDENTIFIERS)

const createTransactionSpreadForBrand = createRemoteActionGroup<
    { brandId: string }, Model.TransactionSpreadResponse>
    ('Create Transaction Spread For Brand', ...TRANSACTION_SPREAD_ACTION_IDENTIFIERS)


export const TransactionSpreadLocalActions = {
    updateTransactionSpreadFilters,
    resetTransactionSpreadFilters,
    resetTransactionSpreadState,
    initialiseTransactionSpreadState,
    selectTransactionSpread,
    deselectTransactionSpread,
    resetPagination
}

export const TransactionSpreadRemoteActions = createRemoteActionMap(
    TRANSACTION_SPREAD_ACTION_IDENTIFIERS,
    {
        getTransactionSpread,
        updateTransactionSpread,
        listTransactionSpread,
        deleteTransactionSpread,
        createTransactionSpreadForBrand
    }
)