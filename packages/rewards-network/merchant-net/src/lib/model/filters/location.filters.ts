import { DateQueryFilter, EnumQueryFilter, ZWPISO3166Alpha2, Nullable, NumberQueryFilter, StringQueryFilter } from "@zwp/platform.common";
import { LocationStatus, WebLocationStatus } from '../enums'

export interface LocationFilters {
    status: Nullable<EnumQueryFilter<LocationStatus>>,
    name: Nullable<StringQueryFilter>,
    lat: Nullable<NumberQueryFilter>,
    lon: Nullable<NumberQueryFilter>,
    addressRefinement: Nullable<StringQueryFilter>,
    addressNumber: Nullable<StringQueryFilter>,
    addressStreet: Nullable<StringQueryFilter>,
    addressCity: Nullable<StringQueryFilter>,
    addressRegion: Nullable<StringQueryFilter>,
    addressPostalCode: Nullable<StringQueryFilter>,
    country: Nullable<EnumQueryFilter<ZWPISO3166Alpha2>>,

    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export interface WebLocationFilters {
    status: Nullable<EnumQueryFilter<WebLocationStatus>>,
    baseUrl: Nullable<StringQueryFilter>,
    name: Nullable<StringQueryFilter>,

    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export const initialLocationFilters: LocationFilters = {
    status: null,
    name: null,
    lat: null,
    lon: null,
    addressRefinement: null,
    addressNumber: null,
    addressStreet: null,
    addressCity: null,
    addressRegion: null,
    addressPostalCode: null,
    country: null,

    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const initialWebLocationFilters: WebLocationFilters = {
    status: null,
    baseUrl: null,
    name: null,

    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}