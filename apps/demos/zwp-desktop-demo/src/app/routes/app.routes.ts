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
                    {
                        path: 'tables',
                        component: COMPONENTS.TABLES_COMPONENTS.TablesPageComponent,
                        data: {
                            navTitle: 'Data Tables',
                            navIcon: 'table_view',
                            leftNavPanelShown: true
                        },
                    },
                    {
                        path: 'file-browser',
                        component: COMPONENTS.FileBrowserPageComponent,
                        data: {
                            navTitle: 'File Browser',
                            navIcon: 'snippet_folder',
                            leftNavPanelShown: true
                        },
                        children: [
                            { 
                                path: 'root', 
                                component: COMPONENTS.FileBrowserPageComponent,
                                data: {
                                    fileBrowserRouting: true,
                                    fileBrowserRootDirectory: true
                                }
                            },
                            { 
                                path: ':directoryId', 
                                component: COMPONENTS.FileBrowserPageComponent,
                                data: {
                                    fileBrowserRouting: true,
                                    fileBrowserRootDirectory: false
                                }
                            },
                            { path: '', redirectTo: 'root', pathMatch: 'prefix' }
                        ]
                    },
                ],
            },
        ],
    },
]
