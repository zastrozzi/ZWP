import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'

export const subgroupRoutes: Routes = [
    {
        path: 'subgroups',
        component: INTERNAL_COMPONENTS.SUBGROUP_COMPONENTS.SubgroupPaginatedListComponent,
        data: {
            navTitle: 'Partner Subgroups',
            navIcon: 'group',
            leftNavPanelShown: true
        }
    }
]