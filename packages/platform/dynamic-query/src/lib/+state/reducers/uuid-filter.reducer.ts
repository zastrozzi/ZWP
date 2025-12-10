import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { UUIDFilterLocalActions, UUIDFilterRemoteActions } from '../actions'
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

export interface UUIDFilterFeatureState extends BaseRemoteFeatureState {
  uuidFilters: EntityState<Model.UUIDFilterResponse>
  selectedUUIDFilterId: Nullable<string>
  uuidFiltersRemotePagination: RemotePaginationState<Model.UUIDFilterResponse>
  filters: Model.UUIDFilterFilters
}

export const uuidFilterEntityAdapter: EntityAdapter<Model.UUIDFilterResponse> =
  createEntityAdapter<Model.UUIDFilterResponse>()

export const initialUUIDFilterFeatureState: UUIDFilterFeatureState = {
  ...initialBaseRemoteFeatureState,
  uuidFilters: uuidFilterEntityAdapter.getInitialState(),
  selectedUUIDFilterId: null,
  uuidFiltersRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'dbCreatedAt',
    total: 0,
  },
  filters: Model.initialUUIDFilterFilters
}

export const uuidFilterReducer = createReducer(
  initialUUIDFilterFeatureState,
  on(
    UUIDFilterLocalActions.resetUUIDFilterState,
    () => initialUUIDFilterFeatureState
  ),
  on(
    UUIDFilterLocalActions.initialiseUUIDFilterState,
    () => initialUUIDFilterFeatureState
  ),
  on(
    UUIDFilterLocalActions.updateUUIDFilterFilters,
    (state, { filters }) => ({ ...state, filters: { ...state.filters, ...filters } })
  ),
  on(
    UUIDFilterLocalActions.resetUUIDFilterFilters,
    (state) => ({ ...state, filters: Model.initialUUIDFilterFilters })
  ),
  on(
    UUIDFilterLocalActions.selectUUIDFilter,
    (state, { uuidFilterId }) => ({ ...state, selectedUUIDFilterId: uuidFilterId })
  ),
  on(
    UUIDFilterLocalActions.deselectUUIDFilter,
    (state) => ({ ...state, selectedUUIDFilterId: null })
  ),
  on(
    UUIDFilterLocalActions.resetPagination,
    (state) => ({
      ...state,
      uuidFiltersRemotePagination: { ...state.uuidFiltersRemotePagination, offset: 0 }
    })
  ),
  on(remoteStateUpdateRequest(UUIDFilterRemoteActions.identifiers), state =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(UUIDFilterRemoteActions.identifiers), state =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(UUIDFilterRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    UUIDFilterRemoteActions.create.success,
    (state, { response }) => ({
      ...state,
      uuidFilters: uuidFilterEntityAdapter.setOne(response, state.uuidFilters)
    })
  ),
  on(
    UUIDFilterRemoteActions.get.success,
    (state, { response }) => ({
      ...state,
      uuidFilters: uuidFilterEntityAdapter.setOne(response, state.uuidFilters),
      selectedUUIDFilterId: response.id
    })
  ),
  on(
    UUIDFilterRemoteActions.list.request,
    (state, { pagination }) => ({
      ...state,
      uuidFiltersRemotePagination: { ...state.uuidFiltersRemotePagination, ...pagination }
    })
  ),
  on(
    UUIDFilterRemoteActions.list.success,
    (state, { response }) => ({
      ...state,
      uuidFilters: uuidFilterEntityAdapter.setAll(response.results, state.uuidFilters),
      uuidFiltersRemotePagination: {
        ...state.uuidFiltersRemotePagination,
        total: response.total
      }
    })
  ),
  on(
    UUIDFilterRemoteActions.update.success,
    (state, { response }) => ({
      ...state,
      uuidFilters: uuidFilterEntityAdapter.updateOne({ id: response.id, changes: response }, state.uuidFilters)
    })
  ),
  on(
    UUIDFilterRemoteActions.delete.success,
    (state, { response }) => ({
      ...state,
      uuidFilters: uuidFilterEntityAdapter.removeOne(response.uuidFilterId, state.uuidFilters),
      selectedUUIDFilterId:
        state.selectedUUIDFilterId === response.uuidFilterId ? null : state.selectedUUIDFilterId
    })
  )
)