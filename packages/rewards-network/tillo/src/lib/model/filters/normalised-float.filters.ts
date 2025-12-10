import { AmountAndCurrency, ISO4217CurrencyCode } from '@zwp/platform.common';
import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter, BooleanQueryFilter, NumberQueryFilter } from "@zwp/platform.common";


export interface NormalisedFloatFilters {
    universal: Nullable<BooleanQueryFilter>,
    currency: Nullable<EnumQueryFilter<ISO4217CurrencyCode>>,
    availableBalance: Nullable<EnumQueryFilter<AmountAndCurrency>>,
    pendingPayments: Nullable<EnumQueryFilter<AmountAndCurrency>>,
    brandSlug: Nullable<StringQueryFilter>
}


export const initialNormalisedFloatFilters: NormalisedFloatFilters = {
    universal: null,
    currency: null,
    availableBalance: null,
    pendingPayments: null,
    brandSlug: null
}