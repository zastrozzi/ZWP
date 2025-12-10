import { DateQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from "@zwp/platform.common";
import { TransactionSpreadResponse } from "../responses";

export interface TransactionSpreadFilters {
    id: Nullable<StringQueryFilter>,
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    fee: Nullable<StringQueryFilter>,
    brandId: Nullable<StringQueryFilter>
}

export const initialTransactionSpreadFilters: TransactionSpreadFilters = {
    id: null,
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    fee: null,
    brandId: null
}

export const transactionSpreadFilterEntityMap: QueryFilterEntityMap<
    TransactionSpreadFilters, TransactionSpreadResponse> = {
        id: 'id',
        dbCreatedAt: 'dbCreatedAt',
        dbUpdatedAt: 'dbUpdatedAt',
        dbDeletedAt: 'dbDeletedAt',
        fee: 'fee',
        brandId: 'brandId'
    }