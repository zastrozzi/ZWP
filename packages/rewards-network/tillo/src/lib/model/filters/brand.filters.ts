import { BrandStatus } from '../enums';
import { BrandInformationDetails } from '../interfaces/brand-information.details';
import { AmountAndCurrency, ZWPISO3166Alpha2, NumberQueryFilter, QueryFilterEntityMap } from '@zwp/platform.common';
import { TransactionType, ProductType, DeliveryMethod, Category, VATData, FaceValueLimits, ShippingMethods, StockStatus } from '../common';
import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter, BooleanQueryFilter } from "@zwp/platform.common";
import { BrandResponse } from '../responses';

export interface BrandFilters {
    id: Nullable<StringQueryFilter>,
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    slug: Nullable<StringQueryFilter>,
    name: Nullable<StringQueryFilter>,
    type: Nullable<EnumQueryFilter<ProductType>> ,
    status: Nullable<EnumQueryFilter<BrandStatus>>,
    currency: Nullable<EnumQueryFilter<AmountAndCurrency>>,
    discount: Nullable<NumberQueryFilter>,
    lastUpdated: Nullable<DateQueryFilter>,
    transactionTypes: Nullable<EnumQueryFilter<TransactionType>>,
    deliveryMethods: Nullable<EnumQueryFilter<DeliveryMethod>>,
    countriesServed: Nullable<EnumQueryFilter<ZWPISO3166Alpha2>>,
    gcPool: Nullable<BooleanQueryFilter>,
    asyncOnly: Nullable<BooleanQueryFilter>,
    categories: Nullable<EnumQueryFilter<Category>>,
    vat: Nullable<EnumQueryFilter<VATData>>,
    digitalFaceValueLimits: Nullable<EnumQueryFilter<FaceValueLimits>>,
    physicalFaceValueLimits: Nullable<EnumQueryFilter<FaceValueLimits>>,
    digitalDenominations: Nullable<NumberQueryFilter>,
    shippingMethods: Nullable<EnumQueryFilter<ShippingMethods>>,
    detail: Nullable<EnumQueryFilter<BrandInformationDetails>>,
    stock: Nullable<EnumQueryFilter<StockStatus>>,
    merchantId: Nullable<StringQueryFilter>,
    merchantNetworkBrandId: Nullable<StringQueryFilter>
}

export const initialBrandFilters: BrandFilters = {
    id: null,
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    slug: null,
    name: null,
    type: null,
    status: null,
    currency: null,
    discount: null,
    lastUpdated: null,
    transactionTypes: null,
    deliveryMethods: null,
    countriesServed: null,
    gcPool: null,
    asyncOnly: null,
    categories: null,
    vat: null,
    digitalFaceValueLimits: null,
    physicalFaceValueLimits: null,
    digitalDenominations: null,
    shippingMethods: null,
    detail: null,
    stock: null,
    merchantId: null,
    merchantNetworkBrandId: null
}

export const brandFilterEntityMap: QueryFilterEntityMap<
    BrandFilters, BrandResponse> = {
    id: 'id',
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    slug: 'slug',
    name: 'name',
    type: 'type',
    status: 'status',
    currency: 'currency',
    discount: 'discount',
    lastUpdated: 'lastUpdated',
    transactionTypes: 'transactionTypes',
    deliveryMethods: 'deliveryMethods',
    countriesServed: 'countriesServed',
    gcPool: 'gcPool',
    asyncOnly: 'asyncOnly',
    categories: 'categories',
    vat: 'vat',
    digitalFaceValueLimits: 'digitalFaceValueLimits',
    physicalFaceValueLimits: 'physicalFaceValueLimits',
    digitalDenominations: 'digitalDenominations',
    shippingMethods: 'shippingMethods',
    detail: 'detail',
    stock: 'stock',
    merchantId: 'merchantId',
    merchantNetworkBrandId: 'merchantNetworkBrandId'
}