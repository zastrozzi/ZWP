import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'

export const adminChildRoutes: Routes = [
    {
        path: 'kdq/structured-queries',
        component: INTERNAL_COMPONENTS.STRUCTURED_QUERY_COMPONENTS.StructuredQueryListComponent,
        data: {
            navTitle: 'Dynamic Queries',
            navIcon: 'troubleshoot',
            leftNavPanelShown: true
        }
    },
    {
        path: 'kdq/queryable-schemas',
        component: INTERNAL_COMPONENTS.QUERYABLE_SCHEMA_COMPONENTS.TABLE_COMPONENTS.QueryableSchemaTablePaginatedListComponent,
        data: {
            navTitle: 'Queryable Schemas',
            navIcon: 'account_tree',
            leftNavPanelShown: true
        }
    }
]