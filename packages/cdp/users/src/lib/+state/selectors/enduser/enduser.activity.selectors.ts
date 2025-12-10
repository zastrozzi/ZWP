import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { EnduserSelectors } from './enduser.selectors'
import { Model } from '../../../model'
import { createNamespacedFeatureKey, transformEnum } from '@zwp/platform.common'
import { CDPCommon } from '@zwp/cdp.common'
import { AuditEventActionType, AuditEventActionTypeVerb } from '@zwp/platform.common'

const selectEnduserActivityState = createFeatureSelector<Reducers.EnduserActivityFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_ACTIVITY_STATE_FEATURE_KEY
    )
)
const selectEnduserActivityEntityState = createSelector(selectEnduserActivityState, (state) => state.enduserActivities)
const selectEnduserActivityFilters = createSelector(selectEnduserActivityState, (state) => state.filters)
const selectEnduserActivityRemotePagination = createSelector(selectEnduserActivityState, (state) => state.enduserActivitiesRemotePagination)
const selectSelectedEnduserActivityId = createSelector(selectEnduserActivityState, (state) => state.selectedEnduserActivityId)
const enduserActivityEntitySelectors = Reducers.enduserActivityEntityAdapter.getSelectors()

const selectEnduserActivityIds = createSelector(selectEnduserActivityEntityState, enduserActivityEntitySelectors.selectIds)
const selectEnduserActivityEntities = createSelector(selectEnduserActivityEntityState, enduserActivityEntitySelectors.selectEntities)
const selectAllEnduserActivity = createSelector(selectEnduserActivityEntityState, enduserActivityEntitySelectors.selectAll)
const selectEnduserActivityTotal = createSelector(selectEnduserActivityEntityState, enduserActivityEntitySelectors.selectTotal)
const selectEnduserActivityById = (id: string) => createSelector(selectEnduserActivityEntities, (entities) => entities[id])

const selectFilteredEnduserActivity = createSelector(
    selectAllEnduserActivity,
    selectEnduserActivityFilters,
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

const selectedEnduserActivity = createSelector(
    selectEnduserActivityEntities,
    selectSelectedEnduserActivityId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

const selectAllEnduserActivityWithEnduser = createSelector(
    selectAllEnduserActivity,
    EnduserSelectors.selectEnduserEntities,
    (activities, users) => activities.map((activity): Model.EnduserActivityWithEnduserResponse | null => {
        const enduser = users[activity.platformActorId]
        if (enduser) { 
            const actionTypeVerb = transformEnum(activity.eventType, AuditEventActionType, AuditEventActionTypeVerb)
            const schemaArticle = transformEnum(activity.schema, CDPCommon.Model.KnownSchema, CDPCommon.Model.KnownSchemaArticle)
            const schemaLabel = transformEnum(activity.schema, CDPCommon.Model.KnownSchema, CDPCommon.Model.KnownSchemaLabel)
            // const activityDescription = `${enduser.firstName} ${actionTypeVerb} ${schemaArticle} ${schemaLabel}`
            const activityDescription = `${enduser.firstName} ${actionTypeVerb} ${activity.schema}.${activity.table}`
            return { activity, enduser, description: activityDescription }} else { return null }
    }).compactMap(record => record)
)

export const EnduserActivitySelectors = {
    selectEnduserActivityState,
    selectEnduserActivityEntityState,
    selectEnduserActivityFilters,
    selectEnduserActivityRemotePagination,
    selectSelectedEnduserActivityId,
    enduserActivityEntitySelectors,
    selectEnduserActivityIds,
    selectEnduserActivityEntities,
    selectAllEnduserActivity,
    selectEnduserActivityTotal,
    selectEnduserActivityById,
    selectFilteredEnduserActivity,
    selectedEnduserActivity,
    selectAllEnduserActivityWithEnduser
}