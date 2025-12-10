import { Model } from '../../model'
import {
    DateQueryFilter,
    ZWPISO3166Alpha2,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS = [
    Identifiers.FSN_TINK_ACTION_IDENTIFIER,
    Identifiers.WEBHOOK_ENDPOINT_STATE_FEATURE_KEY,
]

const updateWebhookEndpointFilters = createAction(
    createActionType(WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.WebhookEndpointFilters>>()
)

const resetWebhookEndpointFilters = createAction(
    createActionType(WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetWebhookEndpointState = createAction(
    createActionType(WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseWebhookEndpointState = createAction(
    createActionType(WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectWebhookEndpoint = createAction(
    createActionType(WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS, 'Select WebhookEndpoint'),
    props<{ endpointId: string }>()
)

const deselectWebhookEndpoint = createAction(
    createActionType(WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS, 'Deselect WebhookEndpoint')
)

const resetPagination = createAction(
    createActionType(WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createWebhookEndpoint = createRemoteActionGroup<
    { request: Model.ServerAPIModel.Events.CreateTinkV2WebhookEndpointRequest },
    Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse
>('Create WebhookEndpoint', ...WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS)

const getWebhookEndpoint = createRemoteActionGroup<
    { endpointId: string },
    Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse
>('Get WebhookEndpoint', ...WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS)

const listWebhookEndpoints = createRemoteActionGroup<
    {
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>>>
    },
    PaginatedResponse<Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse>
>('List WebhookEndpoints', ...WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS)

const updateWebhookEndpoint = createRemoteActionGroup<
    {
        endpointId: string,
        request: Model.ServerAPIModel.Events.UpdateTinkV2WebhookEndpointRequest
    },
    Model.ServerAPIModel.Events.TinkV2WebhookEndpointResponse
>('Update WebhookEndpoint', ...WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS)

const deleteWebhookEndpoint = createRemoteActionGroup<
    { endpointId: string },
    { endpointId: string }
>('Delete WebhookEndpoint', ...WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS)

const refreshWebhookEndpoints = createRemoteActionGroup<
    { limit: Nullable<number> },
    { limit: Nullable<number> }
>('Refresh WebhookEndpoints', ...WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS)

export const WebhookEndpointLocalActions = {
    updateWebhookEndpointFilters,
    resetWebhookEndpointFilters,
    resetWebhookEndpointState,
    initialiseWebhookEndpointState,
    selectWebhookEndpoint,
    deselectWebhookEndpoint,
    resetPagination
}

export const WebhookEndpointRemoteActions = createRemoteActionMap(
    WEBHOOK_ENDPOINT_ACTION_IDENTIFIERS,
    {
        createWebhookEndpoint,
        getWebhookEndpoint,
        listWebhookEndpoints,
        updateWebhookEndpoint,
        deleteWebhookEndpoint,
        refreshWebhookEndpoints
    }
)