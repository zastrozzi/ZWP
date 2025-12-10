import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import {
    FlowContainerLocalActions,
    FlowContainerRemoteActions,
} from '../actions'
import {
    BaseRemoteFeatureState,
    initialBaseRemoteFeatureState,
    Nullable,
    remoteFailureState,
    RemotePaginationState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface FlowContainerFeatureState extends BaseRemoteFeatureState {
    containers: EntityState<Model.FlowContainerResponse>
    selectedContainerId: Nullable<string>
    containersRemotePagination: RemotePaginationState<Model.FlowContainerResponse>
    filters: Model.FlowContainerFilters
}

export const flowContainerEntityAdapter: EntityAdapter<Model.FlowContainerResponse> =
    createEntityAdapter<Model.FlowContainerResponse>()

export const initialFlowContainerFeatureState: FlowContainerFeatureState = {
    ...initialBaseRemoteFeatureState,
    containers: flowContainerEntityAdapter.getInitialState(),
    selectedContainerId: null,
    containersRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: {
        dbCreatedAt: null,
        dbUpdatedAt: null,
        dbDeletedAt: null,
    },
}

export const flowContainerReducer = createReducer(
    initialFlowContainerFeatureState,
    on(
        FlowContainerLocalActions.initialiseFlowContainerState,
        () => initialFlowContainerFeatureState
    ),
    on(
        FlowContainerLocalActions.resetFlowContainerState,
        () => initialFlowContainerFeatureState
    ),
    on(
        FlowContainerLocalActions.updateFlowContainerFilters,
        (state, { filters }) => ({
            ...state,
            filters: { ...state.filters, filters },
        })
    ),
    on(FlowContainerLocalActions.resetFlowContainerFilters, (state) => ({
        ...state,
        filters: initialFlowContainerFeatureState.filters,
    })),
    on(
        FlowContainerLocalActions.setSelectedFlowContainer,
        (state, { flowContainerId }) => ({
            ...state,
            selectedContainerId: flowContainerId,
        })
    ),
    on(
        remoteStateUpdateRequest(FlowContainerRemoteActions.identifiers),
        (state) => remoteRequestState(state)
    ),
    on(
        remoteStateUpdateSuccess(FlowContainerRemoteActions.identifiers),
        (state) => remoteSuccessState(state)
    ),
    on(
        remoteStateUpdateFailure(FlowContainerRemoteActions.identifiers),
        (state, { error }) => remoteFailureState(state, error)
    ),
    on(
        FlowContainerRemoteActions.createFlowContainer.success,
        (state, { response }) => ({
            ...state,
            containers: flowContainerEntityAdapter.setOne(
                response,
                state.containers
            ),
        })
    ),
    on(
        FlowContainerRemoteActions.getFlowContainer.success,
        (state, { response }) => ({
            ...state,
            containers: flowContainerEntityAdapter.setOne(
                response,
                state.containers
            ),
            selectedContainerId: response.id,
        })
    ),

    on(
        FlowContainerRemoteActions.listFlowContainers.request,
        (state, { pagination }) => ({
            ...state,
            containersRemotePagination: {
                ...state.containersRemotePagination,
                ...pagination,
            },
        })
    ),

    on(
        FlowContainerRemoteActions.listFlowContainers.success,
        (state, { response }) => ({
            ...state,
            containers: flowContainerEntityAdapter.setAll(
                response.results,
                state.containers
            ),
            containersRemotePagination: {
                ...state.containersRemotePagination,
                total: response.total,
            },
        })
    )
)
