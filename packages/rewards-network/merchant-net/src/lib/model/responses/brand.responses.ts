import { BrandStatus } from '../enums'

export interface BrandResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date
    status: BrandStatus
    brandName: string
    brandMetadata?: Record<string, string>
    merchantId: string
    brandId?: string
}