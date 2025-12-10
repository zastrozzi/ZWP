import { CategoryStatus } from '../enums'

export interface CreateCategoryRequest {
    name: string
    status: CategoryStatus
    displayImageUrl?: string
}

export interface UpdateCategoryRequest {
    name?: string
    status?: CategoryStatus
    displayImageUrl?: string
}