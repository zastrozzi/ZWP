import { OrderStatus, BarcodeData } from '../common';
import { AmountAndCurrency } from '@zwp/platform.common';

export interface NormalisedGiftCodeOrderResponse {
    reference: string,
    brand: string,
    asyncOrder: boolean,
    status: OrderStatus,
    faceValue: AmountAndCurrency,
    costValue: AmountAndCurrency,
    floatBalance: AmountAndCurrency,
    url: string,
    code: string,
    pin: string,
    discount: number,
    expirationDate?: Date,
    barcode: BarcodeData
}