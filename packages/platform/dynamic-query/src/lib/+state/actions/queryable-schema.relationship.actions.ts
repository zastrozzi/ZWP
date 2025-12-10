import { Model } from '../../model'
import {
  Nullable,
  PaginatedQueryParams,
  PaginatedResponse,
  createActionType,
  createRemoteActionGroup,
  createRemoteActionMap
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const QUERYABLE_SCHEMA_RELATIONSHIP_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.QUERYABLE_SCHEMA_RELATIONSHIP_STATE_FEATURE_KEY
]

const selectRelationship = createAction(
  createActionType(QUERYABLE_SCHEMA_RELATIONSHIP_ACTION_IDENTIFIERS, 'Select Relationship'),
  props<{ relationshipId: string }>()
)

const deselectRelationship = createAction(
  createActionType(QUERYABLE_SCHEMA_RELATIONSHIP_ACTION_IDENTIFIERS, 'Deselect Relationship')
)

const resetPagination = createAction(
  createActionType(QUERYABLE_SCHEMA_RELATIONSHIP_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getRelationship = createRemoteActionGroup<
  { relationshipId: string },
  Model.QueryableSchemaRelationshipResponse
>('Get Relationship', ...QUERYABLE_SCHEMA_RELATIONSHIP_ACTION_IDENTIFIERS)

const listRelationships = createRemoteActionGroup<
  { 
    tableId: Nullable<string>, 
    relationshipType: Nullable<Model.RelationshipType>, 
    pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaRelationshipResponse>>> 
    },
  PaginatedResponse<Model.QueryableSchemaRelationshipResponse>
>('List Relationships', ...QUERYABLE_SCHEMA_RELATIONSHIP_ACTION_IDENTIFIERS)

export const QueryableSchemaRelationshipLocalActions = {
  selectRelationship,
  deselectRelationship,
  resetPagination
}

export const QueryableSchemaRelationshipRemoteActions = createRemoteActionMap(
  QUERYABLE_SCHEMA_RELATIONSHIP_ACTION_IDENTIFIERS,
  {
    getRelationship,
    listRelationships
  }
)