import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import {
    createNamespacedFeatureKey,
    selectFilteredElements,
    selectPaginatedElements,
    selectRemoteState,
} from '@zwp/platform.common'
import { Model } from '../../model'

const selectTransactionState = createFeatureSelector<Reducers.TransactionFeatureState>(
    createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.TRANSACTION_STATE_FEATURE_KEY)
)

const selectTransactionFilters = createSelector(selectTransactionState, (state) => state.filters)
const selectTransactionRemotePagination = createSelector(
    selectTransactionState,
    (state) => state.transactionsRemotePagination
)
const selectTransactionRemoteState = createSelector(selectTransactionState, selectRemoteState)

const selectSelectedTransactionId = createSelector(selectTransactionState, (state) => state.selectedTransactionId)

const transactionEntitySelectors = Reducers.transactionEntityAdapter.getSelectors()
const selectTransactionEntityState = createSelector(selectTransactionState, (state) => state.transactions)
const selectTransactionIds = createSelector(selectTransactionEntityState, transactionEntitySelectors.selectIds)
const selectTransactionEntities = createSelector(
    selectTransactionEntityState,
    transactionEntitySelectors.selectEntities
)
const selectAllTransactions = createSelector(selectTransactionEntityState, transactionEntitySelectors.selectAll)
const selectTransactionTotal = createSelector(selectTransactionEntityState, transactionEntitySelectors.selectTotal)
const selectTransactionById = (id: string) => createSelector(selectTransactionEntities, (entities) => entities[id])

const selectedTransaction = createSelector(
    selectTransactionEntities,
    selectSelectedTransactionId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredTransactions = createSelector(
    selectAllTransactions,
    selectTransactionFilters,
    (transactions, filters) => selectFilteredElements(transactions, filters, Model.Filters.transactionFilterEntityMap)
)

const selectPaginatedTransactions = createSelector(
    selectAllTransactions,
    selectTransactionRemotePagination,
    (transactions, pagination) => selectPaginatedElements(transactions, pagination)
)

const selectPaginatedFilteredTransactions = createSelector(
    selectFilteredTransactions,
    selectTransactionRemotePagination,
    (transactions, pagination) => selectPaginatedElements(transactions, pagination)
)

export const TransactionSelectors = {
    selectTransactionState,
    selectTransactionFilters,
    selectTransactionRemotePagination,
    selectTransactionRemoteState,

    selectSelectedTransactionId,

    transactionEntitySelectors,
    selectTransactionEntityState,
    selectTransactionIds,
    selectTransactionEntities,
    selectAllTransactions,
    selectTransactionTotal,
    selectTransactionById,
    selectedTransaction,

    selectFilteredTransactions,
    selectPaginatedTransactions,
    selectPaginatedFilteredTransactions,
}
