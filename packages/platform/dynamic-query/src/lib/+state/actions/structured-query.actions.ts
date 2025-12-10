import { Model } from '../../model'
import {
  Nullable,
  PaginatedQueryParams,
  PaginatedResponse,
  ResetRemoteFilters,
  UpdateRemoteFilters,
  createActionType,
  createRemoteActionCRUDMap,
  createRemoteActionGroup
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const STRUCTURED_QUERY_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.STRUCTURED_QUERY_STATE_FEATURE_KEY
]

const updateStructuredQueryFilters = createAction(
  createActionType(STRUCTURED_QUERY_ACTION_IDENTIFIERS, 'Update Filters'),
  props<UpdateRemoteFilters<Model.StructuredQueryFilters>>()
)

const resetStructuredQueryFilters = createAction(
  createActionType(STRUCTURED_QUERY_ACTION_IDENTIFIERS, 'Reset Filters'),
  props<ResetRemoteFilters>()
)

const resetStructuredQueryState = createAction(
  createActionType(STRUCTURED_QUERY_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseStructuredQueryState = createAction(
  createActionType(STRUCTURED_QUERY_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectStructuredQuery = createAction(
  createActionType(STRUCTURED_QUERY_ACTION_IDENTIFIERS, 'Select StructuredQuery'),
  props<{ structuredQueryId: string }>()
)

const deselectStructuredQuery = createAction(
  createActionType(STRUCTURED_QUERY_ACTION_IDENTIFIERS, 'Deselect StructuredQuery')
)

const resetPagination = createAction(
  createActionType(STRUCTURED_QUERY_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createStructuredQuery = createRemoteActionGroup<
  { request: Model.CreateStructuredQueryRequest },
  Model.StructuredQueryResponse
>('Create StructuredQuery', ...STRUCTURED_QUERY_ACTION_IDENTIFIERS)

const getStructuredQuery = createRemoteActionGroup<
  { structuredQueryId: string },
  Model.StructuredQueryResponse
>('Get StructuredQuery', ...STRUCTURED_QUERY_ACTION_IDENTIFIERS)

const listStructuredQueries = createRemoteActionGroup<
  { pagination: Nullable<Partial<PaginatedQueryParams<Model.StructuredQueryResponse>>> },
  PaginatedResponse<Model.StructuredQueryResponse>
>('List StructuredQueries', ...STRUCTURED_QUERY_ACTION_IDENTIFIERS)

const updateStructuredQuery = createRemoteActionGroup<
  { structuredQueryId: string; update: Model.UpdateStructuredQueryRequest },
  Model.StructuredQueryResponse
>('Update StructuredQuery', ...STRUCTURED_QUERY_ACTION_IDENTIFIERS)

const deleteStructuredQuery = createRemoteActionGroup<
  { structuredQueryId: string },
  { structuredQueryId: string }
>('Delete StructuredQuery', ...STRUCTURED_QUERY_ACTION_IDENTIFIERS)

export const StructuredQueryLocalActions = {
  updateStructuredQueryFilters,
  resetStructuredQueryFilters,
  resetStructuredQueryState,
  initialiseStructuredQueryState,
  selectStructuredQuery,
  deselectStructuredQuery,
  resetPagination
}

export const StructuredQueryRemoteActions = createRemoteActionCRUDMap(
  STRUCTURED_QUERY_ACTION_IDENTIFIERS,
  {
    create: createStructuredQuery,
    get: getStructuredQuery,
    list: listStructuredQueries,
    update: updateStructuredQuery,
    delete: deleteStructuredQuery
  }
)