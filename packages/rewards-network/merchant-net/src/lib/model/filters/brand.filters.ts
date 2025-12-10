import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from "@zwp/platform.common";
import { BrandStatus } from '../enums'
import { BrandResponse } from '../responses'

export interface BrandFilters {
    status: Nullable<EnumQueryFilter<BrandStatus>>,
    brandName: Nullable<StringQueryFilter>,
    
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export const initialBrandFilters: BrandFilters = {
    status: null,
    brandName: null,
    
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const brandFilterEntityMap: QueryFilterEntityMap<BrandFilters, BrandResponse> = {
    status: 'status',
    brandName: 'brandName',
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}