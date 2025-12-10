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
import { BrandSelectors } from './brand.selectors'

const selectFloatState = createFeatureSelector<Reducers.FloatFeatureState>(
    createNamespacedFeatureKey(Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER, Identifiers.FLOAT_STATE_FEATURE_KEY)
)

const selectFloatFilters = createSelector(selectFloatState, (state) => state.filters)
const selectFloatRemotePagination = createSelector(selectFloatState, (state) => state.floatRemotePagination)
const selectFloatRemoteState = createSelector(selectFloatState, selectRemoteState)

const selectSelectedFloatId = createSelector(selectFloatState, (state) => state.selectedFloatId)

const floatEntitySelectors = Reducers.floatEntityAdapter.getSelectors()
const selectFloatEntityState = createSelector(selectFloatState, (state) => state.floats)
const selectFloatIds = createSelector(selectFloatEntityState, floatEntitySelectors.selectIds)
const selectFloatEntities = createSelector(selectFloatEntityState, floatEntitySelectors.selectEntities)
const selectAllFloats = createSelector(selectFloatEntityState, floatEntitySelectors.selectAll)
const selectFloatTotal = createSelector(selectFloatEntityState, floatEntitySelectors.selectTotal)
const selectFloatById = (id: string) => createSelector(selectFloatEntities, (entities) => entities[id])

const selectedFloat = createSelector(
    selectFloatEntities,
    selectSelectedFloatId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFloatsForSelectedBrand = createSelector(
    BrandSelectors.selectSelectedBrandId,
    selectAllFloats,
    (brandId, floats) => floats.filter((floats) => floats.brandId === brandId)
)

const selectFilteredFloats = createSelector(selectAllFloats, selectFloatFilters, (floats, filters) =>
    selectFilteredElements(floats, filters, Model.Filters.floatFilterEntityMap)
)

const selectPaginatedFloats = createSelector(selectAllFloats, selectFloatRemotePagination, (floats, pagination) =>
    selectPaginatedElements(floats, pagination)
)

const selectPaginatedFilteredFloats = createSelector(
    selectFilteredFloats,
    selectFloatRemotePagination,
    (floats, pagination) => selectPaginatedElements(floats, pagination)
)

export const FloatSelectors = {
    selectFloatState,
    selectFloatFilters,
    selectFloatRemotePagination,
    selectFloatRemoteState,
    selectSelectedFloatId,
    floatEntitySelectors,
    selectFloatEntityState,
    selectFloatIds,
    selectFloatTotal,
    selectAllFloats,
    selectFloatById,
    selectedFloat,
    selectFloatsForSelectedBrand,

    selectFilteredFloats,
    selectPaginatedFloats,
    selectPaginatedFilteredFloats,
}
