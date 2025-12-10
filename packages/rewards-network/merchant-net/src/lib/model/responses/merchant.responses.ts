import { MerchantStatus } from '../enums'

export interface MerchantResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date
    status: MerchantStatus
    merchantName: string
    merchantMetadata: Record<string, string>
    logoUrl: string
    isLive: boolean
    isConsented: boolean
}