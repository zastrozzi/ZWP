import { AmountAndCurrency } from '@zwp/platform.common';

export interface ShippingMethods {
    indentifier: string,
    description: string,
    cost: AmountAndCurrency
}