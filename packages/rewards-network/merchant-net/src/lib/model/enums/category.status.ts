import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum CategoryStatus {
    draft = 'draft',
    active = 'active',
    hidden = 'hidden',
    archived = 'archived'
}

export enum CategoryStatusLabel {
    draft = 'Draft',
    active = 'Active',
    hidden = 'Hidden',
    archived = 'Archived'
}

export enum CategoryStatusColor {
    draft = 'system-gray',
    active = 'system-green',
    hidden = 'system-yellow',
    archived = 'system-red'
}

export const categoryStatusLabelPipeSignature = makeTransformEnumPipeSignature(CategoryStatus, CategoryStatusLabel)
export const categoryStatusColorPipeSignature = makeTransformEnumPipeSignature(CategoryStatus, CategoryStatusColor)