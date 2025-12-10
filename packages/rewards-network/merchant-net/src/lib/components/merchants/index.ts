import { CreateMerchantWindowComponent } from './create-merchant.window.component'
import { MerchantDetailRouteComponent } from './merchant.detail-route.component'
import { MerchantListComponent } from './merchant.list.component'

export * from './merchant.list.component'
export * from './merchant.detail-route.component'
export * from './create-merchant.window.component'

export const MERCHANT_COMPONENTS = {
    MerchantListComponent,
    MerchantDetailRouteComponent,
    CreateMerchantWindowComponent,
    
    ALL: [
        MerchantListComponent,
        MerchantDetailRouteComponent,
        CreateMerchantWindowComponent
    ]
}