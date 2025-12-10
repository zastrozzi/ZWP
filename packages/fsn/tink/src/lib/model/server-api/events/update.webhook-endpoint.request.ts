import { ClientAPIModel } from '../../client-api'

export interface UpdateTinkV2WebhookEndpointRequest {
    description?: string
    disabled?: boolean
    enabledEvents?: ClientAPIModel.EventsV2.WebhookPayload.EventType[]
    url?: string
}