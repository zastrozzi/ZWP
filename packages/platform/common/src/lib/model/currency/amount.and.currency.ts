import { ISO4217ActiveCurrencyCode } from './iso-4217.active-currency-code'
import { ISO4217CurrencyCode } from './iso-4217.currency-code'

export interface AmountAndCurrency {
    amount?: number
    currency?: ISO4217ActiveCurrencyCode
}