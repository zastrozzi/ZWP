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

const QUERYABLE_SCHEMA_COLUMN_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.QUERYABLE_SCHEMA_COLUMN_STATE_FEATURE_KEY
]

const selectColumn = createAction(
  createActionType(QUERYABLE_SCHEMA_COLUMN_ACTION_IDENTIFIERS, 'Select Column'),
  props<{ columnId: string }>()
)

const deselectColumn = createAction(
  createActionType(QUERYABLE_SCHEMA_COLUMN_ACTION_IDENTIFIERS, 'Deselect Column')
)

const resetPagination = createAction(
  createActionType(QUERYABLE_SCHEMA_COLUMN_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getColumn = createRemoteActionGroup<
  { columnId: string },
  Model.QueryableSchemaColumnResponse
>('Get Column', ...QUERYABLE_SCHEMA_COLUMN_ACTION_IDENTIFIERS)

const listColumns = createRemoteActionGroup<
  { tableId: Nullable<string>, pagination: Nullable<Partial<PaginatedQueryParams<Model.QueryableSchemaColumnResponse>>> },
  PaginatedResponse<Model.QueryableSchemaColumnResponse>
>('List Columns', ...QUERYABLE_SCHEMA_COLUMN_ACTION_IDENTIFIERS)

export const QueryableSchemaColumnLocalActions = {
  selectColumn,
  deselectColumn,
  resetPagination
}

export const QueryableSchemaColumnRemoteActions = createRemoteActionMap(
  QUERYABLE_SCHEMA_COLUMN_ACTION_IDENTIFIERS,
  {
    getColumn,
    listColumns
  }
)