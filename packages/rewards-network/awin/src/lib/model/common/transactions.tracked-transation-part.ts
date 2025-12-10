import { ISO4217CurrencyCode } from "@zwp/platform.common"

export interface TrackedTransactionPart {
    code: string
    amount: number
    currency: ISO4217CurrencyCode
}