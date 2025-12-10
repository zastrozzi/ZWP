import { ISO4217CurrencyCode } from '@zwp/platform.common'
import { ExactNumber } from './exact-number'

export interface CurrencyDenominatedAmount {
    currencyCode: ISO4217CurrencyCode
    value: ExactNumber
}