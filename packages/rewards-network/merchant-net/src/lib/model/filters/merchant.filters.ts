import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from "@zwp/platform.common";
import { MerchantStatus } from '../enums'
import { MerchantResponse } from '../responses'

export interface MerchantFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,

    status: Nullable<EnumQueryFilter<MerchantStatus>>,
    merchantName: Nullable<StringQueryFilter>

    
}

export const initialMerchantFilters: MerchantFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,

    status: null,
    merchantName: null
}

export const merchantFilterEntityMap: QueryFilterEntityMap<
    MerchantFilters,
    MerchantResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',

    status: 'status',
    merchantName: 'merchantName'
}
