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
                redirectTo: 'home',
                pathMatch: 'full',
                data: {
                    featureNavShown: false,
                },
            },
            {
                path: 'home',
                component: COMPONENTS.HomePageComponent,
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Home',
                    featureNavIcon: 'home',
                },
            },
            {
                path: 'platform',
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Platform Features',
                    featureNavIcon: 'architecture',
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'keyboard',
                        pathMatch: 'full',
                        data: { leftNavPanelShown: false },
                    },
                    {
                        path: 'keyboard',
                        component: COMPONENTS.KEYBOARD_COMPONENTS.KeyboardPageComponent,
                        data: {
                            navTitle: 'Keyboard Shortcuts',
                            navIcon: 'keyboard',
                            leftNavPanelShown: true
                        },
                    },
                ],
            },
        ],
    },
]
