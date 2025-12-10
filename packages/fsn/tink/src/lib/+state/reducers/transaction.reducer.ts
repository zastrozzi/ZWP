import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { Actions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    decrementRemotePaginationStateTotalConditionally,
    incrementRemotePaginationStateTotal,
    incrementRemotePaginationStateTotalConditionally,
    initialBaseRemoteFeatureState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface TransactionFeatureState extends BaseRemoteFeatureState {
    transactions: EntityState<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>
    selectedTransactionId: Nullable<string>
    transactionsRemotePagination: RemotePaginationState<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>
    filters: Model.Filters.TransactionFilters
}

export const transactionEntityAdapter: EntityAdapter<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse> =
    createEntityAdapter<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>()

export const initialTransactionFeatureState: TransactionFeatureState = {
    ...initialBaseRemoteFeatureState,
    transactions: transactionEntityAdapter.getInitialState(),
    selectedTransactionId: null,
    transactionsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialTransactionFilters,
}

export const transactionReducer = createReducer(
    initialTransactionFeatureState,
    on(Actions.TransactionLocalActions.resetTransactionState, () => initialTransactionFeatureState),
    on(Actions.TransactionLocalActions.initialiseTransactionState, () => initialTransactionFeatureState),
    on(Actions.TransactionLocalActions.updateTransactionFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(Actions.TransactionLocalActions.resetTransactionFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialTransactionFilters,
    })),
    on(Actions.TransactionLocalActions.selectTransaction, (state, { transactionId }) => ({
        ...state,
        selectedTransactionId: transactionId,
    })),
    on(Actions.TransactionLocalActions.deselectTransaction, (state) => ({ ...state, selectedTransactionId: null })),
    on(Actions.TransactionLocalActions.resetPagination, (state) => ({
        ...state,
        transactionsRemotePagination: { ...state.transactionsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(Actions.TransactionRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(Actions.TransactionRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(Actions.TransactionRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(Actions.TransactionRemoteActions.getTransaction.success, (state, { response }) => ({
        ...state,
        transactions: transactionEntityAdapter.setOne(response, state.transactions),
    })),
    on(Actions.TransactionRemoteActions.listTransactions.request, (state, { pagination }) => ({
        ...state,
        transactionsRemotePagination: { ...state.transactionsRemotePagination, ...pagination },
    })),
    on(Actions.TransactionRemoteActions.listTransactions.success, (state, { response }) => ({
        ...state,
        transactions: transactionEntityAdapter.setMany(response.results, state.transactions),
        transactionsRemotePagination: {
            ...state.transactionsRemotePagination,
            total: response.total,
        },
    })),
    on(Actions.TransactionRemoteActions.deleteTransaction.success, (state, { transactionId }) => ({
        ...state,
        transactions: transactionEntityAdapter.removeOne(transactionId, state.transactions),
        transactionsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'transactions',
            remotePaginationStateKey: 'transactionsRemotePagination',
            ids: [transactionId],
        }),
        selectedTransactionId: state.selectedTransactionId === transactionId ? null : state.selectedTransactionId,
    }))
)
