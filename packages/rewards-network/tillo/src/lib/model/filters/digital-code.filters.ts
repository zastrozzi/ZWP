import { OrderStatus, BarcodeData } from '../common'
import { AmountAndCurrency, NumberQueryFilter, QueryFilterEntityMap } from '@zwp/platform.common'
import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter, BooleanQueryFilter } from '@zwp/platform.common'
import { DigitalGiftCodeResponse } from '../responses'

export interface DigitalCodeFilters {
    id: Nullable<StringQueryFilter>
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    referenceId: Nullable<StringQueryFilter>
    asyncOrder: Nullable<BooleanQueryFilter>
    status: Nullable<EnumQueryFilter<OrderStatus>>
    // faceValue: Nullable<EnumQueryFilter<AmountAndCurrency>>
    // costValue: Nullable<EnumQueryFilter<AmountAndCurrency>>
    url: Nullable<StringQueryFilter>
    code: Nullable<StringQueryFilter>
    discount: Nullable<NumberQueryFilter>
    expirationDate: Nullable<DateQueryFilter>
    // barcode: Nullable<EnumQueryFilter<BarcodeData>>
    brandId: Nullable<StringQueryFilter>
}

export const initialDigitalCodeFilters: DigitalCodeFilters = {
    id: null,
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    referenceId: null,
    asyncOrder: null,
    status: null,
    // faceValue: null,
    // costValue: null,
    url: null,
    code: null,
    discount: null,
    expirationDate: null,
    // barcode: null,
    brandId: null,
}

export const digitalCodeEntityMap: QueryFilterEntityMap<DigitalCodeFilters, DigitalGiftCodeResponse> = {
    id: 'id',
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    referenceId: 'referenceId',
    asyncOrder: 'asyncOrder',
    status: 'status',
    // faceValue: 'faceValue',
    // costValue: 'costValue',
    url: 'url',
    code: 'code',
    discount: 'discount',
    expirationDate: 'expirationDate',
    // barcode: 'barcode',
    brandId: 'brandId',
}
