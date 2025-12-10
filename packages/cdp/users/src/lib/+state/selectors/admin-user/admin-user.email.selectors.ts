import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { AdminUserSelectors } from './admin-user.selectors'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'

const selectAdminUserEmailState = createFeatureSelector<Reducers.AdminUserEmailFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
        Identifiers.ADMIN_USER_EMAIL_STATE_FEATURE_KEY
    )
)
const selectAdminUserEmailEntityState = createSelector(selectAdminUserEmailState, (state) => state.adminUserEmails)
const selectAdminUserEmailFilters = createSelector(selectAdminUserEmailState, (state) => state.filters)
const selectAdminUserEmailRemotePagination = createSelector(selectAdminUserEmailState, (state) => state.adminUserEmailsRemotePagination)
const selectAdminUserEmailRemoteState = createSelector(selectAdminUserEmailState, selectRemoteState)
const selectAdminUserEmailRemoteStateBusy = createSelector(selectAdminUserEmailRemoteState, (state) => state.busy)
const selectSelectedAdminUserEmailId = createSelector(selectAdminUserEmailState, (state) => state.selectedAdminUserEmailId)
const adminUserEmailEntitySelectors = Reducers.adminUserEmailEntityAdapter.getSelectors()

const selectAdminUserEmailIds = createSelector(selectAdminUserEmailEntityState, adminUserEmailEntitySelectors.selectIds)
const selectAdminUserEmailEntities = createSelector(selectAdminUserEmailEntityState, adminUserEmailEntitySelectors.selectEntities)
const selectAllAdminUserEmails = createSelector(selectAdminUserEmailEntityState, adminUserEmailEntitySelectors.selectAll)
const selectAdminUserEmailTotal = createSelector(selectAdminUserEmailEntityState, adminUserEmailEntitySelectors.selectTotal)
const selectAdminUserEmailById = (id: string) => createSelector(selectAdminUserEmailEntities, (entities) => entities[id])

const selectAdminUserEmailsForSelectedAdminUser = createSelector(
    AdminUserSelectors.selectSelectedAdminUserId,
    selectAllAdminUserEmails,
    (adminUserId, emails) => emails.filter(email => email.adminUserId === adminUserId)
)

// const selectFilteredAdminUserEmails = createSelector(
//     selectAllAdminUserEmails,
//     selectAdminUserEmailFilters,
//     (emails, filters) => emails.filter(email => {
//         let include = true
//         if (filters.adminUserId) {
//             include = include && email.adminUserId === filters.adminUserId
//         }
//         return include
//     })
// )

const selectedAdminUserEmail = createSelector(
    selectAdminUserEmailEntities,
    selectSelectedAdminUserEmailId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

export const AdminUserEmailSelectors = {
    selectAdminUserEmailState,
    selectAdminUserEmailEntityState,
    selectAdminUserEmailFilters,
    selectAdminUserEmailRemotePagination,
    selectAdminUserEmailRemoteState,
    selectAdminUserEmailRemoteStateBusy,
    selectSelectedAdminUserEmailId,
    adminUserEmailEntitySelectors,
    selectAdminUserEmailIds,
    selectAdminUserEmailEntities,
    selectAllAdminUserEmails,
    selectAdminUserEmailTotal,
    selectAdminUserEmailById,
    selectAdminUserEmailsForSelectedAdminUser,
    selectedAdminUserEmail
}
