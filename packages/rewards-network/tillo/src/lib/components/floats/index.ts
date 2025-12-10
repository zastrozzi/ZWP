import { TilloFloatDetailRightPanelComponent } from './float.detail.right-panel.component'
import { TilloFloatPaginatedListComponent } from './float.paginated-list.component'

export * from './float.detail.right-panel.component'
export * from './float.paginated-list.component'

export const FLOAT_COMPONENTS = {
    TilloFloatDetailRightPanelComponent,
    TilloFloatPaginatedListComponent,

    ALL: [
        TilloFloatDetailRightPanelComponent,
        TilloFloatPaginatedListComponent
    ]
}