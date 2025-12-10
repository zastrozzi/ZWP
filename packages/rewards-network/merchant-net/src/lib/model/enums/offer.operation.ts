import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum OfferOperation {
    none = "none",
    cashbackPercent = "cashbackPercent",
    cashbackFixed = "cashbackFixed",
    discountPercent = "discountPercent",
    discountFixed = "discountFixed",
    points = "points",
    free = "free",
    freeWithPurchase = "freeWithPurchase"
}

export enum OfferOperationLabel {
    none = "None",
    cashbackPercent = "Cashback Percent",
    cashbackFixed = "Cashback Fixed",
    discountPercent = "Discount Percent",
    discountFixed = "Discount Fixed",
    points = "Points",
    free = "Free",
    freeWithPurchase = "Free with Purchase"
}

export enum OfferOperationColor {
    none = "system-gray",
    cashbackPercent = "system-green",
    cashbackFixed = "system-green",
    discountPercent = "system-indigo",
    discountFixed = "system-indigo",
    points = "system-yellow",
    free = "primary",
    freeWithPurchase = "system-orange"
}

export const offerOperationLabelPipeSignature = makeTransformEnumPipeSignature(OfferOperation, OfferOperationLabel)
export const offerOperationColorPipeSignature = makeTransformEnumPipeSignature(OfferOperation, OfferOperationColor)