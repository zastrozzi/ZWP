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

const STRING_FILTER_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.STRING_FILTER_STATE_FEATURE_KEY
]

const updateStringFilterFilters = createAction(
  createActionType(STRING_FILTER_ACTION_IDENTIFIERS, 'Update Filters'),
  props<UpdateRemoteFilters<Model.StringFilterFilters>>()
)

const resetStringFilterFilters = createAction(
  createActionType(STRING_FILTER_ACTION_IDENTIFIERS, 'Reset Filters'),
  props<ResetRemoteFilters>()
)

const resetStringFilterState = createAction(
  createActionType(STRING_FILTER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseStringFilterState = createAction(
  createActionType(STRING_FILTER_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectStringFilter = createAction(
  createActionType(STRING_FILTER_ACTION_IDENTIFIERS, 'Select StringFilter'),
  props<{ stringFilterId: string }>()
)

const deselectStringFilter = createAction(
  createActionType(STRING_FILTER_ACTION_IDENTIFIERS, 'Deselect StringFilter')
)

const resetPagination = createAction(
  createActionType(STRING_FILTER_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createStringFilter = createRemoteActionGroup<
  { parentId: string; parentType: 'query' | 'filterGroup'; request: Model.CreateStringFilterRequest },
  Model.StringFilterResponse
>('Create StringFilter', ...STRING_FILTER_ACTION_IDENTIFIERS)

const getStringFilter = createRemoteActionGroup<
  { stringFilterId: string },
  Model.StringFilterResponse
>('Get StringFilter', ...STRING_FILTER_ACTION_IDENTIFIERS)

const listStringFilters = createRemoteActionGroup<
  { parentId: Nullable<string> | 'auto'; parentType: 'query' | 'filterGroup' | 'none'; pagination: Nullable<Partial<PaginatedQueryParams<Model.StringFilterResponse>>> },
  PaginatedResponse<Model.StringFilterResponse>
>('List StringFilters', ...STRING_FILTER_ACTION_IDENTIFIERS)

const updateStringFilter = createRemoteActionGroup<
  { stringFilterId: string; update: Model.UpdateStringFilterRequest },
  Model.StringFilterResponse
>('Update StringFilter', ...STRING_FILTER_ACTION_IDENTIFIERS)

const deleteStringFilter = createRemoteActionGroup<
  { stringFilterId: string },
  { stringFilterId: string }
>('Delete StringFilter', ...STRING_FILTER_ACTION_IDENTIFIERS)

export const StringFilterLocalActions = {
  updateStringFilterFilters,
  resetStringFilterFilters,
  resetStringFilterState,
  initialiseStringFilterState,
  selectStringFilter,
  deselectStringFilter,
  resetPagination
}

export const StringFilterRemoteActions = createRemoteActionCRUDMap(
  STRING_FILTER_ACTION_IDENTIFIERS,
  {
    create: createStringFilter,
    get: getStringFilter,
    list: listStringFilters,
    update: updateStringFilter,
    delete: deleteStringFilter
  }
)