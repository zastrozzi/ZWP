import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import {
    selectRemoteState,
    createNamespacedFeatureKey,
    selectPaginatedElements,
    selectFilteredElements,
} from '@zwp/platform.common'
import { Model } from '../../model'
import { BrandSelectors } from './brand.selectors'

const selectTransactionSpreadState = createFeatureSelector<Reducers.TransactionSpreadFeatureState> (
    createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER, Identifiers.TRANSACTION_SPREAD_FEATURE_KEY)
)

const selectTransactionSpreadFilters = createSelector(selectTransactionSpreadState, (state) => state.filters)
const selectTransactionSpreadRemotePagination = createSelector(selectTransactionSpreadState, (state) => state.transactionSpreadRemotePagination)
const selectTransactionSpreadRemoteState = createSelector(selectTransactionSpreadState, selectRemoteState)

const selectSelectedTransactionSpreadId = createSelector(selectTransactionSpreadState, (state) => state.selectedTransactionSpreadId)

const transactionSpreadEntitySelectors = Reducers.TransactionSpreadEntityAdaptor.getSelectors()
const selectTransactionSpreadEntityState = createSelector(selectTransactionSpreadState, (state) => state.transactionSpreads)
const selectTransactionSpreadIds = createSelector(selectTransactionSpreadEntityState, transactionSpreadEntitySelectors.selectIds)
const selectTransactionSpreadEntities = createSelector(selectTransactionSpreadEntityState, transactionSpreadEntitySelectors.selectEntities)
const selectAllTransactionSpreads = createSelector(selectTransactionSpreadEntityState, transactionSpreadEntitySelectors.selectAll)
const selectTransactionSpreadTotal = createSelector(selectTransactionSpreadEntityState, transactionSpreadEntitySelectors.selectTotal)
const selectTransactionSpreadById = (id: string) => createSelector(selectTransactionSpreadEntities, (entities) =>  entities[id])

const selectedTransactionSpread = createSelector(
    selectTransactionSpreadEntities,
    selectSelectedTransactionSpreadId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectTransactionSpreadForSelectedBrand = createSelector(
    BrandSelectors.selectSelectedBrandId,
    selectAllTransactionSpreads,
    (brandId, transactionSpreads) =>  transactionSpreads.filter(transactionSpread => transactionSpread.brandId === brandId )
)

const selectFilteredTransactionSpread = createSelector(selectAllTransactionSpreads, selectTransactionSpreadFilters, (transactionSpreads, filters) => 
    selectFilteredElements(transactionSpreads, filters, Model.Filters.transactionSpreadFilterEntityMap))

const selectPaginatedTransactionSpread = createSelector(selectAllTransactionSpreads, selectTransactionSpreadRemotePagination, (transactionSpread, pagination) => 
    selectPaginatedElements(transactionSpread, pagination))

const selectPaginatedFilteredTransactionSpread = createSelector(
    selectFilteredTransactionSpread,
    selectTransactionSpreadRemotePagination,
    (transactionSpreads, pagination ) => selectPaginatedElements(transactionSpreads, pagination)
)




export const TransactionSpreadSelectors = {
    selectTransactionSpreadState,
    selectTransactionSpreadFilters,
    selectTransactionSpreadRemotePagination,
    selectTransactionSpreadRemoteState,
    selectSelectedTransactionSpreadId,
    transactionSpreadEntitySelectors,
    selectTransactionSpreadEntityState,
    selectTransactionSpreadIds,
    selectTransactionSpreadEntities,
    selectAllTransactionSpreads,
    selectTransactionSpreadTotal,
    selectTransactionSpreadById,
    selectedTransactionSpread,
    selectTransactionSpreadForSelectedBrand,
    selectPaginatedTransactionSpread,
    selectPaginatedFilteredTransactionSpread
}