import { MerchantStatus } from '../enums'

export interface CreateMerchantRequest {
    merchantName: string
    merchantMetadata?: Record<string, string>
    logoUrl?: string
    isLive: boolean
    isConsented: boolean
}

export interface UpdateMerchantRequest {
    status?: MerchantStatus
    merchantName?: string
    merchantMetadata?: Record<string, string>
    logoUrl?: string
    isLive?: boolean
    isConsented?: boolean
}