import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'
import { Model } from '../model'

export const dummyDataRoutes: Routes = [
    {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
        data: { leftNavPanelShown: false }
    },
    {
        path: 'config',
        component: INTERNAL_COMPONENTS.ConfigPageComponent,
        data: {
            navTitle: 'Config',
            navIcon: 'settings',
            leftNavPanelShown: true
        }
    },
    {
        path: 'projects',
        component: INTERNAL_COMPONENTS.PROJECT_COMPONENTS.ProjectPaginatedListComponent,
        data: {
            navTitle: 'Projects',
            navIcon: 'business_center',
            leftNavPanelShown: true
        }
    }
]