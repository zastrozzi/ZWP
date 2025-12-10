import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { AdminUserSelectors } from './admin-user.selectors'
import { createNamespacedFeatureKey, isNull, Nullable, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../../model'

const selectAdminUserEmailState = createFeatureSelector<Reducers.AdminUserEmailFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ADMIN_USER_EMAIL_STATE_FEATURE_KEY
    )
)
const selectAdminUserEmailFilters = createSelector(selectAdminUserEmailState, (state) => state.filters)
const selectAdminUserEmailRemotePagination = createSelector(selectAdminUserEmailState, (state) => state.adminUserEmailsRemotePagination)
const selectAdminUserEmailRemoteState = createSelector(selectAdminUserEmailState, selectRemoteState)

const selectSelectedAdminUserEmailId = createSelector(selectAdminUserEmailState, (state) => state.selectedAdminUserEmailId)
const adminUserEmailEntitySelectors = Reducers.adminUserEmailEntityAdapter.getSelectors()
const selectAdminUserEmailEntityState = createSelector(selectAdminUserEmailState, (state) => state.adminUserEmails)

const selectAdminUserEmailIds = createSelector(selectAdminUserEmailEntityState, adminUserEmailEntitySelectors.selectIds)
const selectAdminUserEmailEntities = createSelector(selectAdminUserEmailEntityState, adminUserEmailEntitySelectors.selectEntities)
const selectAllAdminUserEmails = createSelector(selectAdminUserEmailEntityState, adminUserEmailEntitySelectors.selectAll)
const selectAdminUserEmailTotal = createSelector(selectAdminUserEmailEntityState, adminUserEmailEntitySelectors.selectTotal)
const selectAdminUserEmailById = (id: string) => createSelector(selectAdminUserEmailEntities, (entities) => entities[id])

const selectedAdminUserEmail = createSelector(
    selectAdminUserEmailEntities,
    selectSelectedAdminUserEmailId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

const selectAdminUserEmailsForSelectedAdminUser = createSelector(
    AdminUserSelectors.selectSelectedAdminUserId,
    selectAllAdminUserEmails,
    (adminUserId, emails) => emails.filter(email => email.adminUserId === adminUserId)
)

const selectAdminUserEmailsForAdminUser = (adminUserId: string) => createSelector(
    selectAllAdminUserEmails,
    (emails) => emails.filter(email => email.adminUserId === adminUserId)
)

const selectFilteredAdminUserEmails = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    adminUserId === 'selected'
        ? selectAdminUserEmailsForSelectedAdminUser
        : isNull(adminUserId)
        ? selectAllAdminUserEmails
        : selectAdminUserEmailsForAdminUser(adminUserId),
    selectAdminUserEmailFilters,
    (emails, filters) => selectFilteredElements(emails, filters, Model.Filters.adminUserEmailFilterEntityMap)
)

const selectPaginatedAdminUserEmails = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    adminUserId === 'selected'
        ? selectAdminUserEmailsForSelectedAdminUser
        : isNull(adminUserId)
        ? selectAllAdminUserEmails
        : selectAdminUserEmailsForAdminUser(adminUserId),
    selectAdminUserEmailRemotePagination,
    (emails, pagination) => selectPaginatedElements(emails, pagination)
)

const selectPaginatedFilteredAdminUserEmails = (adminUserId: Nullable<string> | 'selected' = null) => createSelector(
    selectFilteredAdminUserEmails(adminUserId),
    selectAdminUserEmailRemotePagination,
    (emails, pagination) => selectPaginatedElements(emails, pagination)
)

export const AdminUserEmailSelectors = {
    selectAdminUserEmailState,
    selectAdminUserEmailEntityState,
    selectAdminUserEmailFilters,
    selectAdminUserEmailRemotePagination,
    selectAdminUserEmailRemoteState,
    selectSelectedAdminUserEmailId,
    adminUserEmailEntitySelectors,
    selectAdminUserEmailIds,
    selectAdminUserEmailEntities,
    selectAllAdminUserEmails,
    selectAdminUserEmailTotal,
    selectAdminUserEmailById,
    selectFilteredAdminUserEmails,
    selectPaginatedAdminUserEmails,
    selectPaginatedFilteredAdminUserEmails,
    selectedAdminUserEmail,
    selectAdminUserEmailsForSelectedAdminUser,
    selectAdminUserEmailsForAdminUser
}