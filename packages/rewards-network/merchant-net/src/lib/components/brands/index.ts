import { BrandDetailRouteComponent } from './brand.detail-route.component'
import { BrandListComponent } from './brand.list.component'
import { CreateBrandWindowComponent } from './create-brand.window.component'

export * from './brand.list.component'
export * from './brand.detail-route.component'
export * from './create-brand.window.component'

export const BRAND_COMPONENTS = {
    BrandListComponent,
    BrandDetailRouteComponent,
    CreateBrandWindowComponent,
    
    ALL: [
        BrandListComponent,
        BrandDetailRouteComponent,
        CreateBrandWindowComponent
    ]
}