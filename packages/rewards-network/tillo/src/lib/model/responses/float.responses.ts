import { AmountAndCurrency, ISO4217CurrencyCode } from '@zwp/platform.common';

export interface FloatResponse {
    id: string,
    dbCreatedAt?: Date,
    dbUpdatedAt?: Date,
    dbDeletedAt?: Date,
    universal: boolean,
    currency: ISO4217CurrencyCode,
    availableBalance: AmountAndCurrency,
    pendingPayments: AmountAndCurrency,
    brandId?: string
}