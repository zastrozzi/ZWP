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

const selectBrandState = createFeatureSelector<Reducers.BrandFeatureState>(
    createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER, Identifiers.BRAND_STATE_FEATURE_KEY)
)
const selectBrandFilters = createSelector(selectBrandState, (state) => state.filters)
const selectBrandRemotePagination = createSelector(selectBrandState, (state) => state.brandsRemotePagination)
const selectBrandRemoteState = createSelector(selectBrandState, selectRemoteState)

const selectSelectedBrandId = createSelector(selectBrandState, (state) => state.selectedBrandId)

const brandEntitySelectors = Reducers.brandEntityAdapter.getSelectors()
const selectBrandEntityState = createSelector(selectBrandState, (state) => state.brands)
const selectBrandIds = createSelector(selectBrandEntityState, brandEntitySelectors.selectIds)
const selectBrandEntities = createSelector(selectBrandEntityState, brandEntitySelectors.selectEntities)
const selectAllBrands = createSelector(selectBrandEntityState, brandEntitySelectors.selectAll)
const selectBrandTotal = createSelector(selectBrandEntityState, brandEntitySelectors.selectTotal)
const selectBrandById = (id: string) => createSelector(selectBrandEntities, (entities) => entities[id])

const selectedBrand = createSelector(
    selectBrandEntities,
    selectSelectedBrandId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredBrands = createSelector(selectAllBrands, selectBrandFilters, (brands, filters) =>
    selectFilteredElements(brands, filters, Model.Filters.brandFilterEntityMap)
)

const selectPaginatedBrands = createSelector(selectAllBrands, selectBrandRemotePagination, (brands, pagination) =>
    selectPaginatedElements(brands, pagination)
)

const selectPaginatedFilteredBrands = createSelector(
    selectFilteredBrands,
    selectBrandRemotePagination,
    (brands, pagination) => selectPaginatedElements(brands, pagination)
)

export const BrandSelectors = {
    selectBrandState,
    selectBrandFilters,
    selectBrandRemotePagination,
    selectBrandRemoteState,
    selectSelectedBrandId,
    brandEntitySelectors,
    selectBrandEntityState,
    selectBrandIds,
    selectBrandEntities,
    selectAllBrands,
    selectBrandTotal,
    selectBrandById,
    selectedBrand,

    selectFilteredBrands,
    selectPaginatedBrands,
    selectPaginatedFilteredBrands,
}
