import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import {
    selectRemoteState,
    createNamespacedFeatureKey,
    selectPaginatedElements,
    selectFilteredElements,
} from '@zwp/platform.common'
import { BrandSelectors } from './brand.selectors'
import { Model } from '../../model'
const selectDigitalCodeBrandState = createFeatureSelector<Reducers.DigitalCodeBrandFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER,
        Identifiers.DIGITAL_CODE_BRAND_STATE_FEATURE_KEY
    )
)
const selectDigitalCodeBrandFilters = createSelector(selectDigitalCodeBrandState, (state) => state.filters)
const selectDigitalCodeBrandRemotePagination = createSelector(
    selectDigitalCodeBrandState,
    (state) => state.digitalCodeBrandRemotePagination
)
const selectDigitalCodeBrandRemoteState = createSelector(selectDigitalCodeBrandState, selectRemoteState)

const selectSelectedDigitalCodeBrandId = createSelector(
    selectDigitalCodeBrandState,
    (state) => state.selectedDigitalCodeBrandId
)

const digitalCodeBrandEntitySelectors = Reducers.digitalCodeBrandEntityAdapter.getSelectors()
const selectDigitalCodeBrandEntityState = createSelector(
    selectDigitalCodeBrandState,
    (state) => state.digitalCodeFrmBrands
)
const selectDigitalCodeBrandIds = createSelector(
    selectDigitalCodeBrandEntityState,
    digitalCodeBrandEntitySelectors.selectIds
)
const selectDigitalCodeBrandEntities = createSelector(
    selectDigitalCodeBrandEntityState,
    digitalCodeBrandEntitySelectors.selectEntities
)
const selectAllDigitalCodeBrands = createSelector(
    selectDigitalCodeBrandEntityState,
    digitalCodeBrandEntitySelectors.selectAll
)
const selectDigitalCodeBrandTotal = createSelector(
    selectDigitalCodeBrandEntityState,
    digitalCodeBrandEntitySelectors.selectTotal
)
const selectDigitalCodeBrandById = (id: string) =>
    createSelector(selectDigitalCodeBrandEntities, (entities) => entities[id])

const selectedDigitalCodeBrand = createSelector(
    selectDigitalCodeBrandEntities,
    selectSelectedDigitalCodeBrandId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectDigitalCodeBrandForSelectedBrand = createSelector(
    BrandSelectors.selectSelectedBrandId,
    selectAllDigitalCodeBrands,
    (brandId, digitalCodeBrands) =>
        digitalCodeBrands.filter((digitalCodeBrands) => digitalCodeBrands.brandId === brandId)
)

const selectFilteredDigitalCodeBrands = createSelector(
    selectAllDigitalCodeBrands,
    selectDigitalCodeBrandFilters,
    (digitalCodeBrands, filters) => selectFilteredElements(digitalCodeBrands, filters, Model.Filters.digitalCodeEntityMap)
)

const selectPaginatedDigitalCodeBrands = createSelector(
    selectAllDigitalCodeBrands,
    selectDigitalCodeBrandRemotePagination,
    (digitalCodeBrands, pagination) => selectPaginatedElements(digitalCodeBrands, pagination)
)

const selectPaginatedFilteredDigitalCodeBrands = createSelector(
    selectFilteredDigitalCodeBrands,
    selectDigitalCodeBrandRemotePagination,
    (digitalCodeBrands, pagination) => selectPaginatedElements(digitalCodeBrands, pagination)
)

export const DigitalCodeBrandSelectors = {
    selectDigitalCodeBrandState,
    selectDigitalCodeBrandFilters,
    selectDigitalCodeBrandRemotePagination,
    selectDigitalCodeBrandRemoteState,
    selectSelectedDigitalCodeBrandId,
    digitalCodeBrandEntitySelectors,
    selectDigitalCodeBrandEntityState,
    selectDigitalCodeBrandIds,
    selectDigitalCodeBrandEntities,
    selectAllDigitalCodeBrands,
    selectDigitalCodeBrandTotal,
    selectDigitalCodeBrandById,
    selectedDigitalCodeBrand,
    selectDigitalCodeBrandForSelectedBrand,

    selectFilteredDigitalCodeBrands,
    selectPaginatedDigitalCodeBrands,
    selectPaginatedFilteredDigitalCodeBrands,
}
