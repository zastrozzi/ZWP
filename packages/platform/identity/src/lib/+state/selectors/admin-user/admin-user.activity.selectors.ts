import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { AdminUserSelectors } from './admin-user.selectors'
import { Model } from '../../../model'
import {
    AuditEventActionType,
    AuditEventActionTypeVerb,
    auditEventFilterEntityMap,
    createNamespacedFeatureKey,
    isNull,
    Nullable,
    selectFilteredElements,
    selectPaginatedElements,
    selectRemoteState,
    transformEnum
} from '@zwp/platform.common'
import { CDPCommon } from '@zwp/cdp.common'
import { PlatformActor } from '../../../model/enums'

const selectAdminUserActivityState = createFeatureSelector<Reducers.AdminUserActivityFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ADMIN_USER_ACTIVITY_STATE_FEATURE_KEY
    )
)
const selectAdminUserActivityFilters = createSelector(selectAdminUserActivityState, (state) => state.filters)
const selectAdminUserActivityRemotePagination = createSelector(
    selectAdminUserActivityState,
    (state) => state.adminUserActivitiesRemotePagination
)
const selectAdminUserActivityRemoteState = createSelector(selectAdminUserActivityState, selectRemoteState)

const selectSelectedAdminUserActivityId = createSelector(
    selectAdminUserActivityState,
    (state) => state.selectedAdminUserActivityId
)

const adminUserActivityEntitySelectors = Reducers.adminUserActivityEntityAdapter.getSelectors()
const selectAdminUserActivityEntityState = createSelector(
    selectAdminUserActivityState,
    (state) => state.adminUserActivities
)
const selectAdminUserActivityIds = createSelector(
    selectAdminUserActivityEntityState,
    adminUserActivityEntitySelectors.selectIds
)
const selectAdminUserActivityEntities = createSelector(
    selectAdminUserActivityEntityState,
    adminUserActivityEntitySelectors.selectEntities
)
const selectAllAdminUserActivities = createSelector(
    selectAdminUserActivityEntityState,
    adminUserActivityEntitySelectors.selectAll
)
const selectAdminUserActivityTotal = createSelector(
    selectAdminUserActivityEntityState,
    adminUserActivityEntitySelectors.selectTotal
)
const selectAdminUserActivityById = (id: string) =>
    createSelector(selectAdminUserActivityEntities, (entities) => entities[id])

const selectedAdminUserActivity = createSelector(
    selectAdminUserActivityEntities,
    selectSelectedAdminUserActivityId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

const selectAllAdminUserActivitiesForSelectedAdminUser = createSelector(
    selectAllAdminUserActivities,
    AdminUserSelectors.selectSelectedAdminUserId,
    (activities, selectedAdminUserId) =>
        activities.filter(
            (activity) =>
                activity.platformActorType === PlatformActor.adminUser &&
                activity.platformActorId === selectedAdminUserId
        )
)

const selectAllAdminUserActivitiesForAdminUser = (adminUserId: string) =>
    createSelector(selectAllAdminUserActivities, (activities) =>
        activities.filter(
            (activity) =>
                activity.platformActorType === PlatformActor.adminUser && activity.platformActorId === adminUserId
        )
    )

const selectFilteredAdminUserActivities = (adminUserId: Nullable<string> | 'selected' = null) =>
    createSelector(
        adminUserId === 'selected'
            ? selectAllAdminUserActivitiesForSelectedAdminUser
            : isNull(adminUserId)
            ? selectAllAdminUserActivities
            : selectAllAdminUserActivitiesForAdminUser(adminUserId),
        selectAdminUserActivityFilters,
        (activities, filters) => selectFilteredElements(activities, filters, auditEventFilterEntityMap)
    )

const selectPaginatedAdminUserActivities = (adminUserId: Nullable<string> | 'selected' = null) =>
    createSelector(
        adminUserId === 'selected'
            ? selectAllAdminUserActivitiesForSelectedAdminUser
            : isNull(adminUserId)
            ? selectAllAdminUserActivities
            : selectAllAdminUserActivitiesForAdminUser(adminUserId),
        selectAdminUserActivityRemotePagination,
        (activities, pagination) => selectPaginatedElements(activities, pagination)
    )

const selectPaginatedFilteredAdminUserActivities = (adminUserId: Nullable<string> | 'selected' = null) =>
    createSelector(
        selectFilteredAdminUserActivities(adminUserId),
        selectAdminUserActivityRemotePagination,
        (activities, pagination) => selectPaginatedElements(activities, pagination)
    )

const selectAllAdminUserActivitiesWithAdminUser = createSelector(
    selectAllAdminUserActivities,
    AdminUserSelectors.selectAdminUserEntities,
    (activities, users) =>
        activities
            .map((activity): Model.AdminUserActivityWithAdminUserResponse | null => {
                const adminUser = users[activity.platformActorId]
                if (adminUser) {
                    const actionTypeVerb = transformEnum(
                        activity.eventType,
                        AuditEventActionType,
                        AuditEventActionTypeVerb
                    )
                    const schemaArticle = transformEnum(
                        activity.schema,
                        CDPCommon.Model.KnownSchema,
                        CDPCommon.Model.KnownSchemaArticle
                    )
                    const schemaLabel = transformEnum(
                        activity.schema,
                        CDPCommon.Model.KnownSchema,
                        CDPCommon.Model.KnownSchemaLabel
                    )
                    const activityDescription = `${adminUser.firstName} ${actionTypeVerb} ${schemaArticle} ${schemaLabel}`
                    return { activity, adminUser, description: activityDescription }
                } else {
                    return null
                }
            })
            .compactMap((record) => record)
)

export const AdminUserActivitySelectors = {
    selectAdminUserActivityState,
    selectAdminUserActivityFilters,
    selectAdminUserActivityRemotePagination,
    selectAdminUserActivityRemoteState,
    selectSelectedAdminUserActivityId,
    adminUserActivityEntitySelectors,
    selectAdminUserActivityEntityState,
    selectAdminUserActivityIds,
    selectAdminUserActivityEntities,
    selectAllAdminUserActivities,
    selectAdminUserActivityTotal,
    selectAdminUserActivityById,
    selectFilteredAdminUserActivities,
    selectPaginatedAdminUserActivities,
    selectPaginatedFilteredAdminUserActivities,
    selectedAdminUserActivity,
    selectAllAdminUserActivitiesWithAdminUser
}
