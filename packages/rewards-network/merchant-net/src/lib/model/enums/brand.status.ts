import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum BrandStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    HIDDEN = 'hidden',
    ARCHIVED = 'archived'
}

export enum BrandStatusLabel {
    DRAFT = 'Draft',
    ACTIVE = 'Active',
    HIDDEN = 'Hidden',
    ARCHIVED = 'Archived'
}

export enum BrandStatusThemeColor {
    DRAFT = 'system-gray',
    ACTIVE = 'system-green',
    HIDDEN = 'system-yellow',
    ARCHIVED = 'system-red'
}

export const brandStatusLabelPipeSignature = makeTransformEnumPipeSignature(BrandStatus, BrandStatusLabel)