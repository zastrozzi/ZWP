import { ClientAPIModel } from '../../client-api'

export interface TinkV2WebhookEndpointResponse {
    id: string // UUID as string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    tinkCreatedAt: Date
    description?: string
    disabled: boolean
    enabledEvents: ClientAPIModel.EventsV2.WebhookPayload.EventType[]
    tinkId: string
    secret?: string
    tinkUpdatedAt: Date
    url: string
}