import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { AdminUserSelectors } from './admin-user.selectors'
import { Model } from '../../../model'
import { createNamespacedFeatureKey, transformEnum } from '@zwp/platform.common'
import { CDPCommon } from '@zwp/cdp.common'
import { AuditEventActionType, AuditEventActionTypeVerb } from '@zwp/platform.common'

const selectAdminUserActivityState = createFeatureSelector<Reducers.AdminUserActivityFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
        Identifiers.ADMIN_USER_ACTIVITY_STATE_FEATURE_KEY
    )
)
const selectAdminUserActivityEntityState = createSelector(selectAdminUserActivityState, (state) => state.adminUserActivities)
const selectAdminUserActivityFilters = createSelector(selectAdminUserActivityState, (state) => state.filters)
const selectAdminUserActivityRemotePagination = createSelector(selectAdminUserActivityState, (state) => state.adminUserActivitiesRemotePagination)
const selectSelectedAdminUserActivityId = createSelector(selectAdminUserActivityState, (state) => state.selectedAdminUserActivityId)
const adminUserActivityEntitySelectors = Reducers.adminUserActivityEntityAdapter.getSelectors()

const selectAdminUserActivityIds = createSelector(selectAdminUserActivityEntityState, adminUserActivityEntitySelectors.selectIds)
const selectAdminUserActivityEntities = createSelector(selectAdminUserActivityEntityState, adminUserActivityEntitySelectors.selectEntities)
const selectAllAdminUserActivity = createSelector(selectAdminUserActivityEntityState, adminUserActivityEntitySelectors.selectAll)
const selectAdminUserActivityTotal = createSelector(selectAdminUserActivityEntityState, adminUserActivityEntitySelectors.selectTotal)
const selectAdminUserActivityById = (id: string) => createSelector(selectAdminUserActivityEntities, (entities) => entities[id])

const selectFilteredAdminUserActivity = createSelector(
    selectAllAdminUserActivity,
    selectAdminUserActivityFilters,
    (activities, filters) => activities.filter(activity => {
        let include = true
        if (filters.affectedSchema) {
            include = include && activity.schema === filters.affectedSchema.equalTo
        }
        if (filters.affectedId) {
            include = include && activity.affectedId === filters.affectedId.equalTo
        }
        if (filters.eventType) {
            include = include && activity.eventType === filters.eventType.equalTo
        }
        return include
    })
)

const selectedAdminUserActivity = createSelector(
    selectAdminUserActivityEntities,
    selectSelectedAdminUserActivityId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

const selectAllAdminUserActivityWithAdminUser = createSelector(
    selectAllAdminUserActivity,
    AdminUserSelectors.selectAdminUserEntities,
    (activities, users) => activities.map((activity): Model.AdminUserActivityWithAdminUserResponse | null => {
        const adminUser = users[activity.platformActorId]
        if (adminUser) { 
            const actionTypeVerb = transformEnum(activity.eventType, AuditEventActionType, AuditEventActionTypeVerb)
            const schemaArticle = transformEnum(activity.schema, CDPCommon.Model.KnownSchema, CDPCommon.Model.KnownSchemaArticle)
            const schemaLabel = transformEnum(activity.schema, CDPCommon.Model.KnownSchema, CDPCommon.Model.KnownSchemaLabel)
            const activityDescription = `${adminUser.firstName} ${actionTypeVerb} ${schemaArticle} ${schemaLabel}`
            return { activity, adminUser, description: activityDescription }} else { return null }
    }).compactMap(record => record)
)

export const AdminUserActivitySelectors = {
    selectAdminUserActivityState,
    selectAdminUserActivityEntityState,
    selectAdminUserActivityFilters,
    selectAdminUserActivityRemotePagination,
    selectSelectedAdminUserActivityId,
    adminUserActivityEntitySelectors,
    selectAdminUserActivityIds,
    selectAdminUserActivityEntities,
    selectAllAdminUserActivity,
    selectAdminUserActivityTotal,
    selectAdminUserActivityById,
    selectFilteredAdminUserActivity,
    selectedAdminUserActivity,
    selectAllAdminUserActivityWithAdminUser
}