import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { AdminUserSelectors } from './admin-user.selectors'
import { createNamespacedFeatureKey, isNull, Nullable, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../../model'

const selectAdminUserCredentialState = createFeatureSelector<Reducers.AdminUserCredentialFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ADMIN_USER_CREDENTIAL_STATE_FEATURE_KEY
    )
)
const selectAdminUserCredentialFilters = createSelector(selectAdminUserCredentialState, (state) => state.filters)
const selectAdminUserCredentialRemotePagination = createSelector(selectAdminUserCredentialState, (state) => state.adminUserCredentialsRemotePagination)
const selectAdminUserCredentialRemoteState = createSelector(selectAdminUserCredentialState, selectRemoteState)

const selectSelectedAdminUserCredentialId = createSelector(selectAdminUserCredentialState, (state) => state.selectedAdminUserCredentialId)
const adminUserCredentialEntitySelectors = Reducers.adminUserCredentialEntityAdapter.getSelectors()
const selectAdminUserCredentialEntityState = createSelector(selectAdminUserCredentialState, (state) => state.adminUserCredentials)

const selectAdminUserCredentialIds = createSelector(selectAdminUserCredentialEntityState, adminUserCredentialEntitySelectors.selectIds)
const selectAdminUserCredentialEntities = createSelector(selectAdminUserCredentialEntityState, adminUserCredentialEntitySelectors.selectEntities)
const selectAllAdminUserCredentials = createSelector(selectAdminUserCredentialEntityState, adminUserCredentialEntitySelectors.selectAll)
const selectAdminUserCredentialTotal = createSelector(selectAdminUserCredentialEntityState, adminUserCredentialEntitySelectors.selectTotal)
const selectAdminUserCredentialById = (id: string) => createSelector(selectAdminUserCredentialEntities, (entities) => entities[id])

const selectedAdminUserCredential = createSelector(
    selectAdminUserCredentialEntities,
    selectSelectedAdminUserCredentialId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

const selectAdminUserCredentialsForSelectedAdminUser = createSelector(
    AdminUserSelectors.selectSelectedAdminUserId,
    selectAllAdminUserCredentials,
    (adminUserId, credentials) => credentials.filter(credential => credential.adminUserId === adminUserId)
)

const selectAdminUserCredentialsForAdminUser = (adminUserId: string) => createSelector(
    selectAllAdminUserCredentials,
    (credentials) => credentials.filter(credential => credential.adminUserId === adminUserId)
)

const selectFilteredAdminUserCredentials = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    adminUserId === 'selected'
        ? selectAdminUserCredentialsForSelectedAdminUser
        : isNull(adminUserId)
        ? selectAllAdminUserCredentials
        : selectAdminUserCredentialsForAdminUser(adminUserId),
    selectAdminUserCredentialFilters,
    (credentials, filters) => selectFilteredElements(credentials, filters, Model.Filters.adminUserCredentialFilterEntityMap)
)

const selectPaginatedAdminUserCredentials = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    adminUserId === 'selected'
        ? selectAdminUserCredentialsForSelectedAdminUser
        : isNull(adminUserId)
        ? selectAllAdminUserCredentials
        : selectAdminUserCredentialsForAdminUser(adminUserId),
    selectAdminUserCredentialRemotePagination,
    (credentials, pagination) => selectPaginatedElements(credentials, pagination)
)

const selectPaginatedFilteredAdminUserCredentials = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    selectFilteredAdminUserCredentials(adminUserId),
    selectAdminUserCredentialRemotePagination,
    (credentials, pagination) => selectPaginatedElements(credentials, pagination)
)

export const AdminUserCredentialSelectors = {
    selectAdminUserCredentialState,
    selectAdminUserCredentialEntityState,
    selectAdminUserCredentialFilters,
    selectAdminUserCredentialRemotePagination,
    selectAdminUserCredentialRemoteState,
    selectSelectedAdminUserCredentialId,
    adminUserCredentialEntitySelectors,
    selectAdminUserCredentialIds,
    selectAdminUserCredentialEntities,
    selectAllAdminUserCredentials,
    selectAdminUserCredentialTotal,
    selectAdminUserCredentialById,
    selectFilteredAdminUserCredentials,
    selectPaginatedAdminUserCredentials,
    selectPaginatedFilteredAdminUserCredentials,
    selectedAdminUserCredential
}