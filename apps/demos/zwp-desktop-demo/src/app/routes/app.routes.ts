import { Routes } from '@angular/router'
import { COMPONENTS } from '../components'

export const appRoutes: Routes = [
    {
        path: '',
        component: COMPONENTS.RoutingContainerComponent,
        title: 'ZWP Desktop Demo',
        children: [
            {
                path: '',
                component: COMPONENTS.HomePageComponent,
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Home',
                    featureNavIcon: 'home',
                }
            }
        ]
    }
]