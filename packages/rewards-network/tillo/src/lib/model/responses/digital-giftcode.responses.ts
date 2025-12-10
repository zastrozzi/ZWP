import { OrderStatus, BarcodeData } from '../common';
import { AmountAndCurrency } from '@zwp/platform.common';


export interface DigitalGiftCodeResponse {
    id: string,
    dbCreatedAt?: Date,
    dbUpdatedAt?: Date,
    dbDeletedAt?: Date,
    referenceId: string,
    asyncOrder: boolean,
    status: OrderStatus,
    faceValue: AmountAndCurrency,
    costValue: AmountAndCurrency,
    url: string,
    code: string,
    discount: number,
    expirationDate: Date,
    barcode: BarcodeData,
    brandId: string
}