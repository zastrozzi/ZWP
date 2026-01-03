import { DBTimestampedModel } from '../common.models'
import { ProjectStatus } from './project.enums'

export interface ProjectResponse extends DBTimestampedModel {
    name: string
    description?: string
    status: ProjectStatus
    startDate?: Date
    endDate?: Date
    budget?: number
}

export interface CreateProjectRequest {
    name: string
    description?: string
    status: ProjectStatus
    startDate?: Date
    endDate?: Date
    budget?: number
}

export interface UpdateProjectRequest {
    name?: string
    description?: string
    status?: ProjectStatus
    startDate?: Date
    endDate?: Date
    budget?: number
}