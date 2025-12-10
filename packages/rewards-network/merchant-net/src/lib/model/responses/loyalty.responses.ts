import { BarcodeType } from '@zwp/platform.common'
import { LoyaltyCardSchemeStatus, LoyaltyCardStatus } from '../enums'

export interface LoyaltyCardSchemeResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    status: LoyaltyCardSchemeStatus
    displayName: string
    hasBarcode: boolean
    barcodeType?: BarcodeType
    logoUrl?: string
    primaryColorHexString?: string
    secondaryColorHexString?: string
    backgroundColorHexString?: string

    merchantId: string
}

export interface LoyaltyCardSchemeBrandResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    
    cardSchemeId: string
    brandId: string
}

export interface LoyaltyCardResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    status: LoyaltyCardStatus
    displayName: string
    barcodeData?: string
    cardNumber?: string
    cardPin?: string

    cardSchemeId: string
    enduserId: string
}