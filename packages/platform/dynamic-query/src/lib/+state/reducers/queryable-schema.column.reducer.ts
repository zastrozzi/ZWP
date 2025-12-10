import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { QueryableSchemaColumnLocalActions, QueryableSchemaColumnRemoteActions } from '../actions'
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

export interface QueryableSchemaColumnFeatureState extends BaseRemoteFeatureState {
    columns: EntityState<Model.QueryableSchemaColumnResponse>
    selectedColumnId: Nullable<string>
    columnsRemotePagination: RemotePaginationState<Model.QueryableSchemaColumnResponse>
}

const sortColumns = (a: Model.QueryableSchemaColumnResponse, b: Model.QueryableSchemaColumnResponse) => a.ordinalPosition - b.ordinalPosition

export const queryableSchemaColumnEntityAdapter: EntityAdapter<Model.QueryableSchemaColumnResponse> =
  createEntityAdapter<Model.QueryableSchemaColumnResponse>({
    sortComparer: sortColumns
  })

export const initialQueryableSchemaColumnFeatureState: QueryableSchemaColumnFeatureState = {
  ...initialBaseRemoteFeatureState,
    columns: queryableSchemaColumnEntityAdapter.getInitialState(),
  selectedColumnId: null,
  columnsRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'ordinalPosition',
    total: 0,
  }
}

export const queryableSchemaColumnReducer = createReducer(
  initialQueryableSchemaColumnFeatureState,
  on(
    QueryableSchemaColumnLocalActions.selectColumn,
    (state, { columnId }) => ({ ...state, selectedColumnId: columnId })
  ),
  on(
    QueryableSchemaColumnLocalActions.deselectColumn,
    (state) => ({ ...state, selectedColumnId: null })
  ),
  on(
    QueryableSchemaColumnLocalActions.resetPagination,
    (state) => ({
      ...state,
      columnsRemotePagination: { ...state.columnsRemotePagination, offset: 0 }
    })
  ),
  on(remoteStateUpdateRequest(QueryableSchemaColumnRemoteActions.identifiers), state =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(QueryableSchemaColumnRemoteActions.identifiers), state =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(QueryableSchemaColumnRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    QueryableSchemaColumnRemoteActions.getColumn.success,
    (state, { response }) => ({
      ...state,
      columns: queryableSchemaColumnEntityAdapter.setOne(response, state.columns)
    })
  ),
  on(
    QueryableSchemaColumnRemoteActions.listColumns.request,
    (state, { pagination }) => ({
      ...state,
      columnsRemotePagination: { ...state.columnsRemotePagination, ...pagination }
    })
  ),
  on(
    QueryableSchemaColumnRemoteActions.listColumns.success,
    (state, { response }) => ({
      ...state,
      columns: queryableSchemaColumnEntityAdapter.setMany(response.results, state.columns),
      columnsRemotePagination: {
        ...state.columnsRemotePagination,
        total: response.total
      }
    })
  )
)