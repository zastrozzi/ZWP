import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { FilterGroupLocalActions, FilterGroupRemoteActions } from '../actions'
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

export interface FilterGroupFeatureState extends BaseRemoteFeatureState {
  filterGroups: EntityState<Model.FilterGroupResponse>
  selectedFilterGroupId: Nullable<string>
  filterGroupsRemotePagination: RemotePaginationState<Model.FilterGroupResponse>
  filters: Model.FilterGroupFilters
}

export const filterGroupEntityAdapter: EntityAdapter<Model.FilterGroupResponse> =
  createEntityAdapter<Model.FilterGroupResponse>()

export const initialFilterGroupFeatureState: FilterGroupFeatureState = {
  ...initialBaseRemoteFeatureState,
  filterGroups: filterGroupEntityAdapter.getInitialState(),
  selectedFilterGroupId: null,
  filterGroupsRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'dbCreatedAt',
    total: 0,
  },
  filters: Model.initialFilterGroupFilters
}

export const filterGroupReducer = createReducer(
  initialFilterGroupFeatureState,
  on(
    FilterGroupLocalActions.resetFilterGroupState,
    () => initialFilterGroupFeatureState
  ),
  on(
    FilterGroupLocalActions.initialiseFilterGroupState,
    () => initialFilterGroupFeatureState
  ),
  on(
    FilterGroupLocalActions.updateFilterGroupFilters,
    (state, { filters }) => ({ ...state, filters: { ...state.filters, ...filters } })
  ),
  on(
    FilterGroupLocalActions.resetFilterGroupFilters,
    (state) => ({ ...state, filters: Model.initialFilterGroupFilters })
  ),
  on(
    FilterGroupLocalActions.selectFilterGroup,
    (state, { filterGroupId }) => ({ ...state, selectedFilterGroupId: filterGroupId })
  ),
  on(
    FilterGroupLocalActions.deselectFilterGroup,
    (state) => ({ ...state, selectedFilterGroupId: null })
  ),
  on(
    FilterGroupLocalActions.resetPagination,
    (state) => ({
      ...state,
      filterGroupsRemotePagination: { ...state.filterGroupsRemotePagination, offset: 0 }
    })
  ),
  on(remoteStateUpdateRequest(FilterGroupRemoteActions.identifiers), state =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(FilterGroupRemoteActions.identifiers), state =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(FilterGroupRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    FilterGroupRemoteActions.create.success,
    (state, { response }) => ({
      ...state,
      filterGroups: filterGroupEntityAdapter.setOne(response, state.filterGroups)
    })
  ),
  on(
    FilterGroupRemoteActions.get.success,
    (state, { response }) => ({
      ...state,
      filterGroups: filterGroupEntityAdapter.setOne(response, state.filterGroups),
      selectedFilterGroupId: response.id
    })
  ),
  on(
    FilterGroupRemoteActions.list.request,
    (state, { pagination }) => ({
      ...state,
      filterGroupsRemotePagination: { ...state.filterGroupsRemotePagination, ...pagination }
    })
  ),
  on(
    FilterGroupRemoteActions.list.success,
    (state, { response }) => ({
      ...state,
      filterGroups: filterGroupEntityAdapter.setAll(response.results, state.filterGroups),
      filterGroupsRemotePagination: {
        ...state.filterGroupsRemotePagination,
        total: response.total
      }
    })
  ),
  on(
    FilterGroupRemoteActions.update.success,
    (state, { response }) => ({
      ...state,
      filterGroups: filterGroupEntityAdapter.updateOne({ id: response.id, changes: response }, state.filterGroups)
    })
  ),
  on(
    FilterGroupRemoteActions.delete.success,
    (state, { response }) => ({
      ...state,
      filterGroups: filterGroupEntityAdapter.removeOne(response.filterGroupId, state.filterGroups),
      selectedFilterGroupId:
        state.selectedFilterGroupId === response.filterGroupId ? null : state.selectedFilterGroupId
    })
  )
)