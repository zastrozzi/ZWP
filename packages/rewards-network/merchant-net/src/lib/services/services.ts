import { Provider } from '@angular/core'
import { MerchantNetAPIConfig } from '../config'
import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'
import { ModuleAPIState } from '@zwp/platform.common'

export * from './abstract'
export * from './live'
export * from './mock'

export const environmentProviders = (apiConfig: MerchantNetAPIConfig): Provider[] => [
    {
        provide: AbstractServices.ASSET_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.AssetLiveAPIService : MockServices.AssetMockAPIService
    },
    { 
        provide: AbstractServices.BRAND_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.BrandLiveAPIService : MockServices.BrandMockAPIService
    },
    { 
        provide: AbstractServices.CATEGORY_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.CategoryLiveAPIService : MockServices.CategoryMockAPIService
    },
    {
        provide: AbstractServices.INVOICE_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.InvoiceLiveAPIService : MockServices.InvoiceMockAPIService
    },

    {
        provide: AbstractServices.LOCATION_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.LocationLiveAPIService : MockServices.LocationMockAPIService
    },

    {
        provide: AbstractServices.LOYALTY_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.LoyaltyLiveAPIService : MockServices.LoyaltyMockAPIService
    },

    {
        provide: AbstractServices.OFFER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.OfferLiveAPIService : MockServices.OfferMockAPIService
    },
    { 
        provide: AbstractServices.SECTOR_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.SectorLiveAPIService : MockServices.SectorMockAPIService
    },
    {
        provide: AbstractServices.MERCHANT_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.MerchantLiveAPIService : MockServices.MerchantMockAPIService
    },
    {
        provide: AbstractServices.MERCHANT_NET_TILLO_BRAND_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.MerchantNetTilloBrandLiveAPIService : MockServices.MerchantNetTilloBrandMockAPIService
    }
]