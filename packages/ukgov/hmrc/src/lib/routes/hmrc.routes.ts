import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'

export const hmrcChildRoutes: Routes = [
    {
        path: '',
        redirectTo: 'industries',
        pathMatch: 'full',
        data: { leftNavPanelShown: false }
    },
    // {
    //     path: 'overview',
    //     component: INTERNAL_COMPONENTS.HMRCHomeComponent,
    //     data: { 
    //         navTitle: 'Overview',
    //         navIcon: 'dashboard',
    //         leftNavPanelShown: true 
    //     }
    // },
    {
        path: 'industries',
        component: INTERNAL_COMPONENTS.INDUSTRY_COMPONENTS.IndustryListComponent,
        data: { 
            navTitle: 'Industries',
            navIcon: 'construction',
            leftNavPanelShown: true 
        },
        children: [
            {
                path: '',
                redirectTo: 'deductions',
                pathMatch: 'full',
                data: { tabbedNavShown: false }
            },
            {
                path: 'deductions',
                component: INTERNAL_COMPONENTS.OCCUPATION_COMPONENTS.OccupationListComponent,
                data: { 
                    navTitle: 'Fixed Rate Deductions',
                    navIcon: 'work',
                    tabbedNavShown: true 
                }
            }
        ]
    },
    
]