import { BarcodeType } from '@zwp/platform.common'
import { LoyaltyCardSchemeStatus, LoyaltyCardStatus } from '../enums'

export interface CreateLoyaltyCardSchemeRequest {
    displayName: string
    hasBarcode: boolean
    barcodeType?: BarcodeType
    logoUrl?: string
    primaryColorHexString?: string
    secondaryColorHexString?: string
    backgroundColorHexString?: string
}

export interface UpdateLoyaltyCardSchemeRequest {
    status?: LoyaltyCardSchemeStatus
    displayName?: string
    hasBarcode?: boolean
    barcodeType?: BarcodeType
    logoUrl?: string
    primaryColorHexString?: string
    secondaryColorHexString?: string
    backgroundColorHexString?: string
}

export interface CreateLoyaltyCardRequest {
    displayName: string
    barcodeData?: string
    cardNumber?: string
    cardPin?: string
    cardSchemeId: string
}

export interface UpdateLoyaltyCardRequest {
    status?: LoyaltyCardStatus
    displayName?: string
    barcodeData?: string
    cardNumber?: string
    cardPin?: string
}