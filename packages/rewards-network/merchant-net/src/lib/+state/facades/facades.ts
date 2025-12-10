import { AssetFacade } from './asset.facade'
import { BrandFacade } from './brand.facade'
import { CategoryFacade } from './category.facade'
import { InvoiceFacade } from './invoice.facade'
import { LocationFacade } from './location.facade'
import { LoyaltyCardFacade } from './loyalty-card.facade'
import { LoyaltyCardSchemeFacade } from './loyalty-card-scheme.facade'
import { LoyaltyCardSchemeBrandFacade } from './loyalty-card-scheme-brand.facade'
import { MerchantFacade } from './merchant.facade'
import { OfferFacade } from './offer.facade'
import { SectorFacade } from './sector.facade'
import { MerchantNetTilloBrandFacade } from './tillo-brand.facade'

export * from './asset.facade'
export * from './brand.facade'
export * from './category.facade'
export * from './invoice.facade'
export * from './location.facade'
export * from './loyalty-card.facade'
export * from './loyalty-card-scheme.facade'
export * from './loyalty-card-scheme-brand.facade'
export * from './merchant.facade'
export * from './offer.facade'
export * from './sector.facade'
export * from './tillo-brand.facade'

export const ALL = [
    AssetFacade,
    BrandFacade,
    CategoryFacade,
    InvoiceFacade,
    LocationFacade,
    LoyaltyCardFacade,
    LoyaltyCardSchemeFacade,
    LoyaltyCardSchemeBrandFacade,
    MerchantFacade,
    OfferFacade,
    SectorFacade,
    MerchantNetTilloBrandFacade
]