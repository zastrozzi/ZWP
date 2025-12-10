import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'

export const partnerRoutes: Routes = [
    {
        path: '',
        redirectTo: 'partners',
        pathMatch: 'full',
        data: { leftNavPanelShown: false }
    },
    {
        path: 'partners',
        component: INTERNAL_COMPONENTS.PARTNER_COMPONENTS.PartnerPaginatedListComponent,
        data: {
            navTitle: 'Partners',
            navIcon: 'diversity_1',
            leftNavPanelShown: true
        }
    }
]