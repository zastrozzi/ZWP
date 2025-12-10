import { SubscriptionStatus } from '../enums'

export interface CreateSubscriptionRequest {
    status: SubscriptionStatus
}

export interface UpdateSubscriptionRequest {
    status?: SubscriptionStatus
}
