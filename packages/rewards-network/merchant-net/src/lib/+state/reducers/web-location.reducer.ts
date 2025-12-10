import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { WebLocationLocalActions, WebLocationRemoteActions } from '../actions'
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

export interface WebLocationFeatureState extends BaseRemoteFeatureState {
    webLocations: EntityState<Model.WebLocationResponse>
    selectedWebLocationId: Nullable<string>
    webLocationsRemotePagination: RemotePaginationState<Model.WebLocationResponse>
    filters: Model.Filters.WebLocationFilters
}

export const webLocationEntityAdapter: EntityAdapter<Model.WebLocationResponse> =
    createEntityAdapter<Model.WebLocationResponse>()

export const initialWebLocationFeatureState: WebLocationFeatureState = {
    ...initialBaseRemoteFeatureState,
    webLocations: webLocationEntityAdapter.getInitialState(),
    selectedWebLocationId: null,
    webLocationsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: Model.Filters.initialWebLocationFilters
}

export const webLocationReducer = createReducer(
    initialWebLocationFeatureState,
    on(
        WebLocationLocalActions.resetWebLocationState,
        () => initialWebLocationFeatureState
    ),
    on(
        WebLocationLocalActions.initialiseWebLocationState,
        () => initialWebLocationFeatureState
    ),
    on(
        WebLocationLocalActions.updateWebLocationFilters, (state, { filters }) => ({
            ...state,
            filters: {
                ...Model.Filters.initialWebLocationFilters,
                ...filters
            }
        })
    ),
    on(WebLocationLocalActions.resetWebLocationFilters, (state) => ({ ...state, filters: Model.Filters.initialWebLocationFilters })),
    on(WebLocationLocalActions.selectWebLocation, (state, { webLocationId }) => ({ ...state, selectedWebLocationId: webLocationId })),
    on(WebLocationLocalActions.deselectWebLocation, (state) => ({ ...state, selectedWebLocationId: null })),
    on(WebLocationLocalActions.resetPagination, (state) => ({
        ...state,
        webLocationsRemotePagination: {
            ...state.webLocationsRemotePagination,
            offset: 0
        }
    })),
    on(remoteStateUpdateRequest(WebLocationRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(WebLocationRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(WebLocationRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),

    on(
        WebLocationRemoteActions.create.success,
        (state, { response }) => ({
            ...state,
            webLocations: webLocationEntityAdapter.setOne(response, state.webLocations)
        })
    ),

    on(
        WebLocationRemoteActions.get.success,
        (state, { response }) => ({
            ...state,
            webLocations: webLocationEntityAdapter.setOne(response, state.webLocations),
            selectedWebLocationId: response.id
        })
    ),

    on(
        WebLocationRemoteActions.list.request,
        (state, { pagination }) => ({
            ...state,
            webLocationsRemotePagination: {
                ...state.webLocationsRemotePagination,
                ...pagination
            }
        })
    ),

    on(
        WebLocationRemoteActions.list.success,
        (state, { response }) => ({
            ...state,
            webLocations: webLocationEntityAdapter.setAll(response.results, state.webLocations),
            webLocationsRemotePagination: {
                ...state.webLocationsRemotePagination,
                total: response.total
            }
        })
    ),

    on(
        WebLocationRemoteActions.update.success,
        (state, { response }) => ({
            ...state,
            webLocations: webLocationEntityAdapter.updateOne({ id: response.id, changes: response }, state.webLocations)
        })
    ),

    on(
        WebLocationRemoteActions.delete.success,
        (state, { response }) => ({
            ...state,
            webLocations: webLocationEntityAdapter.removeOne(response.webLocationId, state.webLocations),
            selectedWebLocationId: 
                state.selectedWebLocationId === response.webLocationId ? null : state.selectedWebLocationId
        })
    )
)