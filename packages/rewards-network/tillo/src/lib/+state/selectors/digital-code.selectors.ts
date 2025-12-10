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

const selectDigitalCodeState = createFeatureSelector<Reducers.DigitalCodeFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_TILLO_ACTION_IDENTIFIER,
        Identifiers.DIGITAL_CODE_STATE_FEATURE_KEY
    )
)
const selectDigitalCodeFilters = createSelector(selectDigitalCodeState, (state) => state.filters)
const selectDigitalCodeRemotePagination = createSelector(
    selectDigitalCodeState,
    (state) => state.digitalCodeRemotePagination
)
const selectDigitalCodeRemoteState = createSelector(selectDigitalCodeState, selectRemoteState)

const selectSelectedDigitalCodeId = createSelector(selectDigitalCodeState, (state) => state.selectedDigitalCodeId)

const digitalCodeEntitySelectors = Reducers.digitalCodeEntityAdapter.getSelectors()
const selectDigitalCodeEntityState = createSelector(selectDigitalCodeState, (state) => state.digitalCodes)
const selectDigitalCodeIds = createSelector(selectDigitalCodeEntityState, digitalCodeEntitySelectors.selectIds)
const selectDigitalCodeEntities = createSelector(
    selectDigitalCodeEntityState,
    digitalCodeEntitySelectors.selectEntities
)
const selectAllDigitalCodes = createSelector(selectDigitalCodeEntityState, digitalCodeEntitySelectors.selectAll)
const selectDigitalCodeTotal = createSelector(selectDigitalCodeEntityState, digitalCodeEntitySelectors.selectTotal)
const selectDigitalCodeById = (id: string) => createSelector(selectDigitalCodeEntities, (entities) => entities[id])

const selectedDigitalCode = createSelector(
    selectDigitalCodeEntities,
    selectSelectedDigitalCodeId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredDigitalCode = createSelector(
    selectAllDigitalCodes,
    selectDigitalCodeFilters,
    (digitalCodes, filters) => selectFilteredElements(digitalCodes, filters, Model.Filters.digitalCodeEntityMap)
)

const selectPaginatedDigitalCodes = createSelector(
    selectAllDigitalCodes,
    selectDigitalCodeRemotePagination,
    (digitalCodes, pagination) => selectPaginatedElements(digitalCodes, pagination)
)

const selectPaginatedFilteredDigitalCodes = createSelector(
    selectFilteredDigitalCode,
    selectDigitalCodeRemotePagination,
    (digitalCodes, pagination) => selectPaginatedElements(digitalCodes, pagination)
)

export const DigitalCodeSelectors = {
    selectDigitalCodeState,
    selectDigitalCodeFilters,
    selectDigitalCodeRemotePagination,
    selectDigitalCodeRemoteState,
    selectSelectedDigitalCodeId,
    digitalCodeEntitySelectors,
    selectDigitalCodeEntityState,
    selectDigitalCodeIds,
    selectDigitalCodeEntities,
    selectAllDigitalCodes,
    selectDigitalCodeTotal,
    selectDigitalCodeById,
    selectedDigitalCode,

    selectFilteredDigitalCode,
    selectPaginatedDigitalCodes,
    selectPaginatedFilteredDigitalCodes,
}
