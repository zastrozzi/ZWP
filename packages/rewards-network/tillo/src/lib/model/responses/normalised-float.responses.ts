import { AmountAndCurrency, ISO4217CurrencyCode } from '@zwp/platform.common';

export interface NormalisedFloatResponse {
    universal: boolean,
    currency: ISO4217CurrencyCode,
    availableBalance: AmountAndCurrency,
    pendingPayments: AmountAndCurrency,
    brandSlug: string
}