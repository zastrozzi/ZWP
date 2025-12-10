import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { StructuredQueryLocalActions, StructuredQueryRemoteActions } from '../actions'
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

export interface StructuredQueryFeatureState extends BaseRemoteFeatureState {
  structuredQueries: EntityState<Model.StructuredQueryResponse>
  selectedStructuredQueryId: Nullable<string>
  structuredQueriesRemotePagination: RemotePaginationState<Model.StructuredQueryResponse>
  filters: Model.StructuredQueryFilters
}

export const structuredQueryEntityAdapter: EntityAdapter<Model.StructuredQueryResponse> =
  createEntityAdapter<Model.StructuredQueryResponse>()

export const initialStructuredQueryFeatureState: StructuredQueryFeatureState = {
  ...initialBaseRemoteFeatureState,
  structuredQueries: structuredQueryEntityAdapter.getInitialState(),
  selectedStructuredQueryId: null,
  structuredQueriesRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'name',
    total: 0,
  },
  filters: Model.initialStructuredQueryFilters
}

export const structuredQueryReducer = createReducer(
  initialStructuredQueryFeatureState,
  on(
    StructuredQueryLocalActions.resetStructuredQueryState,
    () => initialStructuredQueryFeatureState
  ),
  on(
    StructuredQueryLocalActions.initialiseStructuredQueryState,
    () => initialStructuredQueryFeatureState
  ),
  on(
    StructuredQueryLocalActions.updateStructuredQueryFilters,
    (state, { filters }) => ({
      ...state,
      filters: {
        ...state.filters,
        ...filters
      }
    })
  ),
  on(
    StructuredQueryLocalActions.resetStructuredQueryFilters,
    (state) => ({ ...state, filters: Model.initialStructuredQueryFilters })
  ),
  on(
    StructuredQueryLocalActions.selectStructuredQuery,
    (state, { structuredQueryId }) => ({ ...state, selectedStructuredQueryId: structuredQueryId })
  ),
  on(
    StructuredQueryLocalActions.deselectStructuredQuery,
    (state) => ({ ...state, selectedStructuredQueryId: null })
  ),
  on(
    StructuredQueryLocalActions.resetPagination,
    (state) => ({
      ...state,
      structuredQueriesRemotePagination: {
        ...state.structuredQueriesRemotePagination,
        offset: 0
      }
    })
  ),
  on(remoteStateUpdateRequest(StructuredQueryRemoteActions.identifiers), (state) =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(StructuredQueryRemoteActions.identifiers), (state) =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(StructuredQueryRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    StructuredQueryRemoteActions.create.success,
    (state, { response }) => ({
      ...state,
      structuredQueries: structuredQueryEntityAdapter.setOne(response, state.structuredQueries)
    })
  ),
  on(
    StructuredQueryRemoteActions.get.success,
    (state, { response }) => ({
      ...state,
      structuredQueries: structuredQueryEntityAdapter.setOne(response, state.structuredQueries),
      selectedStructuredQueryId: response.id
    })
  ),
  on(
    StructuredQueryRemoteActions.list.request,
    (state, { pagination }) => ({
      ...state,
      structuredQueriesRemotePagination: {
        ...state.structuredQueriesRemotePagination,
        ...pagination
      }
    })
  ),
  on(
    StructuredQueryRemoteActions.list.success,
    (state, { response }) => ({
      ...state,
      structuredQueries: structuredQueryEntityAdapter.setAll(response.results, state.structuredQueries),
      structuredQueriesRemotePagination: {
        ...state.structuredQueriesRemotePagination,
        total: response.total
      }
    })
  ),
  on(
    StructuredQueryRemoteActions.update.success,
    (state, { response }) => ({
      ...state,
      structuredQueries: structuredQueryEntityAdapter.updateOne({ id: response.id, changes: response }, state.structuredQueries)
    })
  ),
  on(
    StructuredQueryRemoteActions.delete.success,
    (state, { response }) => ({
      ...state,
      structuredQueries: structuredQueryEntityAdapter.removeOne(response.structuredQueryId, state.structuredQueries),
      selectedStructuredQueryId:
        state.selectedStructuredQueryId === response.structuredQueryId ? null : state.selectedStructuredQueryId
    })
  )
)