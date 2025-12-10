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

const NUMERIC_FILTER_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.NUMERIC_FILTER_STATE_FEATURE_KEY
]

const updateNumericFilterFilters = createAction(
  createActionType(NUMERIC_FILTER_ACTION_IDENTIFIERS, 'Update Filters'),
  props<UpdateRemoteFilters<Model.NumericFilterFilters>>()
)

const resetNumericFilterFilters = createAction(
  createActionType(NUMERIC_FILTER_ACTION_IDENTIFIERS, 'Reset Filters'),
  props<ResetRemoteFilters>()
)

const resetNumericFilterState = createAction(
  createActionType(NUMERIC_FILTER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseNumericFilterState = createAction(
  createActionType(NUMERIC_FILTER_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectNumericFilter = createAction(
  createActionType(NUMERIC_FILTER_ACTION_IDENTIFIERS, 'Select NumericFilter'),
  props<{ numericFilterId: string }>()
)

const deselectNumericFilter = createAction(
  createActionType(NUMERIC_FILTER_ACTION_IDENTIFIERS, 'Deselect NumericFilter')
)

const resetPagination = createAction(
  createActionType(NUMERIC_FILTER_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createNumericFilter = createRemoteActionGroup<
  { parentId: string; parentType: 'query' | 'filterGroup'; request: Model.CreateNumericFilterRequest },
  Model.NumericFilterResponse
>('Create NumericFilter', ...NUMERIC_FILTER_ACTION_IDENTIFIERS)

const getNumericFilter = createRemoteActionGroup<
  { numericFilterId: string },
  Model.NumericFilterResponse
>('Get NumericFilter', ...NUMERIC_FILTER_ACTION_IDENTIFIERS)

const listNumericFilters = createRemoteActionGroup<
  { parentId: Nullable<string> | 'auto'; parentType: 'query' | 'filterGroup' | 'none'; pagination: Nullable<Partial<PaginatedQueryParams<Model.NumericFilterResponse>>> },
  PaginatedResponse<Model.NumericFilterResponse>
>('List NumericFilters', ...NUMERIC_FILTER_ACTION_IDENTIFIERS)

const updateNumericFilter = createRemoteActionGroup<
  { numericFilterId: string; update: Model.UpdateNumericFilterRequest },
  Model.NumericFilterResponse
>('Update NumericFilter', ...NUMERIC_FILTER_ACTION_IDENTIFIERS)

const deleteNumericFilter = createRemoteActionGroup<
  { numericFilterId: string },
  { numericFilterId: string }
>('Delete NumericFilter', ...NUMERIC_FILTER_ACTION_IDENTIFIERS)

export const NumericFilterLocalActions = {
  updateNumericFilterFilters,
  resetNumericFilterFilters,
  resetNumericFilterState,
  initialiseNumericFilterState,
  selectNumericFilter,
  deselectNumericFilter,
  resetPagination
}

export const NumericFilterRemoteActions = createRemoteActionCRUDMap(
  NUMERIC_FILTER_ACTION_IDENTIFIERS,
  {
    create: createNumericFilter,
    get: getNumericFilter,
    list: listNumericFilters,
    update: updateNumericFilter,
    delete: deleteNumericFilter
  }
)