import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import {
    createNamespacedFeatureKey,
    selectFilteredElements,
    selectPaginatedElements,
    selectRemoteState,
} from '@zwp/platform.common'
import { Model } from '../../model'

const selectWebhookEndpointState = createFeatureSelector<Reducers.WebhookEndpointFeatureState>(
    createNamespacedFeatureKey(Identifiers.FSN_TINK_ACTION_IDENTIFIER, Identifiers.WEBHOOK_ENDPOINT_STATE_FEATURE_KEY)
)

const selectWebhookEndpointFilters = createSelector(selectWebhookEndpointState, (state) => state.filters)
const selectWebhookEndpointRemotePagination = createSelector(
    selectWebhookEndpointState,
    (state) => state.webhookEndpointsRemotePagination
)
const selectWebhookEndpointRemoteState = createSelector(selectWebhookEndpointState, selectRemoteState)

const selectSelectedWebhookEndpointId = createSelector(selectWebhookEndpointState, (state) => state.selectedEndpointId)

const webhookEndpointEntitySelectors = Reducers.webhookEndpointEntityAdapter.getSelectors()
const selectWebhookEndpointEntityState = createSelector(selectWebhookEndpointState, (state) => state.webhookEndpoints)
const selectWebhookEndpointIds = createSelector(
    selectWebhookEndpointEntityState,
    webhookEndpointEntitySelectors.selectIds
)
const selectWebhookEndpointEntities = createSelector(
    selectWebhookEndpointEntityState,
    webhookEndpointEntitySelectors.selectEntities
)
const selectAllWebhookEndpoints = createSelector(
    selectWebhookEndpointEntityState,
    webhookEndpointEntitySelectors.selectAll
)
const selectWebhookEndpointTotal = createSelector(
    selectWebhookEndpointEntityState,
    webhookEndpointEntitySelectors.selectTotal
)
const selectWebhookEndpointById = (id: string) =>
    createSelector(selectWebhookEndpointEntities, (entities) => entities[id])

const selectedWebhookEndpoint = createSelector(
    selectWebhookEndpointEntities,
    selectSelectedWebhookEndpointId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredWebhookEndpoints = createSelector(
    selectAllWebhookEndpoints,
    selectWebhookEndpointFilters,
    (webhookEndpoints, filters) =>
        selectFilteredElements(webhookEndpoints, filters, Model.Filters.webhookEndpointFilterEntityMap)
)

const selectPaginatedWebhookEndpoints = createSelector(
    selectAllWebhookEndpoints,
    selectWebhookEndpointRemotePagination,
    (webhookEndpoints, pagination) => selectPaginatedElements(webhookEndpoints, pagination)
)

const selectPaginatedFilteredWebhookEndpoints = createSelector(
    selectFilteredWebhookEndpoints,
    selectWebhookEndpointRemotePagination,
    (webhookEndpoints, pagination) => selectPaginatedElements(webhookEndpoints, pagination)
)

export const WebhookEndpointSelectors = {
    selectWebhookEndpointState,
    selectWebhookEndpointFilters,
    selectWebhookEndpointRemotePagination,
    selectWebhookEndpointRemoteState,

    selectSelectedWebhookEndpointId,

    webhookEndpointEntitySelectors,
    selectWebhookEndpointEntityState,
    selectWebhookEndpointIds,
    selectWebhookEndpointEntities,
    selectAllWebhookEndpoints,
    selectWebhookEndpointTotal,
    selectWebhookEndpointById,
    selectedWebhookEndpoint,

    selectFilteredWebhookEndpoints,
    selectPaginatedWebhookEndpoints,
    selectPaginatedFilteredWebhookEndpoints,
}
