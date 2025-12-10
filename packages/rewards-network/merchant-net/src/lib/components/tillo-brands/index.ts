import { BrandSelectTilloBrandWindowComponent } from './brand.select-tillo-brand.window.component'
import { BrandTilloBrandSelectorComponent } from './brand.tillo-brand-selector.component'
import { TilloBrandMerchantNetLinksComponent } from './tillo-brand.merchant-net-links.component'
import { TilloBrandSelectBrandWindowComponent } from './tillo-brand.select-brand.window.component'

export * from './brand.select-tillo-brand.window.component'
export * from './brand.tillo-brand-selector.component'
export * from './tillo-brand.merchant-net-links.component'
export * from './tillo-brand.select-brand.window.component'

export const MERCHANT_NET_TILLO_BRAND_COMPONENTS = {
    BrandSelectTilloBrandWindowComponent,
    BrandTilloBrandSelectorComponent,
    TilloBrandMerchantNetLinksComponent,
    TilloBrandSelectBrandWindowComponent,

    ALL: [
        BrandSelectTilloBrandWindowComponent,
        BrandTilloBrandSelectorComponent,
        TilloBrandMerchantNetLinksComponent,
        TilloBrandSelectBrandWindowComponent
    ],

    EXPORTABLE: [
        TilloBrandMerchantNetLinksComponent,
        TilloBrandSelectBrandWindowComponent
    ]
}