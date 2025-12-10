import { TilloBrandDetailRouteComponent } from './brand.detail-route.component'
import { TilloBrandDetailRightPanelComponent } from './brand.detail.right-panel.component'
import { TilloBrandPaginatedListComponent } from './brand.paginated-list.component'

export * from './brand.detail.right-panel.component'
export * from './brand.detail-route.component'
export * from './brand.paginated-list.component'

export const BRAND_COMPONENTS = {
    TilloBrandDetailRouteComponent,
    TilloBrandDetailRightPanelComponent,
    TilloBrandPaginatedListComponent,

    ALL: [
        TilloBrandDetailRouteComponent,
        TilloBrandDetailRightPanelComponent,
        TilloBrandPaginatedListComponent
    ]
}