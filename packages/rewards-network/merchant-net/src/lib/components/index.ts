import { BRAND_COMPONENTS } from './brands'
import { CATEGORY_COMPONENTS } from './categories'
import { INVOICE_COMPONENTS } from './invoices'
import { LOCATION_COMPONENTS } from './locations'
import { LOYALTY_COMPONENTS } from './loyalty'
import { MerchantNetHomeComponent } from './merchant-net.home.component'
import { MERCHANT_COMPONENTS } from './merchants'
import { OFFER_COMPONENTS } from './offers'
import { SECTOR_COMPONENTS } from './sectors'
import { MERCHANT_NET_TILLO_BRAND_COMPONENTS } from './tillo-brands'


export const MERCHANT_NET_COMPONENTS = {
    MerchantNetHomeComponent,
    MERCHANT_COMPONENTS,
    BRAND_COMPONENTS,
    CATEGORY_COMPONENTS,
    INVOICE_COMPONENTS,
    LOCATION_COMPONENTS,
    LOYALTY_COMPONENTS,
    OFFER_COMPONENTS,
    SECTOR_COMPONENTS,
    MERCHANT_NET_TILLO_BRAND_COMPONENTS,
    
    ALL: [
        MerchantNetHomeComponent,
        ...MERCHANT_COMPONENTS.ALL,
        ...BRAND_COMPONENTS.ALL,
        ...CATEGORY_COMPONENTS.ALL,
        ...INVOICE_COMPONENTS.ALL,
        ...LOCATION_COMPONENTS.ALL,
        ...LOYALTY_COMPONENTS.ALL,
        ...OFFER_COMPONENTS.ALL,
        ...SECTOR_COMPONENTS.ALL,
        ...MERCHANT_NET_TILLO_BRAND_COMPONENTS.ALL
        // MERCHANT_COMPONENTS.CreateMerchantWindowComponent
    ],

    EXPORTABLE: [
        ...MERCHANT_NET_TILLO_BRAND_COMPONENTS.EXPORTABLE
    ]
}