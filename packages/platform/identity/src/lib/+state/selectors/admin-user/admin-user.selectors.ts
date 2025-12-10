import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'

const selectAdminUserState = createFeatureSelector<Reducers.AdminUserFeatureState>(
    createNamespacedFeatureKey(Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER, Identifiers.ADMIN_USER_STATE_FEATURE_KEY)
)
const selectAdminUserFilters = createSelector(selectAdminUserState, (state) => state.filters)
const selectAdminUserRemotePagination = createSelector(selectAdminUserState, (state) => state.adminUsersRemotePagination)
const selectAdminUserRemoteState = createSelector(selectAdminUserState, selectRemoteState)

const selectSelectedAdminUserId = createSelector(selectAdminUserState, (state) => state.selectedAdminUserId)
const selectLoggedInAdminUser = createSelector(selectAdminUserState, (state) => state.loggedInAdminUser)
const selectHasLoggedInAdminUser = createSelector(selectLoggedInAdminUser, (adminUser) => !!adminUser)
const selectLoggedInAdminUserName = createSelector(selectLoggedInAdminUser, (adminUser) => `${adminUser?.firstName ?? ''} ${adminUser?.lastName ?? ''}`)

const adminUserEntitySelectors = Reducers.adminUserEntityAdapter.getSelectors()
const selectAdminUserEntityState = createSelector(selectAdminUserState, (state) => state.adminUsers)
const selectAdminUserIds = createSelector(selectAdminUserEntityState, adminUserEntitySelectors.selectIds)
const selectAdminUserEntities = createSelector(selectAdminUserEntityState, adminUserEntitySelectors.selectEntities)
const selectAllAdminUsers = createSelector(selectAdminUserEntityState, adminUserEntitySelectors.selectAll)
const selectAdminUserTotal = createSelector(selectAdminUserEntityState, adminUserEntitySelectors.selectTotal)
const selectAdminUserById = (id: string) => createSelector(selectAdminUserEntities, (entities) => entities[id])

const selectedAdminUser = createSelector(
    selectAdminUserEntities,
    selectSelectedAdminUserId,
    (entities, selectedId) => entities[selectedId ?? '']
)

export const AdminUserSelectors = {
    selectAdminUserState,
    selectAdminUserFilters,
    selectAdminUserRemotePagination,
    selectAdminUserRemoteState,

    selectSelectedAdminUserId,
    selectLoggedInAdminUser,
    selectHasLoggedInAdminUser,
    selectLoggedInAdminUserName,
    
    adminUserEntitySelectors,
    selectAdminUserEntityState,
    selectAdminUserIds,
    selectAdminUserEntities,
    selectAllAdminUsers,
    selectAdminUserTotal,
    selectAdminUserById,
    selectedAdminUser
}
