import { EnumQueryFilter, ISO4217CurrencyCode, Nullable, NumberQueryFilter } from '@zwp/platform.common'

export type CurrencyDenominatedAmountFilter = {
    currencyCode: Nullable<EnumQueryFilter<ISO4217CurrencyCode>>
    value: Nullable<NumberQueryFilter>
}
