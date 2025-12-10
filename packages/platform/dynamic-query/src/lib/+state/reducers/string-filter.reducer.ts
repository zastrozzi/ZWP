import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { StringFilterLocalActions, StringFilterRemoteActions } from '../actions'
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

export interface StringFilterFeatureState extends BaseRemoteFeatureState {
  stringFilters: EntityState<Model.StringFilterResponse>
  selectedStringFilterId: Nullable<string>
  stringFiltersRemotePagination: RemotePaginationState<Model.StringFilterResponse>
  filters: Model.StringFilterFilters
}

export const stringFilterEntityAdapter: EntityAdapter<Model.StringFilterResponse> =
  createEntityAdapter<Model.StringFilterResponse>()

export const initialStringFilterFeatureState: StringFilterFeatureState = {
  ...initialBaseRemoteFeatureState,
  stringFilters: stringFilterEntityAdapter.getInitialState(),
  selectedStringFilterId: null,
  stringFiltersRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'dbCreatedAt',
    total: 0,
  },
  filters: Model.initialStringFilterFilters
}

export const stringFilterReducer = createReducer(
  initialStringFilterFeatureState,
  on(
    StringFilterLocalActions.resetStringFilterState,
    () => initialStringFilterFeatureState
  ),
  on(
    StringFilterLocalActions.initialiseStringFilterState,
    () => initialStringFilterFeatureState
  ),
  on(
    StringFilterLocalActions.updateStringFilterFilters,
    (state, { filters }) => ({ ...state, filters: { ...state.filters, ...filters } })
  ),
  on(
    StringFilterLocalActions.resetStringFilterFilters,
    (state) => ({ ...state, filters: Model.initialStringFilterFilters })
  ),
  on(
    StringFilterLocalActions.selectStringFilter,
    (state, { stringFilterId }) => ({ ...state, selectedStringFilterId: stringFilterId })
  ),
  on(
    StringFilterLocalActions.deselectStringFilter,
    (state) => ({ ...state, selectedStringFilterId: null })
  ),
  on(
    StringFilterLocalActions.resetPagination,
    (state) => ({
      ...state,
      stringFiltersRemotePagination: { ...state.stringFiltersRemotePagination, offset: 0 }
    })
  ),
  on(remoteStateUpdateRequest(StringFilterRemoteActions.identifiers), state =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(StringFilterRemoteActions.identifiers), state =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(StringFilterRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    StringFilterRemoteActions.create.success,
    (state, { response }) => ({
      ...state,
      stringFilters: stringFilterEntityAdapter.setOne(response, state.stringFilters)
    })
  ),
  on(
    StringFilterRemoteActions.get.success,
    (state, { response }) => ({
      ...state,
      stringFilters: stringFilterEntityAdapter.setOne(response, state.stringFilters),
      selectedStringFilterId: response.id
    })
  ),
  on(
    StringFilterRemoteActions.list.request,
    (state, { pagination }) => ({
      ...state,
      stringFiltersRemotePagination: { ...state.stringFiltersRemotePagination, ...pagination }
    })
  ),
  on(
    StringFilterRemoteActions.list.success,
    (state, { response }) => ({
      ...state,
      stringFilters: stringFilterEntityAdapter.setAll(response.results, state.stringFilters),
      stringFiltersRemotePagination: {
        ...state.stringFiltersRemotePagination,
        total: response.total
      }
    })
  ),
  on(
    StringFilterRemoteActions.update.success,
    (state, { response }) => ({
      ...state,
      stringFilters: stringFilterEntityAdapter.updateOne({ id: response.id, changes: response }, state.stringFilters)
    })
  ),
  on(
    StringFilterRemoteActions.delete.success,
    (state, { response }) => ({
      ...state,
      stringFilters: stringFilterEntityAdapter.removeOne(response.stringFilterId, state.stringFilters),
      selectedStringFilterId:
        state.selectedStringFilterId === response.stringFilterId ? null : state.selectedStringFilterId
    })
  )
)