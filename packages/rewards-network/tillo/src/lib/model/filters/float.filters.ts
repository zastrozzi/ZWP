import { AmountAndCurrency, ISO4217CurrencyCode, QueryFilterEntityMap } from '@zwp/platform.common';
import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter, BooleanQueryFilter, NumberQueryFilter } from "@zwp/platform.common";
import { FloatResponse } from '../responses';


export interface FloatFilters {
    id: Nullable<StringQueryFilter>,
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    universal: Nullable<BooleanQueryFilter>,
    currency: Nullable<EnumQueryFilter<ISO4217CurrencyCode>>,
    availableBalance: Nullable<EnumQueryFilter<AmountAndCurrency>>,
    pendingPayments: Nullable<EnumQueryFilter<AmountAndCurrency>>,
    brandId: Nullable<StringQueryFilter>
}

export const initialFloatFilters: FloatFilters = {
    id: null,
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    universal: null,
    currency: null,
    availableBalance: null,
    pendingPayments: null,
    brandId: null
}

export const floatFilterEntityMap: QueryFilterEntityMap<
    FloatFilters, FloatResponse> = {
    id: 'id',
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    universal: 'universal',
    currency: 'currency',
    availableBalance: 'availableBalance',
    pendingPayments: 'pendingPayments',
    brandId: 'brandId'
}