import { ZWPISO3166Alpha2 } from '@zwp/platform.common'
import { LocationStatus, WebLocationStatus } from '../enums'

export interface LocationResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date

    status: LocationStatus

    name?: string
    lat?: number
    lon?: number
    addressRefinement?: string
    addressNumber?: string
    addressStreet?: string
    addressCity?: string
    addressRegion?: string
    addressPostalCode?: string
    country?: ZWPISO3166Alpha2
    locationMetadata?: Record<string, string>

    merchantId: string
}

export interface WebLocationResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date

    status: WebLocationStatus

    baseUrl: string
    name: string
    webLocationMetadata?: Record<string, string>

    merchantId: string
}