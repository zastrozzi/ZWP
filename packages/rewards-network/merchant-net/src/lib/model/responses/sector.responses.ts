import { SectorStatus } from '../enums'
import { BrandResponse } from './brand.responses'

export interface SectorResponse {
    id: string
    
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    
    name: string
    status: SectorStatus
    displayImageUrl?: string
    
    parentId?: string
}

export interface NestedSectorResponse {
    id: string
    
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    
    name: string
    status: SectorStatus
    displayImageUrl?: string
    
    parentId?: string

    children: NestedSectorResponse[]
}

export interface BrandSectorResponse {
    id: string
    
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    
    brandId: string
    categoryId: string
    brand?: BrandResponse
    category?: SectorResponse
}

export interface BrandSectorEntity {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    brandId: string
    categoryId: string
}