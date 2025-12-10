import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum SectorStatus {
    draft = 'draft',
    active = 'active',
    hidden = 'hidden',
    archived = 'archived'
}

export enum SectorStatusLabel {
    draft = 'Draft',
    active = 'Active',
    hidden = 'Hidden',
    archived = 'Archived'
}

export enum SectorStatusColor {
    draft = 'system-gray',
    active = 'system-green',
    hidden = 'system-yellow',
    archived = 'system-red'
}

export const sectorStatusLabelPipeSignature = makeTransformEnumPipeSignature(SectorStatus, SectorStatusLabel)
export const sectorStatusColorPipeSignature = makeTransformEnumPipeSignature(SectorStatus, SectorStatusColor)