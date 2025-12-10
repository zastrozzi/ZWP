import { PartnerStatus } from '../enums'

export interface PartnerResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    name: string
    metadata?: Record<string, string>
    logoUrl?: string
    status: PartnerStatus
}
