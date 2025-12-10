import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum ProductType {
    giftCard = "gift-card",
    choiceLink = "choice-link"
}

export enum ProductTypeLabel {
    giftCard = 'Gift Card',
    choiceLink = 'Choice Link'
}

export const productTypeLabelPipeSignature = makeTransformEnumPipeSignature(
    ProductType,
    ProductTypeLabel
)