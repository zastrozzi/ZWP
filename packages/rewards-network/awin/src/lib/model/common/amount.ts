import { ISO4217ActiveCurrencyCode } from "@zwp/platform.common"

export interface Amount {
    amount?: number
    currency?: ISO4217ActiveCurrencyCode
}