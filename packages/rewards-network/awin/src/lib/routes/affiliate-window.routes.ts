import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'
import { Model } from '../model'

export const affiliateWindowChildRoutes: Routes = [
    {
        path: '',
        redirectTo: 'accounts',
        pathMatch: 'full',
        data: { leftNavPanelShown: false }
    },
    {
        path: 'Accounts',
        component: INTERNAL_COMPONENTS.ACCOUNT_COMPONENTS.AccountListComponent,
        data: {
            navTitle: 'Accounts',
            navIcon: 'receipt',
            tabbedNacShown: true,

        }
    },
    {
        path: 'categories',
        component: INTERNAL_COMPONENTS.CATEGORY_COMPONENTS.CategoryPaginatedTreeComponent,
        data: {
            navTitle: 'Categories',
            navIcon: 'category',
            tabbedNavShown: true,
            categoryListContext: Model.CategoryPaginatedListComponentContext.CATEGORY_TREE
        }
    },
]