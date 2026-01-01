import { DBTimestampedModel } from '../common.models'
import { ProjectStatus } from './project.enums'

export interface Project extends DBTimestampedModel {
    name: string
    description?: string
    status: ProjectStatus
    startDate?: Date
    endDate?: Date
    budget?: number
}
