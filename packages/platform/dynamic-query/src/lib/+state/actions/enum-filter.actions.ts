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

const ENUM_FILTER_ACTION_IDENTIFIERS = [
  Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER,
  Identifiers.ENUM_FILTER_STATE_FEATURE_KEY
]

const updateEnumFilterFilters = createAction(
  createActionType(ENUM_FILTER_ACTION_IDENTIFIERS, 'Update Filters'),
  props<UpdateRemoteFilters<Model.EnumFilterFilters>>()
)

const resetEnumFilterFilters = createAction(
  createActionType(ENUM_FILTER_ACTION_IDENTIFIERS, 'Reset Filters'),
  props<ResetRemoteFilters>()
)

const resetEnumFilterState = createAction(
  createActionType(ENUM_FILTER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseEnumFilterState = createAction(
  createActionType(ENUM_FILTER_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectEnumFilter = createAction(
  createActionType(ENUM_FILTER_ACTION_IDENTIFIERS, 'Select EnumFilter'),
  props<{ enumFilterId: string }>()
)

const deselectEnumFilter = createAction(
  createActionType(ENUM_FILTER_ACTION_IDENTIFIERS, 'Deselect EnumFilter')
)

const resetPagination = createAction(
  createActionType(ENUM_FILTER_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createEnumFilter = createRemoteActionGroup<
  { parentId: string; parentType: 'query' | 'filterGroup'; request: Model.CreateEnumFilterRequest },
  Model.EnumFilterResponse
>('Create EnumFilter', ...ENUM_FILTER_ACTION_IDENTIFIERS)

const getEnumFilter = createRemoteActionGroup<
  { enumFilterId: string },
  Model.EnumFilterResponse
>('Get EnumFilter', ...ENUM_FILTER_ACTION_IDENTIFIERS)

const listEnumFilters = createRemoteActionGroup<
  { parentId: Nullable<string> | 'auto'; parentType: 'query' | 'filterGroup' | 'none'; pagination: Nullable<Partial<PaginatedQueryParams<Model.EnumFilterResponse>>> },
  PaginatedResponse<Model.EnumFilterResponse>
>('List EnumFilters', ...ENUM_FILTER_ACTION_IDENTIFIERS)

const updateEnumFilter = createRemoteActionGroup<
  { enumFilterId: string; update: Model.UpdateEnumFilterRequest },
  Model.EnumFilterResponse
>('Update EnumFilter', ...ENUM_FILTER_ACTION_IDENTIFIERS)

const deleteEnumFilter = createRemoteActionGroup<
  { enumFilterId: string },
  { enumFilterId: string }
>('Delete EnumFilter', ...ENUM_FILTER_ACTION_IDENTIFIERS)

export const EnumFilterLocalActions = {
  updateEnumFilterFilters,
  resetEnumFilterFilters,
  resetEnumFilterState,
  initialiseEnumFilterState,
  selectEnumFilter,
  deselectEnumFilter,
  resetPagination
}

export const EnumFilterRemoteActions = createRemoteActionCRUDMap(
  ENUM_FILTER_ACTION_IDENTIFIERS,
  {
    create: createEnumFilter,
    get: getEnumFilter,
    list: listEnumFilters,
    update: updateEnumFilter,
    delete: deleteEnumFilter
  }
)