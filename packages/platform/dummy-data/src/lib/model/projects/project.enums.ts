import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum ProjectStatus {
    draft = 'draft',
    active = 'active',
    hidden = 'hidden',
    archived = 'archived'
}

export enum ProjectStatusLabel {
    draft = 'Draft',
    active = 'Active',
    hidden = 'Hidden',
    archived = 'Archived'
}

export enum ProjectStatusColor {
    draft = 'system-gray',
    active = 'system-green',
    hidden = 'system-yellow',
    archived = 'system-red'
}

export const projectStatusLabelPipeSignature = makeTransformEnumPipeSignature(ProjectStatus, ProjectStatusLabel)
export const projectStatusColorPipeSignature = makeTransformEnumPipeSignature(ProjectStatus, ProjectStatusColor)