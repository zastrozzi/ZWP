import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { AdminUserSelectors } from './admin-user.selectors'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'

const selectAdminUserCredentialState = createFeatureSelector<Reducers.AdminUserCredentialFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
        Identifiers.ADMIN_USER_CREDENTIAL_STATE_FEATURE_KEY
    )
)
const selectAdminUserCredentialEntityState = createSelector(selectAdminUserCredentialState, (state) => state.adminUserCredentials)
const selectAdminUserCredentialFilters = createSelector(selectAdminUserCredentialState, (state) => state.filters)
const selectAdminUserCredentialRemotePagination = createSelector(selectAdminUserCredentialState, (state) => state.adminUserCredentialsRemotePagination)
const selectAdminUserCredentialRemoteState = createSelector(selectAdminUserCredentialState, selectRemoteState)
const selectAdminUserCredentialRemoteStateBusy = createSelector(selectAdminUserCredentialRemoteState, (state) => state.busy)
const selectSelectedAdminUserCredentialId = createSelector(selectAdminUserCredentialState, (state) => state.selectedAdminUserCredentialId)
const adminUserCredentialEntitySelectors = Reducers.adminUserCredentialEntityAdapter.getSelectors()

const selectAdminUserCredentialIds = createSelector(selectAdminUserCredentialEntityState, adminUserCredentialEntitySelectors.selectIds)
const selectAdminUserCredentialEntities = createSelector(selectAdminUserCredentialEntityState, adminUserCredentialEntitySelectors.selectEntities)
const selectAllAdminUserCredentials = createSelector(selectAdminUserCredentialEntityState, adminUserCredentialEntitySelectors.selectAll)
const selectAdminUserCredentialTotal = createSelector(selectAdminUserCredentialEntityState, adminUserCredentialEntitySelectors.selectTotal)
const selectAdminUserCredentialById = (id: string) => createSelector(selectAdminUserCredentialEntities, (entities) => entities[id])

const selectAdminUserCredentialsForSelectedAdminUser = createSelector(
    AdminUserSelectors.selectSelectedAdminUserId,
    selectAllAdminUserCredentials,
    (adminUserId, credentials) => credentials.filter(credential => credential.adminUserId === adminUserId)
)


// const selectFilteredAdminUserCredentials = createSelector(
//     selectAllAdminUserCredentials,
//     selectAdminUserCredentialFilters,
//     (credentials, filters) => credentials.filter(credential => {
//         let include = true
//         if (filters.adminUserId) {
//             include = include && credential.adminUserId === filters.adminUserId
//         }
//         return include
//     })
// )

const selectedAdminUserCredential = createSelector(
    selectAdminUserCredentialEntities,
    selectSelectedAdminUserCredentialId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

export const AdminUserCredentialSelectors = {
    selectAdminUserCredentialState,
    selectAdminUserCredentialEntityState,
    selectAdminUserCredentialFilters,
    selectAdminUserCredentialRemotePagination,
    selectAdminUserCredentialRemoteState,
    selectAdminUserCredentialRemoteStateBusy,
    selectSelectedAdminUserCredentialId,
    adminUserCredentialEntitySelectors,
    selectAdminUserCredentialIds,
    selectAdminUserCredentialEntities,
    selectAllAdminUserCredentials,
    selectAdminUserCredentialTotal,
    selectAdminUserCredentialById,
    selectAdminUserCredentialsForSelectedAdminUser,
    selectedAdminUserCredential
}