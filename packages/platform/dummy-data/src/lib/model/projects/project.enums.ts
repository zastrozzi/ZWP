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
    draft = 'system-blue',
    active = 'system-green',
    hidden = 'system-gray',
    archived = 'system-red'
}

export const projectStatusLabelPipeSignature = makeTransformEnumPipeSignature(ProjectStatus, ProjectStatusLabel)
export const projectStatusColorPipeSignature = makeTransformEnumPipeSignature(ProjectStatus, ProjectStatusColor)