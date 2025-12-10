import { CategoryDetailRouteComponent } from './category.detail-route.component'
import { CategoryDetailRightPanelComponent } from './category.detail.right-panel.component'
import { CategoryPaginatedListComponent } from './category.paginated-list.component'
import { CategoryPaginatedTreeComponent } from './category.paginated-tree.component'
import { CreateCategoryWindowComponent } from './create-category.window.component'

export * from './category.detail-route.component'
export * from './category.detail.right-panel.component'
export * from './category.paginated-list.component'
export * from './category.paginated-tree.component'
export * from './create-category.window.component'

export const CATEGORY_COMPONENTS = {
    CategoryDetailRouteComponent,
    CategoryDetailRightPanelComponent,
    CategoryPaginatedListComponent,
    CategoryPaginatedTreeComponent,
    CreateCategoryWindowComponent,

    ALL: [
        CategoryDetailRouteComponent,
        CategoryDetailRightPanelComponent,
        CategoryPaginatedListComponent,
        CategoryPaginatedTreeComponent,
        CreateCategoryWindowComponent
    ]
}