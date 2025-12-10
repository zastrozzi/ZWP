import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum LoyaltyCardStatus {
    ACTIVE = 'active',
    ARCHIVED = 'archived'
}

export enum LoyaltyCardStatusLabel {
    ACTIVE = 'Active',
    ARCHIVED = 'Archived'
}

export const loyaltyCardStatusLabelPipeSignature = makeTransformEnumPipeSignature(
    LoyaltyCardStatus,
    LoyaltyCardStatusLabel
)