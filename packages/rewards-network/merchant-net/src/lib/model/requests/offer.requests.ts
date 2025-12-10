import { AmountAndCurrency } from '@zwp/platform.common'
import { LayoutElementConstraint, LayoutElementProp } from '../common'
import { LayoutElementType, OfferOperation, OfferStatus, OfferWeekday } from '../enums'

export interface CreateOfferRequest {
    title: string
    description?: string
    category: string
    operation: OfferOperation
    operandFlat?: AmountAndCurrency
    operandPercent?: number
    purchaseMax?: AmountAndCurrency
    purchaseMin?: AmountAndCurrency
    rewardMax?: AmountAndCurrency
    daysOfWeek: OfferWeekday[]
    startDate: Date
    endDate?: Date
    offerMetadata?: Record<string, string>
}

export interface UpdateOfferRequest {
    status?: OfferStatus
    title?: string
    description?: string
    category?: string
    operation?: OfferOperation
    operandFlat?: AmountAndCurrency
    operandPercent?: number
    purchaseMax?: AmountAndCurrency
    purchaseMin?: AmountAndCurrency
    rewardMax?: AmountAndCurrency
    daysOfWeek?: OfferWeekday[]
    startDate?: Date
    endDate?: Date
    offerMetadata?: Record<string, string>
}

export interface CreateOfferLayoutRequest {
    layoutName: string
}

export interface UpdateOfferLayoutRequest {
    layoutName?: string
}

export interface CreateOfferLayoutElementRequest {
    elementType: LayoutElementType
    constraints: LayoutElementConstraint[]
    props: LayoutElementProp[]
}

export interface UpdateOfferLayoutElementRequest {
    elementType?: LayoutElementType
    constraints?: LayoutElementConstraint[]
    props?: LayoutElementProp[]
}