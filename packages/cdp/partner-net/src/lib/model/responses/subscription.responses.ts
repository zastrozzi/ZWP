import { SubscriptionStatus } from '../enums'

export interface SubgroupSubscriptionResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    status: SubscriptionStatus
    subgroupId: string
    enduserId: string
}

export interface PartnerSubscriptionResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    status: SubscriptionStatus
    partnerId: string
    enduserId: string
}
