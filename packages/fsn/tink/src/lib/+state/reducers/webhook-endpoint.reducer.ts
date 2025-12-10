import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { Actions } from '../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    decrementRemotePaginationStateTotalConditionally,
    incrementRemotePaginationStateTotal,
    incrementRemotePaginationStateTotalConditionally,
    initialBaseRemoteFeatureState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface WebhookEndpointFeatureState extends BaseRemoteFeatureState {
    webhookEndpoints: EntityState<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>
    selectedEndpointId: Nullable<string>
    webhookEndpointsRemotePagination: RemotePaginationState<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>
    filters: Model.Filters.WebhookEndpointFilters
}

export const webhookEndpointEntityAdapter: EntityAdapter<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse> =
    createEntityAdapter<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>()

export const initialWebhookEndpointFeatureState: WebhookEndpointFeatureState = {
    ...initialBaseRemoteFeatureState,
    webhookEndpoints: webhookEndpointEntityAdapter.getInitialState(),
    selectedEndpointId: null,
    webhookEndpointsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'dbCreatedAt',
        total: 0,
    },
    filters: Model.Filters.initialWebhookEndpointFilters,
}

export const webhookEndpointReducer = createReducer(
    initialWebhookEndpointFeatureState,
    on(Actions.WebhookEndpointLocalActions.resetWebhookEndpointState, () => initialWebhookEndpointFeatureState),
    on(Actions.WebhookEndpointLocalActions.initialiseWebhookEndpointState, () => initialWebhookEndpointFeatureState),
    on(Actions.WebhookEndpointLocalActions.updateWebhookEndpointFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(Actions.WebhookEndpointLocalActions.resetWebhookEndpointFilters, (state) => ({
        ...state,
        filters: Model.Filters.initialWebhookEndpointFilters,
    })),
    on(Actions.WebhookEndpointLocalActions.selectWebhookEndpoint, (state, { endpointId }) => ({
        ...state,
        selectedEndpointId: endpointId,
    })),
    on(Actions.WebhookEndpointLocalActions.deselectWebhookEndpoint, (state) => ({
        ...state,
        selectedEndpointId: null,
    })),
    on(Actions.WebhookEndpointLocalActions.resetPagination, (state) => ({
        ...state,
        webhookEndpointsRemotePagination: { ...state.webhookEndpointsRemotePagination, offset: 0 },
    })),
    on(remoteStateUpdateRequest(Actions.WebhookEndpointRemoteActions.identifiers), (state) =>
        remoteRequestState(state)
    ),
    on(remoteStateUpdateSuccess(Actions.WebhookEndpointRemoteActions.identifiers), (state) =>
        remoteSuccessState(state)
    ),
    on(remoteStateUpdateFailure(Actions.WebhookEndpointRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(Actions.WebhookEndpointRemoteActions.createWebhookEndpoint.success, (state, { response }) => ({
        ...state,
        webhookEndpoints: webhookEndpointEntityAdapter.setOne(response, state.webhookEndpoints),
        webhookEndpointsRemotePagination: incrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'webhookEndpoints',
            remotePaginationStateKey: 'webhookEndpointsRemotePagination',
            ids: [response.id],
        }),
        selectedEndpointId: response.id,
    })),
    on(Actions.WebhookEndpointRemoteActions.getWebhookEndpoint.success, (state, { response }) => ({
        ...state,
        webhookEndpoints: webhookEndpointEntityAdapter.setOne(response, state.webhookEndpoints),
    })),
    on(Actions.WebhookEndpointRemoteActions.listWebhookEndpoints.request, (state, { pagination }) => ({
        ...state,
        webhookEndpointsRemotePagination: { ...state.webhookEndpointsRemotePagination, ...pagination },
    })),
    on(Actions.WebhookEndpointRemoteActions.listWebhookEndpoints.success, (state, { response }) => ({
        ...state,
        webhookEndpoints: webhookEndpointEntityAdapter.setMany(response.results, state.webhookEndpoints),
        webhookEndpointsRemotePagination: {
            ...state.webhookEndpointsRemotePagination,
            total: response.total,
        },
    })),
    on(Actions.WebhookEndpointRemoteActions.updateWebhookEndpoint.success, (state, { response }) => ({
        ...state,
        webhookEndpoints: webhookEndpointEntityAdapter.updateOne(
            { id: response.id, changes: response },
            state.webhookEndpoints
        ),
    })),
    on(Actions.WebhookEndpointRemoteActions.deleteWebhookEndpoint.success, (state, { endpointId }) => ({
        ...state,
        webhookEndpoints: webhookEndpointEntityAdapter.removeOne(endpointId, state.webhookEndpoints),
        webhookEndpointsRemotePagination: decrementRemotePaginationStateTotalConditionally(state, {
            entityStateKey: 'webhookEndpoints',
            remotePaginationStateKey: 'webhookEndpointsRemotePagination',
            ids: [endpointId],
        }),
        selectedEndpointId: state.selectedEndpointId === endpointId ? null : state.selectedEndpointId,
    }))
)
