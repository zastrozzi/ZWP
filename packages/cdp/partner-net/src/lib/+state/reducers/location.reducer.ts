import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { LocationLocalActions, LocationRemoteActions } from '../actions'
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

export interface LocationFeatureState extends BaseRemoteFeatureState {
    locations: EntityState<Model.LocationResponse>
    selectedLocationId: Nullable<string>
    locationsRemotePagination: RemotePaginationState<Model.LocationResponse>
    filters: Model.LocationFilters
}

export const locationEntityAdapter: EntityAdapter<Model.LocationResponse> = createEntityAdapter<Model.LocationResponse>()

export const initialLocationFeatureState: LocationFeatureState = {
    ...initialBaseRemoteFeatureState,
    locations: locationEntityAdapter.getInitialState(),
    selectedLocationId: null,
    locationsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.initialLocationFilters,
}

export const locationReducer = createReducer(
    initialLocationFeatureState,
    on(LocationLocalActions.resetLocationState, () => initialLocationFeatureState),
    on(LocationLocalActions.initialiseLocationState, () => initialLocationFeatureState),
    on(LocationLocalActions.updateLocationFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(LocationLocalActions.resetLocationFilters, (state) => ({ ...state, filters: Model.initialLocationFilters })),
    on(LocationLocalActions.selectLocation, (state, { locationId }) => ({ ...state, selectedLocationId: locationId })),
    on(LocationLocalActions.deselectLocation, (state) => ({ ...state, selectedLocationId: null })),
    on(LocationLocalActions.resetPagination, (state) => ({
        ...state,
        locationsRemotePagination: { ...state.locationsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(LocationRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(LocationRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(LocationRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(LocationRemoteActions.create.success, (state, { response }) => ({
        ...state,
        locations: locationEntityAdapter.setOne(response, state.locations),
    })),
    on(LocationRemoteActions.get.success, (state, { response }) => ({
        ...state,
        locations: locationEntityAdapter.setOne(response, state.locations),
        selectedLocationId: response.id,
    })),
    on(LocationRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        locationsRemotePagination: { ...state.locationsRemotePagination, ...pagination },
    })),
    on(LocationRemoteActions.list.success, (state, { response }) => ({
        ...state,
        locations: locationEntityAdapter.setMany(response.results, state.locations),
        locationsRemotePagination: {
            ...state.locationsRemotePagination,
            total: response.total,
        },
    })),
    on(LocationRemoteActions.update.success, (state, { response }) => ({
        ...state,
        locations: locationEntityAdapter.updateOne({ id: response.id, changes: response }, state.locations),
    })),
    on(LocationRemoteActions.delete.success, (state, { response }) => ({
        ...state,
        locations: locationEntityAdapter.removeOne(response.locationId, state.locations),
        selectedLocationId: state.selectedLocationId === response.locationId ? null : state.selectedLocationId,
    }))
)
