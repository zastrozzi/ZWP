import { EnvironmentProviders } from '@angular/core'
import { provideEffects } from '@ngrx/effects'

import { AssetEffects } from './asset.effects'
import { BrandEffects } from './brand.effects'
import { CategoryEffects } from './category.effects'
import { InvoiceEffects } from './invoice.effects'
import { InvoiceLineEffects } from './invoice-line.effects'
import { InvoicePaymentEffects } from './invoice-payment.effects'
import { LocationEffects } from './location.effects'
import { LoyaltyCardEffects } from './loyalty-card.effects'
import { LoyaltyCardSchemeEffects } from './loyalty-card-scheme.effects'
import { LoyaltyCardSchemeBrandEffects } from './loyalty-card-scheme-brand.effects'
import { MerchantEffects } from './merchant.effects'
import { OfferEffects } from './offer.effects'
import { OfferLayoutEffects } from './offer-layout.effects'
import { OfferLayoutElementEffects } from './offer-layout-element.effects'
import { SectorEffects } from './sector.effects'
import { MerchantNetTilloBrandEffects } from './tillo-brand.effects'
import { WebLocationEffects } from './web-location.effects'


export const environmentProviders: EnvironmentProviders[] = [
    provideEffects(
        AssetEffects,
        BrandEffects,
        CategoryEffects,
        InvoiceEffects,
        InvoiceLineEffects,
        InvoicePaymentEffects,
        LocationEffects,
        LoyaltyCardSchemeEffects,
        LoyaltyCardEffects,
        LoyaltyCardSchemeBrandEffects,
        MerchantEffects,
        OfferEffects,
        OfferLayoutEffects,
        OfferLayoutElementEffects,
        SectorEffects,
        WebLocationEffects,
        MerchantNetTilloBrandEffects
    )
]