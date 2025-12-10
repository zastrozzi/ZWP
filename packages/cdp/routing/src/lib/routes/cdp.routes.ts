import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'
import { AdminUserAuthGuard } from '../guards'
import { openBankingRoutesForEnduserDetail, rewardsRoutesForEnduserDetail, taxServicesRoutesForEnduserDetail } from './enduser.routes'
import { CDPUsers } from '@zwp/cdp.users'
import { RewardsNetworkMerchantNet } from '@zwp/rewards-network.merchant-net'
import { CDPPartnerNet } from '@zwp/cdp.partner-net'
import { UKGovernmentHMRC } from '@zwp/ukgov.hmrc'
import { PlatformGoogleCloud } from '@zwp/platform.google-cloud'
import { PlatformDynamicQuery } from '@zwp/platform.dynamic-query'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { FSNTink } from '@zwp/fsn.tink'

export const cdpRoutes: Routes = [
    {
        path: '',
        component: INTERNAL_COMPONENTS.AuthedContainerComponent,
        title: 'Zastrozzi Admin',
        children: [
            {
                path: '',
                component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Home',
                    featureNavIcon: 'home',
                },
                canActivate: [AdminUserAuthGuard],
                canActivateChild: [AdminUserAuthGuard],
            },
            {
                path: 'customers',
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Customers',
                    featureNavIcon: 'people',
                },
                children: CDPUsers.enduserChildRoutes({
                    tabbedEnduserDetailRoutes: [
                        ...rewardsRoutesForEnduserDetail,
                        ...openBankingRoutesForEnduserDetail,
                        ...taxServicesRoutesForEnduserDetail,
                        ...RewardsNetworkMerchantNet.merchantNetChildRoutesForEnduser
                    ],
                }),
                canActivate: [AdminUserAuthGuard],
                canActivateChild: [AdminUserAuthGuard],
            },
            {
                path: 'merchant-net',
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Merchant Network',
                    featureNavIcon: 'store',
                },
                children: [
                    ...RewardsNetworkMerchantNet.merchantNetChildRoutes,
                    ...RewardsNetworkTillo.tilloMerchantNetChildRoutes({
                        brandDetailMerchantNetRoutes: RewardsNetworkMerchantNet.tilloBrandDetailMerchantNetRoutes
                    })
                ],
                canActivate: [AdminUserAuthGuard],
                canActivateChild: [AdminUserAuthGuard],
            },
            {
                path: 'partner-net',
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Partner Network',
                    featureNavIcon: 'diversity_1',
                },
                children: [
                    ...CDPPartnerNet.partnerRoutes,
                    ...CDPPartnerNet.subgroupRoutes,
                    ...CDPPartnerNet.assetRoutes
                ],
                canActivate: [AdminUserAuthGuard],
                canActivateChild: [AdminUserAuthGuard],
            },
            {
                path: 'hmrc',
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'HMRC',
                    featureNavIcon: 'money',
                },
                children: UKGovernmentHMRC.hmrcChildRoutes,
                canActivate: [AdminUserAuthGuard],
                canActivateChild: [AdminUserAuthGuard],
            },
            {
                path: 'tink',
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Open Banking',
                    featureNavIcon: 'account_balance'
                },
                children: FSNTink.Routes.tinkChildRoutes,
                canActivate: [AdminUserAuthGuard],
                canActivateChild: [AdminUserAuthGuard],
            },
            {
                path: 'reporting',
                component: INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Reporting',
                    featureNavIcon: 'analytics',
                },
                canActivate: [AdminUserAuthGuard],
                canActivateChild: [AdminUserAuthGuard],
            },
            {
                path: 'cms',
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Content Management',
                    featureNavIcon: 'preview',
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'apps',
                        pathMatch: 'full',
                        data: { leftNavPanelShown: false },
                    },
                    {
                        path: 'apps',
                        component:
                            INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                        data: {
                            navTitle: 'Apps',
                            navIcon: 'apps',
                            leftNavPanelShown: true,
                        },
                    },
                    {
                        path: 'websites',
                        component:
                            INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                        data: {
                            navTitle: 'Websites',
                            navIcon: 'language',
                            leftNavPanelShown: true,
                        },
                    },
                    {
                        path: 'flows',
                        component:
                            INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                        data: {
                            navTitle: 'Flows',
                            navIcon: 'question_answer',
                            leftNavPanelShown: true,
                        },
                    },
                    {
                        path: 'faqs',
                        component:
                            INTERNAL_COMPONENTS.CDPRoutingHomeComponent,
                        data: {
                            navTitle: 'FAQs',
                            navIcon: 'help',
                            leftNavPanelShown: true,
                        },
                    },
                    ...PlatformGoogleCloud.cmsChildRoutes
                ],
                canActivate: [AdminUserAuthGuard],
                canActivateChild: [AdminUserAuthGuard],
            },
            {
                path: 'admin',
                data: {
                    featureNavShown: true,
                    featureNavTitle: 'Platform Administration',
                    featureNavIcon: 'admin_panel_settings',
                },
                children: [
                    ...CDPUsers.adminChildRoutes,
                    ...PlatformDynamicQuery.adminChildRoutes
                ],
                canActivate: [AdminUserAuthGuard],
                canActivateChild: [AdminUserAuthGuard],
            },
        ],
    }
]