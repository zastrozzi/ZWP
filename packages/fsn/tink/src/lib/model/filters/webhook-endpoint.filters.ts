import { BooleanQueryFilter, DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { ClientAPIModel } from '../client-api'
import { ServerAPIModel } from '../server-api'

export interface WebhookEndpointFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    tinkCreatedAt: Nullable<DateQueryFilter>,
    tinkUpdatedAt: Nullable<DateQueryFilter>,
    description: Nullable<StringQueryFilter>,
    disabled: Nullable<BooleanQueryFilter>,
    enabledEvents: Nullable<EnumQueryFilter<ClientAPIModel.EventsV2.WebhookPayload.EventType>>,
    url: Nullable<StringQueryFilter>
}

export const initialWebhookEndpointFilters: WebhookEndpointFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    tinkCreatedAt: null,
    tinkUpdatedAt: null,
    description: null,
    disabled: null,
    enabledEvents: null,
    url: null
}

export const webhookEndpointFilterEntityMap: QueryFilterEntityMap<WebhookEndpointFilters, ServerAPIModel.Events.TinkV2WebhookEndpointResponse> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    tinkCreatedAt: 'tinkCreatedAt',
    tinkUpdatedAt: 'tinkUpdatedAt',
    description: 'description',
    disabled: 'disabled',
    enabledEvents: 'enabledEvents',
    url: 'url'
}