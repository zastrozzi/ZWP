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

const selectUserState = createFeatureSelector<Reducers.UserFeatureState>(
    createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.USER_STATE_FEATURE_KEY)
)

const selectUserFilters = createSelector(selectUserState, (state) => state.filters)
const selectUserRemotePagination = createSelector(selectUserState, (state) => state.usersRemotePagination)
const selectUserRemoteState = createSelector(selectUserState, selectRemoteState)

const selectSelectedUserId = createSelector(selectUserState, (state) => state.selectedUserId)

const userEntitySelectors = Reducers.userEntityAdapter.getSelectors()
const selectUserEntityState = createSelector(selectUserState, (state) => state.users)
const selectUserIds = createSelector(selectUserEntityState, userEntitySelectors.selectIds)
const selectUserEntities = createSelector(selectUserEntityState, userEntitySelectors.selectEntities)
const selectAllUsers = createSelector(selectUserEntityState, userEntitySelectors.selectAll)
const selectUserTotal = createSelector(selectUserEntityState, userEntitySelectors.selectTotal)
const selectUserById = (id: string) => createSelector(selectUserEntities, (entities) => entities[id])

const selectedUser = createSelector(
    selectUserEntities,
    selectSelectedUserId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredUsers = createSelector(selectAllUsers, selectUserFilters, (users, filters) =>
    selectFilteredElements(users, filters, Model.Filters.userFilterEntityMap)
)

const selectPaginatedUsers = createSelector(selectAllUsers, selectUserRemotePagination, (users, pagination) =>
    selectPaginatedElements(users, pagination)
)

const selectPaginatedFilteredUsers = createSelector(
    selectFilteredUsers,
    selectUserRemotePagination,
    (users, pagination) => selectPaginatedElements(users, pagination)
)

export const UserSelectors = {
    selectUserState,
    selectUserFilters,
    selectUserRemotePagination,
    selectUserRemoteState,

    selectSelectedUserId,

    userEntitySelectors,
    selectUserEntityState,
    selectUserIds,
    selectUserEntities,
    selectAllUsers,
    selectUserTotal,
    selectUserById,
    selectedUser,

    selectFilteredUsers,
    selectPaginatedUsers,
    selectPaginatedFilteredUsers,
}
