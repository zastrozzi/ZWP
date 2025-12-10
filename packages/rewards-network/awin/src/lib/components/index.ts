import { CATEGORY_COMPONENTS } from './categories'
import { ACCOUNT_COMPONENTS } from './accounts'
import { AffiliateWindowHomeComponent } from './affiliate-window.home.component'
import { SECTOR_COMPONENTS } from './sectors'




export const INTERNAL_COMPONENTS = {
    AffiliateWindowHomeComponent,
    ACCOUNT_COMPONENTS,
    CATEGORY_COMPONENTS,
    SECTOR_COMPONENTS,
    
    ALL: [
        AffiliateWindowHomeComponent,
        ...ACCOUNT_COMPONENTS.ALL,
        ...CATEGORY_COMPONENTS.ALL,
        ...SECTOR_COMPONENTS.ALL
        // MERCHANT_COMPONENTS.CreateMerchantWindowComponent
    ]
}