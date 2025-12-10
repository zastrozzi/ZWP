import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../../model'

const selectEnduserState = createFeatureSelector<Reducers.EnduserFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_STATE_FEATURE_KEY
    )
)

const selectEnduserFilters = createSelector(selectEnduserState, (state) => state.filters)
const selectEnduserRemotePagination = createSelector(selectEnduserState, (state) => state.endusersRemotePagination)
const selectEnduserRemoteState = createSelector(selectEnduserState, selectRemoteState)

const selectSelectedEnduserId = createSelector(selectEnduserState, (state) => state.selectedEnduserId)

const enduserEntitySelectors = Reducers.enduserEntityAdapter.getSelectors()
const selectEnduserEntityState = createSelector(selectEnduserState, (state) => state.endusers)
const selectEnduserIds = createSelector(selectEnduserEntityState, enduserEntitySelectors.selectIds)
const selectEnduserEntities = createSelector(selectEnduserEntityState, enduserEntitySelectors.selectEntities)
const selectAllEndusers = createSelector(selectEnduserEntityState, enduserEntitySelectors.selectAll)
const selectEnduserTotal = createSelector(selectEnduserEntityState, enduserEntitySelectors.selectTotal)
const selectEnduserById = (id: string) => createSelector(selectEnduserEntities, (entities) => entities[id])

const selectFilteredEndusers = createSelector(
    selectAllEndusers,
    selectEnduserFilters,
    (endusers, filters) => selectFilteredElements(endusers, filters, Model.Filters.enduserFilterEntityMap)
)

const selectPaginatedEndusers = createSelector(
    selectAllEndusers,
    selectEnduserRemotePagination,
    (endusers, pagination) => selectPaginatedElements(endusers, pagination)
)

const selectPaginatedFilteredEndusers = createSelector(
    selectFilteredEndusers,
    selectEnduserRemotePagination,
    (endusers, pagination) => selectPaginatedElements(endusers, pagination)
)

const selectedEnduser = createSelector(
    selectEnduserEntities,
    selectSelectedEnduserId,
    (entities, selectedId) => entities[selectedId ?? '']
)

export const EnduserSelectors = {
    selectEnduserState,
    selectEnduserFilters,
    selectEnduserRemotePagination,
    selectEnduserRemoteState,

    selectSelectedEnduserId,
    
    enduserEntitySelectors,
    selectEnduserEntityState,
    selectEnduserIds,
    selectEnduserEntities,
    selectAllEndusers,
    selectEnduserTotal,
    selectEnduserById,
    selectPaginatedEndusers,
    selectFilteredEndusers,
    selectPaginatedFilteredEndusers,
    selectedEnduser
}
