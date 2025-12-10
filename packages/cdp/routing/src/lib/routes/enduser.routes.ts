import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'
import { AdminUserAuthGuard } from '../guards'

export const rewardsRoutesForEnduserDetail: Routes = [
    {
        path: 'rewards',
        component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
        data: {
            navTitle: 'Rewards',
            navIcon: 'redeem',
            tabbedNavShown: true,
        },
        canActivate: [AdminUserAuthGuard],
        canActivateChild: [AdminUserAuthGuard],
    },
]

export const openBankingRoutesForEnduserDetail: Routes = [
    {
        path: 'open-banking',
        component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
        data: {
            navTitle: 'Open Banking',
            navIcon: 'account_balance',
            tabbedNavShown: true,
            tabbedDropdown: true
        },
        children: [
            {
                path: 'accounts',
                component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                data: {
                    navTitle: 'Accounts',
                    navIcon: 'account_balance',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'transactions',
                component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                data: {
                    navTitle: 'Transactions',
                    navIcon: 'receipt',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'consents',
                component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                data: {
                    navTitle: 'Consents',
                    navIcon: 'receipt',
                    tabbedNavShown: true,
                },
            },
        ],
        canActivate: [AdminUserAuthGuard],
        canActivateChild: [AdminUserAuthGuard],
    },
]

export const taxServicesRoutesForEnduserDetail: Routes = [
    {
        path: 'tax-services',
        component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
        data: {
            navTitle: 'Tax Services',
            navIcon: 'money',
            tabbedNavShown: true,
            tabbedDropdown: true,
        },
        children: [
            {
                path: 'employment',
                component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                data: {
                    navTitle: 'Employment History',
                    navIcon: 'business',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'professional-subscriptions',
                component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                data: {
                    navTitle: 'Professional Subscriptions',
                    navIcon: 'receipt',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'mileage-claims',
                component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                data: {
                    navTitle: 'Mileage Claims',
                    navIcon: 'directions_car',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'expenses',
                component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                data: {
                    navTitle: 'Expenses',
                    navIcon: 'receipt',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'rebates',
                component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                data: {
                    navTitle: 'Rebates',
                    navIcon: 'money_off',
                    tabbedNavShown: true,
                },
            }
        ],
        canActivate: [AdminUserAuthGuard],
        canActivateChild: [AdminUserAuthGuard],
    },
]