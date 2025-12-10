import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { QueryableSchemaRelationshipLocalActions, QueryableSchemaRelationshipRemoteActions } from '../actions'
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

export interface QueryableSchemaRelationshipFeatureState extends BaseRemoteFeatureState {
    relationships: EntityState<Model.QueryableSchemaRelationshipResponse>
    selectedRelationshipId: Nullable<string>
    relationshipsRemotePagination: RemotePaginationState<Model.QueryableSchemaRelationshipResponse>
}

export const queryableSchemaRelationshipEntityAdapter: EntityAdapter<Model.QueryableSchemaRelationshipResponse> =
  createEntityAdapter<Model.QueryableSchemaRelationshipResponse>()

export const initialQueryableSchemaRelationshipFeatureState: QueryableSchemaRelationshipFeatureState = {
  ...initialBaseRemoteFeatureState,
    relationships: queryableSchemaRelationshipEntityAdapter.getInitialState(),
  selectedRelationshipId: null,
  relationshipsRemotePagination: {
    limit: 30,
    offset: 0,
    order: 'asc',
    orderBy: 'id',
    total: 0,
  }
}

export const queryableSchemaRelationshipReducer = createReducer(
  initialQueryableSchemaRelationshipFeatureState,
  on(
    QueryableSchemaRelationshipLocalActions.selectRelationship,
    (state, { relationshipId }) => ({ ...state, selectedRelationshipId: relationshipId })
  ),
  on(
    QueryableSchemaRelationshipLocalActions.deselectRelationship,
    (state) => ({ ...state, selectedRelationshipId: null })
  ),
  on(
    QueryableSchemaRelationshipLocalActions.resetPagination,
    (state) => ({
      ...state,
      relationshipsRemotePagination: { ...state.relationshipsRemotePagination, offset: 0 }
    })
  ),
  on(remoteStateUpdateRequest(QueryableSchemaRelationshipRemoteActions.identifiers), state =>
    remoteRequestState(state)
  ),
  on(remoteStateUpdateSuccess(QueryableSchemaRelationshipRemoteActions.identifiers), state =>
    remoteSuccessState(state)
  ),
  on(remoteStateUpdateFailure(QueryableSchemaRelationshipRemoteActions.identifiers), (state, { error }) =>
    remoteFailureState(state, error)
  ),
  on(
    QueryableSchemaRelationshipRemoteActions.getRelationship.success,
    (state, { response }) => ({
      ...state,
      relationships: queryableSchemaRelationshipEntityAdapter.setOne(response, state.relationships)
    })
  ),
  on(
    QueryableSchemaRelationshipRemoteActions.listRelationships.request,
    (state, { pagination }) => ({
      ...state,
      relationshipsRemotePagination: { ...state.relationshipsRemotePagination, ...pagination }
    })
  ),
  on(
    QueryableSchemaRelationshipRemoteActions.listRelationships.success,
    (state, { response }) => ({
      ...state,
      relationships: queryableSchemaRelationshipEntityAdapter.setMany(response.results, state.relationships),
      relationshipsRemotePagination: {
        ...state.relationshipsRemotePagination,
        total: response.total
      }
    })
  )
)