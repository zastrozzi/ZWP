import { AmountAndCurrency } from '@zwp/platform.common'
import { LayoutElementConstraint, LayoutElementProp } from '../common'
import { LayoutElementType, OfferOperation, OfferStatus, OfferWeekday } from '../enums'

export interface OfferResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date

    status: OfferStatus
    title: string
    description?: string
    category: string
    operation: OfferOperation
    operandFlat: Partial<AmountAndCurrency>
    operandPercent?: number
    purchaseMax: Partial<AmountAndCurrency>
    purchaseMin: Partial<AmountAndCurrency>
    rewardMax: Partial<AmountAndCurrency>
    daysOfWeek: OfferWeekday[]
    startDate: Date
    endDate?: Date
    offerMetadata?: Record<string, string>

    merchantId: string
    activeLayoutId?: string
}

export interface OfferLayoutResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date

    layoutName: string

    offerId: string
}

export interface OfferLayoutElementResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date

    elementType: LayoutElementType
    constraints: LayoutElementConstraint[]
    props: LayoutElementProp[]
    childElementIdsOrdered: string[]

    layoutId: string
    parentElementId?: string
}