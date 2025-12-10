import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { EnumFilterLocalActions, EnumFilterRemoteActions } from '../actions'
import {
  BaseRemoteFeatureState,
  Nullable,
  RemotePaginationState,
  initialBaseRemoteFeatureState,
  remoteFailureState,
  remoteRequestState,
  remoteStateUpdateFailure,
  remoteStateUpdateRequest,
  remoteStateUpdateSuccess,
  remoteSuccessState,
} from '@zwp/platform.common'

export interface EnumFilterFeatureState extends BaseRemoteFeatureState {
  enumFilters: EntityState<Model.EnumFilterResponse>
  selectedEnumFilterId: Nullable<string>
  enumFiltersRemotePagination: RemotePaginationState<Model.EnumFilterResponse>
  filters: Model.EnumFilterFilters
}

export const enumFilterEntityAdapter: EntityAdapter<Model.EnumFilterResponse> =
  createEntityAdapter<Model.EnumFilterResponse>()

export const initialEnumFilterFeatureState: EnumFilterFeatureState = {
  ...initialBaseRemoteFeatureState,
  enumFilters: enumFilterEntityAdapter.getInitialState(),
  selectedEnumFilterId: null,
  enumFiltersRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'dbCreatedAt',
    total: 0,
  },
  filters: Model.initialEnumFilterFilters
}

export const enumFilterReducer = createReducer(
  initialEnumFilterFeatureState,
  on(
    EnumFilterLocalActions.resetEnumFilterState,
    () => initialEnumFilterFeatureState
  ),
  on(
    EnumFilterLocalActions.initialiseEnumFilterState,
    () => initialEnumFilterFeatureState
  ),
  on(
    EnumFilterLocalActions.updateEnumFilterFilters,
    (state, { filters }) => ({ ...state, filters: { ...state.filters, ...filters } })
  ),
  on(
    EnumFilterLocalActions.resetEnumFilterFilters,
    (state) => ({ ...state, filters: Model.initialEnumFilterFilters })
  ),
  on(
    EnumFilterLocalActions.selectEnumFilter,
    (state, { enumFilterId }) => ({ ...state, selectedEnumFilterId: enumFilterId })
  ),
  on(
    EnumFilterLocalActions.deselectEnumFilter,
    (state) => ({ ...state, selectedEnumFilterId: null })
  ),
  on(
    EnumFilterLocalActions.resetPagination,
    (state) => ({
      ...state,
      enumFiltersRemotePagination: { ...state.enumFiltersRemotePagination, offset: 0 }
    })
  ),
  on(remoteStateUpdateRequest(EnumFilterRemoteActions.identifiers), state =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(EnumFilterRemoteActions.identifiers), state =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(EnumFilterRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    EnumFilterRemoteActions.create.success,
    (state, { response }) => ({
      ...state,
      enumFilters: enumFilterEntityAdapter.setOne(response, state.enumFilters)
    })
  ),
  on(
    EnumFilterRemoteActions.get.success,
    (state, { response }) => ({
      ...state,
      enumFilters: enumFilterEntityAdapter.setOne(response, state.enumFilters),
      selectedEnumFilterId: response.id
    })
  ),
  on(
    EnumFilterRemoteActions.list.request,
    (state, { pagination }) => ({
      ...state,
      enumFiltersRemotePagination: { ...state.enumFiltersRemotePagination, ...pagination }
    })
  ),
  on(
    EnumFilterRemoteActions.list.success,
    (state, { response }) => ({
      ...state,
      enumFilters: enumFilterEntityAdapter.setAll(response.results, state.enumFilters),
      enumFiltersRemotePagination: {
        ...state.enumFiltersRemotePagination,
        total: response.total
      }
    })
  ),
  on(
    EnumFilterRemoteActions.update.success,
    (state, { response }) => ({
      ...state,
      enumFilters: enumFilterEntityAdapter.updateOne({ id: response.id, changes: response }, state.enumFilters)
    })
  ),
  on(
    EnumFilterRemoteActions.delete.success,
    (state, { response }) => ({
      ...state,
      enumFilters: enumFilterEntityAdapter.removeOne(response.enumFilterId, state.enumFilters),
      selectedEnumFilterId:
        state.selectedEnumFilterId === response.enumFilterId ? null : state.selectedEnumFilterId
    })
  )
)