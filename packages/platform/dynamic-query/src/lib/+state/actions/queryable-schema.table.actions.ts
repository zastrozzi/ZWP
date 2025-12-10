import { Model } from '../../model'
import {
  Nullable,
  PaginatedQueryParams,
  PaginatedResponse,
  ResetRemoteFilters,
  UpdateRemoteFilters,
  createActionType,
  createRemoteActionGroup,
  createRemoteActionMap
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.QUERYABLE_SCHEMA_TABLE_STATE_FEATURE_KEY
]

const updateTableFilters = createAction(
    createActionType(QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.QueryableSchemaTableFilters>>()
)
const resetTableFilters = createAction(
    createActionType(QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)
const resetTableState = createAction(
    createActionType(QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseTableState = createAction(
    createActionType(QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectTable = createAction(
  createActionType(QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS, 'Select Table'),
  props<{ tableId: string }>()
)

const deselectTable = createAction(
  createActionType(QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS, 'Deselect Table')
)

const resetPagination = createAction(
  createActionType(QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getTable = createRemoteActionGroup<
  { tableId: string },
  Model.QueryableSchemaTableResponse
>('Get Table', ...QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS)

const listTables = createRemoteActionGroup<
  { pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaTableResponse>>> },
  PaginatedResponse<Model.QueryableSchemaTableResponse>
>('List Tables', ...QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS)

export const QueryableSchemaTableLocalActions = {
  updateTableFilters,
  resetTableFilters,
  resetTableState,
  initialiseTableState,
  selectTable,
  deselectTable,
  resetPagination
}

export const QueryableSchemaTableRemoteActions = createRemoteActionMap(
  QUERYABLE_SCHEMA_TABLE_ACTION_IDENTIFIERS,
  {
    getTable,
    listTables
  }
)