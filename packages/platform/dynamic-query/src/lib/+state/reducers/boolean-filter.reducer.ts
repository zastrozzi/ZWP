import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { BooleanFilterLocalActions, BooleanFilterRemoteActions } from '../actions'
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

export interface BooleanFilterFeatureState extends BaseRemoteFeatureState {
  booleanFilters: EntityState<Model.BooleanFilterResponse>
  selectedBooleanFilterId: Nullable<string>
  booleanFiltersRemotePagination: RemotePaginationState<Model.BooleanFilterResponse>
  filters: Model.BooleanFilterFilters
}

export const booleanFilterEntityAdapter: EntityAdapter<Model.BooleanFilterResponse> =
  createEntityAdapter<Model.BooleanFilterResponse>()

export const initialBooleanFilterFeatureState: BooleanFilterFeatureState = {
  ...initialBaseRemoteFeatureState,
  booleanFilters: booleanFilterEntityAdapter.getInitialState(),
  selectedBooleanFilterId: null,
  booleanFiltersRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'dbCreatedAt',
    total: 0,
  },
  filters: Model.initialBooleanFilterFilters
}

export const booleanFilterReducer = createReducer(
  initialBooleanFilterFeatureState,
  on(
    BooleanFilterLocalActions.resetBooleanFilterState,
    () => initialBooleanFilterFeatureState
  ),
  on(
    BooleanFilterLocalActions.initialiseBooleanFilterState,
    () => initialBooleanFilterFeatureState
  ),
  on(
    BooleanFilterLocalActions.updateBooleanFilterFilters,
    (state, { filters }) => ({ ...state, filters: { ...state.filters, ...filters } })
  ),
  on(
    BooleanFilterLocalActions.resetBooleanFilterFilters,
    (state) => ({ ...state, filters: Model.initialBooleanFilterFilters })
  ),
  on(
    BooleanFilterLocalActions.selectBooleanFilter,
    (state, { booleanFilterId }) => ({ ...state, selectedBooleanFilterId: booleanFilterId })
  ),
  on(
    BooleanFilterLocalActions.deselectBooleanFilter,
    (state) => ({ ...state, selectedBooleanFilterId: null })
  ),
  on(
    BooleanFilterLocalActions.resetPagination,
    (state) => ({
      ...state,
      booleanFiltersRemotePagination: { ...state.booleanFiltersRemotePagination, offset: 0 }
    })
  ),
  on(remoteStateUpdateRequest(BooleanFilterRemoteActions.identifiers), state =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(BooleanFilterRemoteActions.identifiers), state =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(BooleanFilterRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    BooleanFilterRemoteActions.create.success,
    (state, { response }) => ({
      ...state,
      booleanFilters: booleanFilterEntityAdapter.setOne(response, state.booleanFilters)
    })
  ),
  on(
    BooleanFilterRemoteActions.get.success,
    (state, { response }) => ({
      ...state,
      booleanFilters: booleanFilterEntityAdapter.setOne(response, state.booleanFilters),
      selectedBooleanFilterId: response.id
    })
  ),
  on(
    BooleanFilterRemoteActions.list.request,
    (state, { pagination }) => ({
      ...state,
      booleanFiltersRemotePagination: { ...state.booleanFiltersRemotePagination, ...pagination }
    })
  ),
  on(
    BooleanFilterRemoteActions.list.success,
    (state, { response }) => ({
      ...state,
      booleanFilters: booleanFilterEntityAdapter.setAll(response.results, state.booleanFilters),
      booleanFiltersRemotePagination: {
        ...state.booleanFiltersRemotePagination,
        total: response.total
      }
    })
  ),
  on(
    BooleanFilterRemoteActions.update.success,
    (state, { response }) => ({
      ...state,
      booleanFilters: booleanFilterEntityAdapter.updateOne({ id: response.id, changes: response }, state.booleanFilters)
    })
  ),
  on(
    BooleanFilterRemoteActions.delete.success,
    (state, { response }) => ({
      ...state,
      booleanFilters: booleanFilterEntityAdapter.removeOne(response.booleanFilterId, state.booleanFilters),
      selectedBooleanFilterId:
        state.selectedBooleanFilterId === response.booleanFilterId ? null : state.selectedBooleanFilterId
    })
  )
)