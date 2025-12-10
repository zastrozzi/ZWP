import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common';
import { StoreCardStatus } from '../enums/store-card.status';
import { StoreCardResponse } from '../responses';

export interface StoreCardFilters {
    id: Nullable<StringQueryFilter>,
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    status: Nullable<EnumQueryFilter<StoreCardStatus>>,
    brandId: Nullable<StringQueryFilter>,
    enduserId: Nullable<StringQueryFilter>
}

export const initialStoreCardFilters: StoreCardFilters = {
    id: null,
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    status: null,
    brandId: null,
    enduserId: null
}

export const storeCardFilterEntityMap: QueryFilterEntityMap<
    StoreCardFilters, StoreCardResponse> = {
        id: 'id',
        dbCreatedAt: 'dbCreatedAt',
        dbUpdatedAt: 'dbUpdatedAt',
        dbDeletedAt: 'dbDeletedAt',
        status: 'status',
        brandId: 'brandId',
        enduserId: 'enduserId'
    }