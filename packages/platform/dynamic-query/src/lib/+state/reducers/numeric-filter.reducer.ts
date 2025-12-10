import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { NumericFilterLocalActions, NumericFilterRemoteActions } from '../actions'
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

export interface NumericFilterFeatureState extends BaseRemoteFeatureState {
  numericFilters: EntityState<Model.NumericFilterResponse>
  selectedNumericFilterId: Nullable<string>
  numericFiltersRemotePagination: RemotePaginationState<Model.NumericFilterResponse>
  filters: Model.NumericFilterFilters
}

export const numericFilterEntityAdapter: EntityAdapter<Model.NumericFilterResponse> =
  createEntityAdapter<Model.NumericFilterResponse>()

export const initialNumericFilterFeatureState: NumericFilterFeatureState = {
  ...initialBaseRemoteFeatureState,
  numericFilters: numericFilterEntityAdapter.getInitialState(),
  selectedNumericFilterId: null,
  numericFiltersRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'dbCreatedAt',
    total: 0,
  },
  filters: Model.initialNumericFilterFilters
}

export const numericFilterReducer = createReducer(
  initialNumericFilterFeatureState,
  on(
    NumericFilterLocalActions.resetNumericFilterState,
    () => initialNumericFilterFeatureState
  ),
  on(
    NumericFilterLocalActions.initialiseNumericFilterState,
    () => initialNumericFilterFeatureState
  ),
  on(
    NumericFilterLocalActions.updateNumericFilterFilters,
    (state, { filters }) => ({ ...state, filters: { ...state.filters, ...filters } })
  ),
  on(
    NumericFilterLocalActions.resetNumericFilterFilters,
    (state) => ({ ...state, filters: Model.initialNumericFilterFilters })
  ),
  on(
    NumericFilterLocalActions.selectNumericFilter,
    (state, { numericFilterId }) => ({ ...state, selectedNumericFilterId: numericFilterId })
  ),
  on(
    NumericFilterLocalActions.deselectNumericFilter,
    (state) => ({ ...state, selectedNumericFilterId: null })
  ),
  on(
    NumericFilterLocalActions.resetPagination,
    (state) => ({
      ...state,
      numericFiltersRemotePagination: { ...state.numericFiltersRemotePagination, offset: 0 }
    })
  ),
  on(remoteStateUpdateRequest(NumericFilterRemoteActions.identifiers), state =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(NumericFilterRemoteActions.identifiers), state =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(NumericFilterRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    NumericFilterRemoteActions.create.success,
    (state, { response }) => ({
      ...state,
      numericFilters: numericFilterEntityAdapter.setOne(response, state.numericFilters)
    })
  ),
  on(
    NumericFilterRemoteActions.get.success,
    (state, { response }) => ({
      ...state,
      numericFilters: numericFilterEntityAdapter.setOne(response, state.numericFilters),
      selectedNumericFilterId: response.id
    })
  ),
  on(
    NumericFilterRemoteActions.list.request,
    (state, { pagination }) => ({
      ...state,
      numericFiltersRemotePagination: { ...state.numericFiltersRemotePagination, ...pagination }
    })
  ),
  on(
    NumericFilterRemoteActions.list.success,
    (state, { response }) => ({
      ...state,
      numericFilters: numericFilterEntityAdapter.setAll(response.results, state.numericFilters),
      numericFiltersRemotePagination: {
        ...state.numericFiltersRemotePagination,
        total: response.total
      }
    })
  ),
  on(
    NumericFilterRemoteActions.update.success,
    (state, { response }) => ({
      ...state,
      numericFilters: numericFilterEntityAdapter.updateOne({ id: response.id, changes: response }, state.numericFilters)
    })
  ),
  on(
    NumericFilterRemoteActions.delete.success,
    (state, { response }) => ({
      ...state,
      numericFilters: numericFilterEntityAdapter.removeOne(response.numericFilterId, state.numericFilters),
      selectedNumericFilterId:
        state.selectedNumericFilterId === response.numericFilterId ? null : state.selectedNumericFilterId
    })
  )
)