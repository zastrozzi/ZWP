import { BrandStatus } from '../enums';
import { TransactionSpreadResponse } from '../responses';
import { BrandInformationDetails } from '../interfaces/brand-information.details';
import { AmountAndCurrency, ISO4217ActiveCurrencyCode, ZWPISO3166Alpha2 } from '@zwp/platform.common';
import { TransactionType, ProductType, DeliveryMethod, Category, VATData, FaceValueLimits, ShippingMethods, StockStatus } from '../common';

export interface BrandResponse {
    id: string,
    dbCreatedAt?: Date,
    dbUpdatedAt?: Date,
    dbDeletedAt?: Date,
    slug?: string,
    name: string,
    type: ProductType,
    status: BrandStatus,
    currency: ISO4217ActiveCurrencyCode,
    discount?: number,
    lastUpdated?: Date,
    transactionTypes: TransactionType[],
    deliveryMethods: DeliveryMethod[],
    countriesServed?: ZWPISO3166Alpha2[],
    gcPool?: boolean,
    asyncOnly?: boolean,
    categories: Category[],
    vat?: VATData,
    choices?: string[],
    digitalFaceValueLimits: FaceValueLimits,
    physicalFaceValueLimits: FaceValueLimits,
    denominations?: string[],
    digitalDenominations?: number[],
    shippingMethods?: ShippingMethods[],
    detail: BrandInformationDetails,
    stock?: StockStatus[],
    merchantId: string,
    merchantNetworkBrandId: string,
    activeTransactionSpreadId: string,
    activeTransactionSpread: TransactionSpreadResponse,
    adjustedDiscount: number
}