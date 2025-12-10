import { ZWPISO3166Alpha2 } from '@zwp/platform.common'
import { LocationStatus, WebLocationStatus } from '../enums'

export interface CreateLocationRequest {
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
}

export interface UpdateLocationRequest {
    status?: LocationStatus
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
}

export interface CreateWebLocationRequest {
    baseUrl: string
    name: string
    webLocationMetadata?: Record<string, string>
}

export interface UpdateWebLocationRequest {
    status?: WebLocationStatus
    baseUrl?: string
    name?: string
    webLocationMetadata?: Record<string, string>
}