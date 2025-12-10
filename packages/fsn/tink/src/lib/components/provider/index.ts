import { TinkProviderDetailRightPanelComponent } from './provider.detail.right-panel.component'
import { ProviderPaginatedListComponent } from './provider.paginated-list.component'

export * from './provider.detail.right-panel.component'
export * from './provider.paginated-list.component'

export const PROVIDER_COMPONENTS = {
    ProviderPaginatedListComponent,
    TinkProviderDetailRightPanelComponent,
    ALL: [
        ProviderPaginatedListComponent,
        TinkProviderDetailRightPanelComponent
    ]
}