import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { AdminUserSelectors } from './admin-user.selectors'
import { createNamespacedFeatureKey, isNull, Nullable, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../../model'

const selectAdminUserSessionState = createFeatureSelector<Reducers.AdminUserSessionFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ADMIN_USER_SESSION_STATE_FEATURE_KEY
    )
)
const selectAdminUserSessionFilters = createSelector(selectAdminUserSessionState, (state) => state.filters)
const selectAdminUserSessionRemotePagination = createSelector(selectAdminUserSessionState, (state) => state.adminUserSessionsRemotePagination)
const selectAdminUserSessionRemoteState = createSelector(selectAdminUserSessionState, selectRemoteState)

const selectSelectedAdminUserSessionId = createSelector(selectAdminUserSessionState, (state) => state.selectedAdminUserSessionId)
const adminUserSessionEntitySelectors = Reducers.adminUserSessionEntityAdapter.getSelectors()
const selectAdminUserSessionEntityState = createSelector(selectAdminUserSessionState, (state) => state.adminUserSessions)

const selectAdminUserSessionIds = createSelector(selectAdminUserSessionEntityState, adminUserSessionEntitySelectors.selectIds)
const selectAdminUserSessionEntities = createSelector(selectAdminUserSessionEntityState, adminUserSessionEntitySelectors.selectEntities)
const selectAllAdminUserSessions = createSelector(selectAdminUserSessionEntityState, adminUserSessionEntitySelectors.selectAll)
const selectAdminUserSessionTotal = createSelector(selectAdminUserSessionEntityState, adminUserSessionEntitySelectors.selectTotal)
const selectAdminUserSessionById = (id: string) => createSelector(selectAdminUserSessionEntities, (entities) => entities[id])

const selectedAdminUserSession = createSelector(
    selectAdminUserSessionEntities,
    selectSelectedAdminUserSessionId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

const selectAdminUserSessionsForSelectedAdminUser = createSelector(
    AdminUserSelectors.selectSelectedAdminUserId,
    selectAllAdminUserSessions,
    (adminUserId, sessions) => sessions.filter(session => session.adminUserId === adminUserId)
)

const selectAdminUserSessionsForAdminUser = (adminUserId: string) => createSelector(
    selectAllAdminUserSessions,
    (sessions) => sessions.filter(session => session.adminUserId === adminUserId)
)

const selectFilteredAdminUserSessions = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    adminUserId === 'selected'
        ? selectAdminUserSessionsForSelectedAdminUser
        : isNull(adminUserId)
        ? selectAllAdminUserSessions
        : selectAdminUserSessionsForAdminUser(adminUserId),
    selectAdminUserSessionFilters,
    (sessions, filters) => selectFilteredElements(sessions, filters, Model.Filters.adminUserSessionFilterEntityMap)
)

const selectPaginatedAdminUserSessions = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    adminUserId === 'selected'
        ? selectAdminUserSessionsForSelectedAdminUser
        : isNull(adminUserId)
        ? selectAllAdminUserSessions
        : selectAdminUserSessionsForAdminUser(adminUserId),
    selectAdminUserSessionRemotePagination,
    (sessions, pagination) => selectPaginatedElements(sessions, pagination)
)

const selectPaginatedFilteredAdminUserSessions = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    selectFilteredAdminUserSessions(adminUserId),
    selectAdminUserSessionRemotePagination,
    (sessions, pagination) => selectPaginatedElements(sessions, pagination)
)

export const AdminUserSessionSelectors = {
    selectAdminUserSessionState,
    selectAdminUserSessionEntityState,
    selectAdminUserSessionFilters,
    selectAdminUserSessionRemotePagination,
    selectAdminUserSessionRemoteState,
    selectSelectedAdminUserSessionId,
    adminUserSessionEntitySelectors,
    selectAdminUserSessionIds,
    selectAdminUserSessionEntities,
    selectAllAdminUserSessions,
    selectAdminUserSessionTotal,
    selectAdminUserSessionById,
    selectFilteredAdminUserSessions,
    selectPaginatedAdminUserSessions,
    selectPaginatedFilteredAdminUserSessions,
    selectedAdminUserSession
}