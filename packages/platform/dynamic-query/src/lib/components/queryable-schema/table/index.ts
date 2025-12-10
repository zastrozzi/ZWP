import { QueryableSchemaTableDetailsRightPanelComponent } from './table-details.right-panel.component'
import { QueryableSchemaTablePaginatedListComponent } from './table.paginated-list.component'

export * from './table-details.right-panel.component'
export * from './table.paginated-list.component'

export const TABLE_COMPONENTS = {
    QueryableSchemaTableDetailsRightPanelComponent,
    QueryableSchemaTablePaginatedListComponent,

    ALL: [
        QueryableSchemaTableDetailsRightPanelComponent,
        QueryableSchemaTablePaginatedListComponent
    ]
}