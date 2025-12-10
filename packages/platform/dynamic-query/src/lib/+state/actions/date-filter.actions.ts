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

const DATE_FILTER_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.DATE_FILTER_STATE_FEATURE_KEY
]

const updateDateFilterFilters = createAction(
  createActionType(DATE_FILTER_ACTION_IDENTIFIERS, 'Update Filters'),
  props<UpdateRemoteFilters<Model.DateFilterFilters>>()
)

const resetDateFilterFilters = createAction(
  createActionType(DATE_FILTER_ACTION_IDENTIFIERS, 'Reset Filters'),
  props<ResetRemoteFilters>()
)

const resetDateFilterState = createAction(
  createActionType(DATE_FILTER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseDateFilterState = createAction(
  createActionType(DATE_FILTER_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectDateFilter = createAction(
  createActionType(DATE_FILTER_ACTION_IDENTIFIERS, 'Select DateFilter'),
  props<{ dateFilterId: string }>()
)

const deselectDateFilter = createAction(
  createActionType(DATE_FILTER_ACTION_IDENTIFIERS, 'Deselect DateFilter')
)

const resetPagination = createAction(
  createActionType(DATE_FILTER_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createDateFilter = createRemoteActionGroup<
  { parentId: string; parentType: 'query' | 'filterGroup'; request: Model.CreateDateFilterRequest },
  Model.DateFilterResponse
>('Create DateFilter', ...DATE_FILTER_ACTION_IDENTIFIERS)

const getDateFilter = createRemoteActionGroup<
  { dateFilterId: string },
  Model.DateFilterResponse
>('Get DateFilter', ...DATE_FILTER_ACTION_IDENTIFIERS)

const listDateFilters = createRemoteActionGroup<
  { parentId: Nullable<string> | 'auto'; parentType: 'query' | 'filterGroup' | 'none'; pagination: Nullable<Partial<PaginatedQueryParams<Model.DateFilterResponse>>> },
  PaginatedResponse<Model.DateFilterResponse>
>('List DateFilters', ...DATE_FILTER_ACTION_IDENTIFIERS)

const updateDateFilter = createRemoteActionGroup<
  { dateFilterId: string; update: Model.UpdateDateFilterRequest },
  Model.DateFilterResponse
>('Update DateFilter', ...DATE_FILTER_ACTION_IDENTIFIERS)

const deleteDateFilter = createRemoteActionGroup<
  { dateFilterId: string },
  { dateFilterId: string }
>('Delete DateFilter', ...DATE_FILTER_ACTION_IDENTIFIERS)

export const DateFilterLocalActions = {
  updateDateFilterFilters,
  resetDateFilterFilters,
  resetDateFilterState,
  initialiseDateFilterState,
  selectDateFilter,
  deselectDateFilter,
  resetPagination
}

export const DateFilterRemoteActions = createRemoteActionCRUDMap(
  DATE_FILTER_ACTION_IDENTIFIERS,
  {
    create: createDateFilter,
    get: getDateFilter,
    list: listDateFilters,
    update: updateDateFilter,
    delete: deleteDateFilter
  }
)