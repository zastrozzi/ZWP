import { ClientAPIModel } from '../../client-api'

export interface CreateTinkV2WebhookEndpointRequest {
    description: string
    disabled: boolean
    enabledEvents: ClientAPIModel.EventsV2.WebhookPayload.EventType[]
    url: string
}