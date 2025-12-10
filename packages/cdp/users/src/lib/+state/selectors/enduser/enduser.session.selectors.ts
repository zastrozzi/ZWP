import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'

const selectEnduserSessionState = createFeatureSelector<Reducers.EnduserSessionFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_SESSION_STATE_FEATURE_KEY
    )
)
const selectEnduserSessionEntityState = createSelector(selectEnduserSessionState, (state) => state.enduserSessions)
const selectEnduserSessionFilters = createSelector(selectEnduserSessionState, (state) => state.filters)
const selectEnduserSessionRemotePagination = createSelector(selectEnduserSessionState, (state) => state.enduserSessionsRemotePagination)
const selectEnduserSessionRemoteState = createSelector(selectEnduserSessionState, selectRemoteState)
const selectSelectedEnduserSessionId = createSelector(selectEnduserSessionState, (state) => state.selectedEnduserSessionId)
const enduserSessionEntitySelectors = Reducers.enduserSessionEntityAdapter.getSelectors()

const selectEnduserSessionIds = createSelector(selectEnduserSessionEntityState, enduserSessionEntitySelectors.selectIds)
const selectEnduserSessionEntities = createSelector(selectEnduserSessionEntityState, enduserSessionEntitySelectors.selectEntities)
const selectAllEnduserSessions = createSelector(selectEnduserSessionEntityState, enduserSessionEntitySelectors.selectAll)
const selectEnduserSessionTotal = createSelector(selectEnduserSessionEntityState, enduserSessionEntitySelectors.selectTotal)
const selectEnduserSessionById = (id: string) => createSelector(selectEnduserSessionEntities, (entities) => entities[id])

const selectFilteredEnduserSessions = createSelector(
    selectAllEnduserSessions,
    selectEnduserSessionFilters,
    (sessions, filters) => sessions.filter(session => {
        let include = true
        if (filters.enduserId) {
            include = include && session.enduserId === filters.enduserId
        }
        return include
    })
)

const selectedEnduserSession = createSelector(
    selectEnduserSessionEntities,
    selectSelectedEnduserSessionId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

export const EnduserSessionSelectors = {
    selectEnduserSessionState,
    selectEnduserSessionEntityState,
    selectEnduserSessionFilters,
    selectEnduserSessionRemotePagination,
    selectEnduserSessionRemoteState,
    selectSelectedEnduserSessionId,
    enduserSessionEntitySelectors,
    selectEnduserSessionIds,
    selectEnduserSessionEntities,
    selectAllEnduserSessions,
    selectEnduserSessionTotal,
    selectEnduserSessionById,
    selectFilteredEnduserSessions,
    selectedEnduserSession
}