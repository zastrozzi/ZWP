import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { DateFilterLocalActions, DateFilterRemoteActions } from '../actions'
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

export interface DateFilterFeatureState extends BaseRemoteFeatureState {
  dateFilters: EntityState<Model.DateFilterResponse>
  selectedDateFilterId: Nullable<string>
  dateFiltersRemotePagination: RemotePaginationState<Model.DateFilterResponse>
  filters: Model.DateFilterFilters
}

export const dateFilterEntityAdapter: EntityAdapter<Model.DateFilterResponse> =
  createEntityAdapter<Model.DateFilterResponse>()

export const initialDateFilterFeatureState: DateFilterFeatureState = {
  ...initialBaseRemoteFeatureState,
  dateFilters: dateFilterEntityAdapter.getInitialState(),
  selectedDateFilterId: null,
  dateFiltersRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'dbCreatedAt',
    total: 0,
  },
  filters: Model.initialDateFilterFilters
}

export const dateFilterReducer = createReducer(
  initialDateFilterFeatureState,
  on(
    DateFilterLocalActions.resetDateFilterState,
    () => initialDateFilterFeatureState
  ),
  on(
    DateFilterLocalActions.initialiseDateFilterState,
    () => initialDateFilterFeatureState
  ),
  on(
    DateFilterLocalActions.updateDateFilterFilters,
    (state, { filters }) => ({ ...state, filters: { ...state.filters, ...filters } })
  ),
  on(
    DateFilterLocalActions.resetDateFilterFilters,
    (state) => ({ ...state, filters: Model.initialDateFilterFilters })
  ),
  on(
    DateFilterLocalActions.selectDateFilter,
    (state, { dateFilterId }) => ({ ...state, selectedDateFilterId: dateFilterId })
  ),
  on(
    DateFilterLocalActions.deselectDateFilter,
    (state) => ({ ...state, selectedDateFilterId: null })
  ),
  on(
    DateFilterLocalActions.resetPagination,
    (state) => ({
      ...state,
      dateFiltersRemotePagination: { ...state.dateFiltersRemotePagination, offset: 0 }
    })
  ),
  on(remoteStateUpdateRequest(DateFilterRemoteActions.identifiers), state =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(DateFilterRemoteActions.identifiers), state =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(DateFilterRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    DateFilterRemoteActions.create.success,
    (state, { response }) => ({
      ...state,
      dateFilters: dateFilterEntityAdapter.setOne(response, state.dateFilters)
    })
  ),
  on(
    DateFilterRemoteActions.get.success,
    (state, { response }) => ({
      ...state,
      dateFilters: dateFilterEntityAdapter.setOne(response, state.dateFilters),
      selectedDateFilterId: response.id
    })
  ),
  on(
    DateFilterRemoteActions.list.request,
    (state, { pagination }) => ({
      ...state,
      dateFiltersRemotePagination: { ...state.dateFiltersRemotePagination, ...pagination }
    })
  ),
  on(
    DateFilterRemoteActions.list.success,
    (state, { response }) => ({
      ...state,
      dateFilters: dateFilterEntityAdapter.setAll(response.results, state.dateFilters),
      dateFiltersRemotePagination: {
        ...state.dateFiltersRemotePagination,
        total: response.total
      }
    })
  ),
  on(
    DateFilterRemoteActions.update.success,
    (state, { response }) => ({
      ...state,
      dateFilters: dateFilterEntityAdapter.updateOne({ id: response.id, changes: response }, state.dateFilters)
    })
  ),
  on(
    DateFilterRemoteActions.delete.success,
    (state, { response }) => ({
      ...state,
      dateFilters: dateFilterEntityAdapter.removeOne(response.dateFilterId, state.dateFilters),
      selectedDateFilterId:
        state.selectedDateFilterId === response.dateFilterId ? null : state.selectedDateFilterId
    })
  )
)