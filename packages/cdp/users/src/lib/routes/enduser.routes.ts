import { Routes } from "@angular/router";
import { INTERNAL_COMPONENTS } from "../components";

export const enduserChildRoutes = (additionalRoutes: {tabbedEnduserDetailRoutes: Routes}): Routes => [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
        data: { leftNavPanelShown: false },
    },
    // {
    //     path: 'overview',
    //     component: INTERNAL_COMPONENTS.ENDUSER_COMPONENTS.CustomersHomeComponent,
    //     data: {
    //         navTitle: 'Overview',
    //         navIcon: 'dashboard',
    //         leftNavPanelShown: true,
    //     },
    // },
    {
        path: 'users',
        component: INTERNAL_COMPONENTS.ENDUSER_COMPONENTS.EnduserListComponent,
        data: {
            navTitle: 'Customer Directory',
            navIcon: 'people',
            leftNavPanelShown: true,
        },
    },
    {
        path: 'campaigns',
        component: INTERNAL_COMPONENTS.AudienceListComponent,
        data: {
            navTitle: 'Campaigns',
            navIcon: 'schedule_send',
            leftNavPanelShown: true,
        },
    },
    {
        path: 'audiences',
        component: INTERNAL_COMPONENTS.AudienceListComponent,
        data: {
            navTitle: 'Audiences',
            navIcon: 'groups',
            leftNavPanelShown: true,
        },
    },
    
    {
        path: 'segments',
        component: INTERNAL_COMPONENTS.AudienceListComponent,
        data: {
            navTitle: 'Segments',
            navIcon: 'filter_alt',
            leftNavPanelShown: true,
        },
    },
    {
        path: 'users/:enduserId',
        component: INTERNAL_COMPONENTS.ENDUSER_COMPONENTS.EnduserDetailsComponent,
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
                component: INTERNAL_COMPONENTS.ENDUSER_COMPONENTS.EnduserAccountActivityComponent,
                data: {
                    navTitle: 'Activity',
                    navIcon: 'timeline',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'devices',
                component: INTERNAL_COMPONENTS.ENDUSER_COMPONENTS.EnduserAccountDevicesComponent,
                data: {
                    navTitle: 'Devices',
                    navIcon: 'devices',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'communications',
                component: INTERNAL_COMPONENTS.ENDUSER_COMPONENTS.EnduserAccountCommunicationsComponent,
                data: {
                    navTitle: 'Communications',
                    navIcon: 'contacts',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'security',
                component: INTERNAL_COMPONENTS.ENDUSER_COMPONENTS.EnduserAccountSecurityComponent,
                data: {
                    navTitle: 'Security',
                    navIcon: 'security',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'locations',
                component: INTERNAL_COMPONENTS.ENDUSER_COMPONENTS.CustomersHomeComponent,
                data: {
                    navTitle: 'Locations',
                    navIcon: 'place',
                    tabbedNavShown: true,
                },
            },
            ...additionalRoutes.tabbedEnduserDetailRoutes
        ],
    },
]