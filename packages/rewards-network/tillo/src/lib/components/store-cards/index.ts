import { TilloStoreCardDetailRightPanelComponent } from './store-card.detail.right-panel.component'
import { TilloStoreCardPaginatedListComponent } from './store-card.paginated-list.component'

export * from './store-card.paginated-list.component'
export * from './store-card.detail.right-panel.component'

export const STORE_CARD_COMPONENTS = {
    TilloStoreCardDetailRightPanelComponent,
    TilloStoreCardPaginatedListComponent,

    ALL: [
        TilloStoreCardDetailRightPanelComponent,
        TilloStoreCardPaginatedListComponent
    ]
}