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

const BOOLEAN_FILTER_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.BOOLEAN_FILTER_STATE_FEATURE_KEY
]

const updateBooleanFilterFilters = createAction(
  createActionType(BOOLEAN_FILTER_ACTION_IDENTIFIERS, 'Update Filters'),
  props<UpdateRemoteFilters<Model.BooleanFilterFilters>>()
)

const resetBooleanFilterFilters = createAction(
  createActionType(BOOLEAN_FILTER_ACTION_IDENTIFIERS, 'Reset Filters'),
  props<ResetRemoteFilters>()
)

const resetBooleanFilterState = createAction(
  createActionType(BOOLEAN_FILTER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseBooleanFilterState = createAction(
  createActionType(BOOLEAN_FILTER_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectBooleanFilter = createAction(
  createActionType(BOOLEAN_FILTER_ACTION_IDENTIFIERS, 'Select BooleanFilter'),
  props<{ booleanFilterId: string }>()
)

const deselectBooleanFilter = createAction(
  createActionType(BOOLEAN_FILTER_ACTION_IDENTIFIERS, 'Deselect BooleanFilter')
)

const resetPagination = createAction(
  createActionType(BOOLEAN_FILTER_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createBooleanFilter = createRemoteActionGroup<
  { parentId: string; parentType: 'query' | 'filterGroup'; request: Model.CreateBooleanFilterRequest },
  Model.BooleanFilterResponse
>('Create BooleanFilter', ...BOOLEAN_FILTER_ACTION_IDENTIFIERS)

const getBooleanFilter = createRemoteActionGroup<
  { booleanFilterId: string },
  Model.BooleanFilterResponse
>('Get BooleanFilter', ...BOOLEAN_FILTER_ACTION_IDENTIFIERS)

const listBooleanFilters = createRemoteActionGroup<
  { parentId: Nullable<string> | 'auto'; parentType: 'query' | 'filterGroup' | 'none'; pagination: Nullable<Partial<PaginatedQueryParams<Model.BooleanFilterResponse>>> },
  PaginatedResponse<Model.BooleanFilterResponse>
>('List BooleanFilters', ...BOOLEAN_FILTER_ACTION_IDENTIFIERS)

const updateBooleanFilter = createRemoteActionGroup<
  { booleanFilterId: string; update: Model.UpdateBooleanFilterRequest },
  Model.BooleanFilterResponse
>('Update BooleanFilter', ...BOOLEAN_FILTER_ACTION_IDENTIFIERS)

const deleteBooleanFilter = createRemoteActionGroup<
  { booleanFilterId: string },
  { booleanFilterId: string }
>('Delete BooleanFilter', ...BOOLEAN_FILTER_ACTION_IDENTIFIERS)

export const BooleanFilterLocalActions = {
  updateBooleanFilterFilters,
  resetBooleanFilterFilters,
  resetBooleanFilterState,
  initialiseBooleanFilterState,
  selectBooleanFilter,
  deselectBooleanFilter,
  resetPagination
}

export const BooleanFilterRemoteActions = createRemoteActionCRUDMap(
  BOOLEAN_FILTER_ACTION_IDENTIFIERS,
  {
    create: createBooleanFilter,
    get: getBooleanFilter,
    list: listBooleanFilters,
    update: updateBooleanFilter,
    delete: deleteBooleanFilter
  }
)