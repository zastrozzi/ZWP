import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum OfferStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    PAUSED = 'paused',
    HIDDEN = 'hidden',
    ARCHIVED = 'archived'
}

export enum OfferStatusLabel {
    DRAFT = 'Draft',
    ACTIVE = 'Active',
    PAUSED = 'Paused',
    HIDDEN = 'Hidden',
    ARCHIVED = 'Archived'
}

export enum OfferStatusColor {
    DRAFT = 'system-gray',
    ACTIVE = 'system-green',
    PAUSED = 'system-orange',
    HIDDEN = 'system-yellow',
    ARCHIVED = 'system-red'
}

export const offerStatusLabelPipeSignature = makeTransformEnumPipeSignature(OfferStatus, OfferStatusLabel)
export const offerStatusColorPipeSignature = makeTransformEnumPipeSignature(OfferStatus, OfferStatusColor)