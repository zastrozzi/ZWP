import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter, BooleanQueryFilter, NumberQueryFilter } from "@zwp/platform.common";
import { OrderStatus, BarcodeData } from '../common';
import { AmountAndCurrency } from '@zwp/platform.common';

export interface DigitalNormalisedGiftCodeOrderFilters {
    reference: Nullable<StringQueryFilter>,
    brand: Nullable<StringQueryFilter>,
    asyncOrder: Nullable<BooleanQueryFilter>,
    status: Nullable<EnumQueryFilter<OrderStatus>>,
    faceValue: Nullable<EnumQueryFilter<AmountAndCurrency>>,
    costValue: Nullable<EnumQueryFilter<AmountAndCurrency>>,
    floatBalance: Nullable<EnumQueryFilter<AmountAndCurrency>>,
    url: Nullable<StringQueryFilter>,
    code: Nullable<StringQueryFilter>,
    pin: Nullable<StringQueryFilter>,
    discount: Nullable<NumberQueryFilter>,
    expirationDate: Nullable<DateQueryFilter>,
    barcode: Nullable<EnumQueryFilter<BarcodeData>>
}

export const initialDigitalNormalisedGiftCodeOrderFilters: DigitalNormalisedGiftCodeOrderFilters = {
    reference: null,
    brand: null,
    asyncOrder: null,
    status: null,
    faceValue: null,
    costValue: null,
    floatBalance: null,
    url: null,
    code: null,
    pin: null,
    discount: null,
    expirationDate: null,
    barcode: null
}