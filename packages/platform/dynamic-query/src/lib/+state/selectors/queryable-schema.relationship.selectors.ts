import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'
import { QueryableSchemaTableSelectors } from './queryable-schema.table.selectors'
import { Model } from '../../model'

const selectQueryableSchemaRelationshipState = createFeatureSelector<Reducers.QueryableSchemaRelationshipFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
        Identifiers.QUERYABLE_SCHEMA_RELATIONSHIP_STATE_FEATURE_KEY
    )
)

const selectQueryableSchemaRelationshipRemotePagination = createSelector(selectQueryableSchemaRelationshipState, (state) => state.relationshipsRemotePagination)
const selectQueryableSchemaRelationshipRemoteState = createSelector(selectQueryableSchemaRelationshipState, selectRemoteState)

const selectSelectedQueryableSchemaRelationshipId = createSelector(selectQueryableSchemaRelationshipState, (state) => state.selectedRelationshipId)

const queryableSchemaRelationshipEntitySelectors = Reducers.queryableSchemaRelationshipEntityAdapter.getSelectors()
const selectQueryableSchemaRelationshipEntityState = createSelector(selectQueryableSchemaRelationshipState, (state) => state.relationships)
const selectQueryableSchemaRelationshipIds = createSelector(selectQueryableSchemaRelationshipEntityState, queryableSchemaRelationshipEntitySelectors.selectIds)
const selectQueryableSchemaRelationshipEntities = createSelector(selectQueryableSchemaRelationshipEntityState, queryableSchemaRelationshipEntitySelectors.selectEntities)
const selectAllQueryableSchemaRelationships = createSelector(selectQueryableSchemaRelationshipEntityState, queryableSchemaRelationshipEntitySelectors.selectAll)
const selectQueryableSchemaRelationshipTotal = createSelector(selectQueryableSchemaRelationshipEntityState, queryableSchemaRelationshipEntitySelectors.selectTotal)
const selectQueryableSchemaRelationshipById = (id: string) => createSelector(selectQueryableSchemaRelationshipEntities, (entities) => entities[id])

const selectedQueryableSchemaRelationship = createSelector(
    selectQueryableSchemaRelationshipEntities,
    selectSelectedQueryableSchemaRelationshipId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectQueryableSchemaRelationshipsForSelectedTable = createSelector(
    QueryableSchemaTableSelectors.selectSelectedQueryableSchemaTableId,
    selectAllQueryableSchemaRelationships,
    (selectedTableId, relationships) => relationships.filter(relationship => relationship.fromTableId === selectedTableId)
)

const selectQueryableSchemaRelationshipsForTable = (tableId: string) => createSelector(
    selectAllQueryableSchemaRelationships,
    (relationships) => relationships.filter(relationship => relationship.fromTableId === tableId)
)

const selectUniqueQueryableSchemaRelationshipsForTable = (tableId: string) => createSelector(
    selectQueryableSchemaRelationshipsForTable(tableId),
    (relationships) => {
        const uniqueRelationships = new Map<string, Model.QueryableSchemaRelationshipResponse>()
        relationships.forEach(relationship => {
            uniqueRelationships.set(relationship.toTableId, relationship)
        })
        return Array.from(uniqueRelationships.values())
    }
)

export const QueryableSchemaRelationshipSelectors = {
    selectQueryableSchemaRelationshipState,
    selectQueryableSchemaRelationshipRemotePagination,
    selectQueryableSchemaRelationshipRemoteState,

    selectSelectedQueryableSchemaRelationshipId,

    queryableSchemaRelationshipEntitySelectors,
    selectQueryableSchemaRelationshipEntityState,
    selectQueryableSchemaRelationshipIds,
    selectQueryableSchemaRelationshipEntities,
    selectAllQueryableSchemaRelationships,
    selectQueryableSchemaRelationshipTotal,
    selectQueryableSchemaRelationshipById,
    selectedQueryableSchemaRelationship,

    selectQueryableSchemaRelationshipsForSelectedTable,
    selectQueryableSchemaRelationshipsForTable,
    selectUniqueQueryableSchemaRelationshipsForTable
}