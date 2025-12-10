import { Model } from '../../model'
import {
    DateQueryFilter,
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

const TRANSACTION_ACTION_IDENTIFIERS = [
    Identifiers.FSN_TINK_ACTION_IDENTIFIER,
    Identifiers.TRANSACTION_STATE_FEATURE_KEY,
]

const updateTransactionFilters = createAction(
    createActionType(TRANSACTION_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.TransactionFilters>>()
)

const resetTransactionFilters = createAction(
    createActionType(TRANSACTION_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetTransactionState = createAction(
    createActionType(TRANSACTION_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseTransactionState = createAction(
    createActionType(TRANSACTION_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectTransaction = createAction(
    createActionType(TRANSACTION_ACTION_IDENTIFIERS, 'Select Transaction'),
    props<{ transactionId: string }>()
)

const deselectTransaction = createAction(
    createActionType(TRANSACTION_ACTION_IDENTIFIERS, 'Deselect Transaction')
)

const resetPagination = createAction(
    createActionType(TRANSACTION_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getTransaction = createRemoteActionGroup<
    { transactionId: string },
    Model.ServerAPIModel.Transaction.TinkV2TransactionResponse
>('Get Transaction', ...TRANSACTION_ACTION_IDENTIFIERS)

const listTransactions = createRemoteActionGroup<
    {
        accountId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>>>
    },
    PaginatedResponse<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>
>('List Transactions', ...TRANSACTION_ACTION_IDENTIFIERS)

const deleteTransaction = createRemoteActionGroup<
    { transactionId: string },
    { transactionId: string }
>('Delete Transaction', ...TRANSACTION_ACTION_IDENTIFIERS)

const refreshTransactions = createRemoteActionGroup<
    { 
        accountId: string,
        bookedDate: Nullable<DateQueryFilter>,
        limit: Nullable<number>
    },
    { 
        accountId: string,
        bookedDate: Nullable<DateQueryFilter>,
        limit: Nullable<number>
    }
>('Refresh Transactions', ...TRANSACTION_ACTION_IDENTIFIERS)

export const TransactionLocalActions = {
    updateTransactionFilters,
    resetTransactionFilters,
    resetTransactionState,
    initialiseTransactionState,
    selectTransaction,
    deselectTransaction,
    resetPagination
}

export const TransactionRemoteActions = createRemoteActionMap(
    TRANSACTION_ACTION_IDENTIFIERS,
    {
        getTransaction,
        listTransactions,
        deleteTransaction,
        refreshTransactions
    }
)