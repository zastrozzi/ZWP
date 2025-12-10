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

const selectMerchantState = createFeatureSelector<Reducers.MerchantFeatureState>(
    createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.MERCHANT_STATE_FEATURE_KEY)
)

const selectMerchantFilters = createSelector(selectMerchantState, (state) => state.filters)
const selectMerchantRemotePagination = createSelector(selectMerchantState, (state) => state.merchantsRemotePagination)
const selectMerchantRemoteState = createSelector(selectMerchantState, selectRemoteState)

const selectSelectedMerchantId = createSelector(selectMerchantState, (state) => state.selectedMerchantId)

const merchantEntitySelectors = Reducers.merchantEntityAdapter.getSelectors()
const selectMerchantEntityState = createSelector(selectMerchantState, (state) => state.merchants)
const selectMerchantIds = createSelector(selectMerchantEntityState, merchantEntitySelectors.selectIds)
const selectMerchantEntities = createSelector(selectMerchantEntityState, merchantEntitySelectors.selectEntities)
const selectAllMerchants = createSelector(selectMerchantEntityState, merchantEntitySelectors.selectAll)
const selectMerchantTotal = createSelector(selectMerchantEntityState, merchantEntitySelectors.selectTotal)
const selectMerchantById = (id: string) => createSelector(selectMerchantEntities, (entities) => entities[id])

const selectedMerchant = createSelector(
    selectMerchantEntities,
    selectSelectedMerchantId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredMerchants = createSelector(selectAllMerchants, selectMerchantFilters, (merchants, filters) =>
    selectFilteredElements(merchants, filters, Model.Filters.merchantFilterEntityMap)
)

const selectPaginatedMerchants = createSelector(
    selectAllMerchants,
    selectMerchantRemotePagination,
    (merchants, pagination) => selectPaginatedElements(merchants, pagination)
)

const selectPaginatedFilteredMerchants = createSelector(
    selectFilteredMerchants,
    selectMerchantRemotePagination,
    (merchants, pagination) => selectPaginatedElements(merchants, pagination)
)

export const MerchantSelectors = {
    selectMerchantState,
    selectMerchantFilters,
    selectMerchantRemotePagination,
    selectMerchantRemoteState,

    selectSelectedMerchantId,

    merchantEntitySelectors,
    selectMerchantEntityState,
    selectMerchantIds,
    selectMerchantEntities,
    selectAllMerchants,
    selectMerchantTotal,
    selectMerchantById,
    selectedMerchant,

    selectFilteredMerchants,
    selectPaginatedMerchants,
    selectPaginatedFilteredMerchants,
}
