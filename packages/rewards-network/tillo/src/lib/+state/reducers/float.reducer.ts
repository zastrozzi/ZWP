import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model';
import { FloatLocalActions, FloatRemoteActions } from '../actions';
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    initialBaseRemoteFeatureState,
    initialRemotePaginationState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface FloatFeatureState extends BaseRemoteFeatureState {
    floats: EntityState<Model.FloatResponse>,
    selectedFloatId: Nullable<string>,
    floatRemotePagination: RemotePaginationState<Model.FloatResponse>
    filters: Model.Filters.FloatFilters
}

export const floatEntityAdapter: EntityAdapter<Model.FloatResponse> =
    createEntityAdapter<Model.FloatResponse>()

export const initialFloatFeatureState: FloatFeatureState = {
    ...initialBaseRemoteFeatureState,
    floats: floatEntityAdapter.getInitialState(),
    selectedFloatId: null,
    floatRemotePagination: initialRemotePaginationState('dbCreatedAt'),
    filters: Model.Filters.initialFloatFilters
}

export const floatReducer = createReducer(
    initialFloatFeatureState,
    on(
        FloatLocalActions.resetFloatState,
        () => initialFloatFeatureState
    ),
    on(
        FloatLocalActions.initialiseFloatState,
        () => initialFloatFeatureState
    ),
    on(
        FloatLocalActions.updateFloatFilters, (state, {filters}) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters
            }
        })
    ),
    on(FloatLocalActions.resetFloatFilters, (state) => ({ ...state, filters: Model.Filters.initialFloatFilters })),
    on(FloatLocalActions.selectFloat, (state, {floatId}) => ({...state, selectedFloatId: floatId})),
    on(FloatLocalActions.deselectFloat, (state) => ({...state, selectedFloatId: null})),
    on(FloatLocalActions.resetPagination, (state) => ({
        ...state,
        floatRemotePagination: {
            ...state.floatRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(FloatRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(FloatRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(FloatRemoteActions.identifiers), (state, {error}) => remoteFailureState(state, error)),

    on(
        FloatRemoteActions.getFloat.success,
        (state, { response }) => ({
            ...state,
            floats: floatEntityAdapter.setOne(response, state.floats),
            selectedFloatId: response.id
        })
    ),

    on(
        FloatRemoteActions.listFloats.request,
        (state, {pagination}) => ({
            ...state,
            floatsRemotePagination: {
                ...state.floatRemotePagination,
                ...pagination
            }
        })
    ),

    on(
        FloatRemoteActions.listFloats.success,
        (state, {response}) => ({
            ...state,
            floats: floatEntityAdapter.setMany(response.results, state.floats),
            floatRemotePagination: {
                ...state.floatRemotePagination,
                total: response.total
            }
        })
    ),

    on(
        FloatRemoteActions.getFloat.success,
        (state, { response }) => ({
            ...state,
            floats: floatEntityAdapter.setOne(response, state.floats),
            selectedFloatId: response.id
        })
    ),

    on(
        FloatRemoteActions.deleteFloat.success,
        (state, { floatId }) => ({
            ...state,
            floats: floatEntityAdapter.removeOne(floatId, state.floats),
            selectedFloatId:
                state.selectedFloatId === floatId ? null : state.selectedFloatId
        })
    )
    
)

