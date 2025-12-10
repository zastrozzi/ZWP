import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { QueryableSchemaTableLocalActions, QueryableSchemaTableRemoteActions } from '../actions'
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

export interface QueryableSchemaTableFeatureState extends BaseRemoteFeatureState {
    tables: EntityState<Model.QueryableSchemaTableResponse>
    selectedTableId: Nullable<string>
    tablesRemotePagination: RemotePaginationState<Model.QueryableSchemaTableResponse>,
    filters: Model.QueryableSchemaTableFilters
}

export const queryableSchemaTableEntityAdapter: EntityAdapter<Model.QueryableSchemaTableResponse> =
  createEntityAdapter<Model.QueryableSchemaTableResponse>()

export const initialQueryableSchemaTableFeatureState: QueryableSchemaTableFeatureState = {
  ...initialBaseRemoteFeatureState,
    tables: queryableSchemaTableEntityAdapter.getInitialState(),
  selectedTableId: null,
  tablesRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'displayName',
    total: 0,
  },
  filters: Model.initialQueryableSchemaTableFilters
}

export const queryableSchemaTableReducer = createReducer(
  initialQueryableSchemaTableFeatureState,
  on(
    QueryableSchemaTableLocalActions.resetTableState,
    () => initialQueryableSchemaTableFeatureState
  ),
  on(
    QueryableSchemaTableLocalActions.initialiseTableState,
    () => initialQueryableSchemaTableFeatureState
  ),
  on(
    QueryableSchemaTableLocalActions.updateTableFilters,
    (state, { filters }) => ({ ...state, filters: { ...state.filters, ...filters } })
  ),
  on(
    QueryableSchemaTableLocalActions.resetTableFilters,
    (state) => ({ ...state, filters: Model.initialQueryableSchemaTableFilters })
  ),
  on(
    QueryableSchemaTableLocalActions.selectTable,
    (state, { tableId }) => ({ ...state, selectedTableId: tableId })
  ),
  on(
    QueryableSchemaTableLocalActions.deselectTable,
    (state) => ({ ...state, selectedTableId: null })
  ),
  on(
    QueryableSchemaTableLocalActions.resetPagination,
    (state) => ({
      ...state,
      tablesRemotePagination: { ...state.tablesRemotePagination, offset: 0 }
    })
  ),
  on(remoteStateUpdateRequest(QueryableSchemaTableRemoteActions.identifiers), state =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(QueryableSchemaTableRemoteActions.identifiers), state =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(QueryableSchemaTableRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    QueryableSchemaTableRemoteActions.getTable.success,
    (state, { response }) => ({
      ...state,
      tables: queryableSchemaTableEntityAdapter.setOne(response, state.tables)
    })
  ),
  on(
    QueryableSchemaTableRemoteActions.listTables.request,
    (state, { pagination }) => ({
      ...state,
      tablesRemotePagination: { ...state.tablesRemotePagination, ...pagination }
    })
  ),
  on(
    QueryableSchemaTableRemoteActions.listTables.success,
    (state, { response }) => ({
      ...state,
      tables: queryableSchemaTableEntityAdapter.setMany(response.results, state.tables),
      tablesRemotePagination: {
        ...state.tablesRemotePagination,
        total: response.total
      }
    })
  )
)