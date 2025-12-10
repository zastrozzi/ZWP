import { DateQueryFilter, EnumQueryFilter, ZWPISO3166Alpha2, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { EnduserAddressResponse } from '../../responses'

export interface EnduserAddressFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    refinement: Nullable<StringQueryFilter>,
    number: Nullable<StringQueryFilter>,
    street: Nullable<StringQueryFilter>,
    city: Nullable<StringQueryFilter>,
    region: Nullable<StringQueryFilter>,
    postalCode: Nullable<StringQueryFilter>,
    country: Nullable<EnumQueryFilter<ZWPISO3166Alpha2>>
}

export const initialEnduserAddressFilters: EnduserAddressFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    refinement: null,
    number: null,
    street: null,
    city: null,
    region: null,
    postalCode: null,
    country: null
}

export const enduserAddressFilterEntityMap: QueryFilterEntityMap<
    EnduserAddressFilters,
    EnduserAddressResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    refinement: 'refinement',
    number: 'number',
    street: 'street',
    city: 'city',
    region: 'region',
    postalCode: 'postalCode',
    country: 'country'
}