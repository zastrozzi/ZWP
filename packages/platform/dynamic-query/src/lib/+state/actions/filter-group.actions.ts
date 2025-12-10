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

const FILTER_GROUP_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.FILTER_GROUP_STATE_FEATURE_KEY
]

const updateFilterGroupFilters = createAction(
  createActionType(FILTER_GROUP_ACTION_IDENTIFIERS, 'Update Filters'),
  props<UpdateRemoteFilters<Model.FilterGroupFilters>>()
)

const resetFilterGroupFilters = createAction(
  createActionType(FILTER_GROUP_ACTION_IDENTIFIERS, 'Reset Filters'),
  props<ResetRemoteFilters>()
)

const resetFilterGroupState = createAction(
  createActionType(FILTER_GROUP_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseFilterGroupState = createAction(
  createActionType(FILTER_GROUP_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectFilterGroup = createAction(
  createActionType(FILTER_GROUP_ACTION_IDENTIFIERS, 'Select FilterGroup'),
  props<{ filterGroupId: string }>()
)

const deselectFilterGroup = createAction(
  createActionType(FILTER_GROUP_ACTION_IDENTIFIERS, 'Deselect FilterGroup')
)

const resetPagination = createAction(
  createActionType(FILTER_GROUP_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createFilterGroup = createRemoteActionGroup<
  { parentId: string; parentType: 'query' | 'parentGroup'; request: Model.CreateFilterGroupRequest },
  Model.FilterGroupResponse
>('Create FilterGroup', ...FILTER_GROUP_ACTION_IDENTIFIERS)

const getFilterGroup = createRemoteActionGroup<
  { filterGroupId: string },
  Model.FilterGroupResponse
>('Get FilterGroup', ...FILTER_GROUP_ACTION_IDENTIFIERS)

const listFilterGroups = createRemoteActionGroup<
  { parentId: Nullable<string> | 'auto'; parentType: 'query' | 'parentGroup' | 'none'; pagination: Nullable<Partial<PaginatedQueryParams<Model.FilterGroupResponse>>> },
  PaginatedResponse<Model.FilterGroupResponse>
>('List FilterGroups', ...FILTER_GROUP_ACTION_IDENTIFIERS)

const updateFilterGroup = createRemoteActionGroup<
  { filterGroupId: string; update: Model.UpdateFilterGroupRequest },
  Model.FilterGroupResponse
>('Update FilterGroup', ...FILTER_GROUP_ACTION_IDENTIFIERS)

const deleteFilterGroup = createRemoteActionGroup<
  { filterGroupId: string },
  { filterGroupId: string }
>('Delete FilterGroup', ...FILTER_GROUP_ACTION_IDENTIFIERS)

export const FilterGroupLocalActions = {
  updateFilterGroupFilters,
  resetFilterGroupFilters,
  resetFilterGroupState,
  initialiseFilterGroupState,
  selectFilterGroup,
  deselectFilterGroup,
  resetPagination
}

export const FilterGroupRemoteActions = createRemoteActionCRUDMap(
  FILTER_GROUP_ACTION_IDENTIFIERS,
  {
    create: createFilterGroup,
    get: getFilterGroup,
    list: listFilterGroups,
    update: updateFilterGroup,
    delete: deleteFilterGroup
  }
)