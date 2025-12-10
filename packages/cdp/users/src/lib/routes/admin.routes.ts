import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'

export const adminChildRoutes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
        data: { leftNavPanelShown: false },
    },
    // {
    //     path: 'overview',
    //     component: INTERNAL_COMPONENTS.AdminHomeComponent,
    //     data: {
    //         navTitle: 'Overview',
    //         navIcon: 'dashboard',
    //         leftNavPanelShown: true,
    //     },
    // },
    {
        path: 'account-details',
        component: INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminAccountDetailsComponent,
        data: {
            navTitle: 'Account Details',
            navIcon: 'account_balance',
            leftNavPanelShown: false,
        },
        children: [
            {
                path: '',
                redirectTo: 'activity',
                pathMatch: 'full',
                data: { tabbedNavShown: false },
            },
            {
                path: 'activity',
                component: INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminAccountActivityComponent,
                data: {
                    navTitle: 'Activity',
                    navIcon: 'timeline',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'devices',
                component: INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminAccountDevicesComponent,
                data: {
                    navTitle: 'Devices',
                    navIcon: 'devices',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'communications',
                component:
                    INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminAccountCommunicationsComponent,
                data: {
                    navTitle: 'Communications',
                    navIcon: 'contacts',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'security',
                component: INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminAccountSecurityComponent,
                data: {
                    navTitle: 'Security',
                    navIcon: 'security',
                    tabbedNavShown: true,
                },
            },
        ],
    },
    {
        path: 'users',
        component: INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminUserListComponent,
        data: {
            navTitle: 'Admin Users',
            navIcon: 'people',
            leftNavPanelShown: true,
        },
    },
    {
        path: 'users/:id',
        component: INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminUserDetailsComponent,
        data: {
            navTitle: 'Account Details',
            navIcon: 'account_balance',
            leftNavPanelShown: false,
        },
        children: [
            {
                path: '',
                redirectTo: 'activity',
                pathMatch: 'full',
                data: { tabbedNavShown: false },
            },
            {
                path: 'activity',
                component: INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminAccountActivityComponent,
                data: {
                    navTitle: 'Activity',
                    navIcon: 'timeline',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'devices',
                component: INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminAccountDevicesComponent,
                data: {
                    navTitle: 'Devices',
                    navIcon: 'devices',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'communications',
                component:
                    INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminAccountCommunicationsComponent,
                data: {
                    navTitle: 'Communications',
                    navIcon: 'contacts',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'security',
                component: INTERNAL_COMPONENTS.ADMIN_USER_COMPONENTS.AdminAccountSecurityComponent,
                data: {
                    navTitle: 'Security',
                    navIcon: 'security',
                    tabbedNavShown: true,
                },
            },
        ],
    },
]