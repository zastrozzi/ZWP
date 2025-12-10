import { CategoryStatus } from '../enums'
import { OfferResponse } from './offer.responses'

export interface CategoryResponse {
    id: string
    
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    
    name: string
    status: CategoryStatus
    displayImageUrl?: string
    
    parentId?: string
}

export interface NestedCategoryResponse {
    id: string
    
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    
    name: string
    status: CategoryStatus
    displayImageUrl?: string
    
    parentId?: string

    children: NestedCategoryResponse[]
}

export interface OfferCategoryResponse {
    id: string
    
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    
    offerId: string
    categoryId: string
    offer?: OfferResponse
    category?: CategoryResponse
}

export interface OfferCategoryEntity {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    offerId: string
    categoryId: string
}