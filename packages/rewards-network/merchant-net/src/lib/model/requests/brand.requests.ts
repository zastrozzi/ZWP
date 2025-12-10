import { BrandStatus } from '../enums'

export interface CreateBrandRequest {
    brandName: string
    brandMetadata?: Record<string, string>
}

export interface UpdateBrandRequest {
    status?: BrandStatus
    brandName?: string
    brandMetadata?: Record<string, string>
}