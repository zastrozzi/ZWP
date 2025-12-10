import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum LoyaltyCardSchemeStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    HIDDEN = 'hidden',
    ARCHIVED = 'archived'
}

export enum LoyaltyCardSchemeStatusLabel {
    DRAFT = 'Draft',
    ACTIVE = 'Active',
    HIDDEN = 'Hidden',
    ARCHIVED = 'Archived'
}

export const loyaltyCardSchemeStatusLabelPipeSignature = makeTransformEnumPipeSignature(LoyaltyCardSchemeStatus, LoyaltyCardSchemeStatusLabel)