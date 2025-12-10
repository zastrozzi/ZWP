import { PartnerStatus } from '../enums'

export interface SubgroupResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    name: string
    status: PartnerStatus
    partnerId: string
}
