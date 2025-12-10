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

const UUID_FILTER_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.UUID_FILTER_STATE_FEATURE_KEY
]

const updateUUIDFilterFilters = createAction(
  createActionType(UUID_FILTER_ACTION_IDENTIFIERS, 'Update Filters'),
  props<UpdateRemoteFilters<Model.UUIDFilterFilters>>()
)

const resetUUIDFilterFilters = createAction(
  createActionType(UUID_FILTER_ACTION_IDENTIFIERS, 'Reset Filters'),
  props<ResetRemoteFilters>()
)

const resetUUIDFilterState = createAction(
  createActionType(UUID_FILTER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseUUIDFilterState = createAction(
  createActionType(UUID_FILTER_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectUUIDFilter = createAction(
  createActionType(UUID_FILTER_ACTION_IDENTIFIERS, 'Select UUIDFilter'),
  props<{ uuidFilterId: string }>()
)

const deselectUUIDFilter = createAction(
  createActionType(UUID_FILTER_ACTION_IDENTIFIERS, 'Deselect UUIDFilter')
)

const resetPagination = createAction(
  createActionType(UUID_FILTER_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createUUIDFilter = createRemoteActionGroup<
  { parentId: string; parentType: 'query' | 'filterGroup'; request: Model.CreateUUIDFilterRequest },
  Model.UUIDFilterResponse
>('Create UUIDFilter', ...UUID_FILTER_ACTION_IDENTIFIERS)

const getUUIDFilter = createRemoteActionGroup<
  { uuidFilterId: string },
  Model.UUIDFilterResponse
>('Get UUIDFilter', ...UUID_FILTER_ACTION_IDENTIFIERS)

const listUUIDFilters = createRemoteActionGroup<
  { parentId: Nullable<string> | 'auto'; parentType: 'query' | 'filterGroup' | 'none'; pagination: Nullable<Partial<PaginatedQueryParams<Model.UUIDFilterResponse>>> },
  PaginatedResponse<Model.UUIDFilterResponse>
>('List UUIDFilters', ...UUID_FILTER_ACTION_IDENTIFIERS)

const updateUUIDFilter = createRemoteActionGroup<
  { uuidFilterId: string; update: Model.UpdateUUIDFilterRequest },
  Model.UUIDFilterResponse
>('Update UUIDFilter', ...UUID_FILTER_ACTION_IDENTIFIERS)

const deleteUUIDFilter = createRemoteActionGroup<
  { uuidFilterId: string },
  { uuidFilterId: string }
>('Delete UUIDFilter', ...UUID_FILTER_ACTION_IDENTIFIERS)

export const UUIDFilterLocalActions = {
  updateUUIDFilterFilters,
  resetUUIDFilterFilters,
  resetUUIDFilterState,
  initialiseUUIDFilterState,
  selectUUIDFilter,
  deselectUUIDFilter,
  resetPagination
}

export const UUIDFilterRemoteActions = createRemoteActionCRUDMap(
  UUID_FILTER_ACTION_IDENTIFIERS,
  {
    create: createUUIDFilter,
    get: getUUIDFilter,
    list: listUUIDFilters,
    update: updateUUIDFilter,
    delete: deleteUUIDFilter
  }
)