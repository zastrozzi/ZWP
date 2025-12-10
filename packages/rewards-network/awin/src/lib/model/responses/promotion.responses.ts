import { OfferType } from '../enums'
import { PromotionRegions, PromotionVoucher } from '../common'

export interface PromotionResponse {
    id: string,
    dbCreatedAt: Date,
    dbUpdatedAt: Date,
    dbDeletedAt?: Date,
    awid: number,
    type: OfferType,
    joined: boolean,
    title: string,
    description: string,
    terms: string,
    startDate: Date,
    endDate: Date,
    dateAdded: Date,
    url: string,
    urlTracking: string,
    campaign?: string,
    regions: PromotionRegions,
    voucher?: PromotionVoucher,
    programmeId: string,
    programmeAwid: number,
    accountId: string,
    accountAwid: number
}

export interface OfferCategoryResponseForPromotion { // I changed this name to avoid a clash in category.responses.ts
    id: string,
    dbCreatedAt: Date,
    dbUpdatedAt: Date,
    dbDeletedAt?: Date,
    name: string,
    displayImageUrl?: string,
    parentId?: string
}

export interface PromotionOfferCategoryResponse {
    id: string,
    dbCreatedAt: Date,
    dbUpdatedAt: Date,
    dbDeletedAt?: Date,
    promotionId: string,
    offerCategoryId: string,
    promotion?: PromotionResponse,
    offerCategory?: OfferCategoryResponseForPromotion
}