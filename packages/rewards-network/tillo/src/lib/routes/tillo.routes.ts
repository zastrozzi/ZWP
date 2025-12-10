import { Routes } from '@angular/router';
import { INTERNAL_COMPONENTS } from '../components';
import { Model } from '../model'


export const tilloMerchantNetChildRoutes = (additionalRoutes: { brandDetailMerchantNetRoutes: Routes}): Routes => [
    {
        path: 'tillo',
        component: INTERNAL_COMPONENTS.TilloHomeComponent,
        
        data: {
            navTitle: 'Tillo',
            navIcon: 'title',
            leftNavPanelShown: true
        },
        children: [
            {
                path: '',
                redirectTo: 'brands',
                pathMatch: 'full',
                data: { tabbedNavShown: false },
            },
            {
                path: 'brands',
                component: INTERNAL_COMPONENTS.BRAND_COMPONENTS.TilloBrandPaginatedListComponent,
                data: {
                    navTitle: 'Brands',
                    navIcon: 'pages',
                    tabbedNavShown: true,
                    brandListContext: Model.ComponentRouteContext.ROOT
                }
            },
            {
                path: 'digital-codes',
                component: INTERNAL_COMPONENTS.DIGITAL_CODE_COMPONENTS.TilloDigitalCodePaginatedListComponent,
                data: {
                    navTitle: 'Digital Codes',
                    navIcon: 'credit_card',
                    tabbedNavShown: true,
                }
            },
            {
                path: 'floats',
                component: INTERNAL_COMPONENTS.FLOAT_COMPONENTS.TilloFloatPaginatedListComponent,
                data: {
                    navTitle: 'Floats',
                    navIcon: 'diversity_1',
                    tabbedNavShown: true
                }
            },
            {
                path: 'store-cards',
                component: INTERNAL_COMPONENTS.STORE_CARD_COMPONENTS.TilloStoreCardPaginatedListComponent,
                data: {
                    navTitle: 'Store Cards',
                    navIcon: 'credit_card',
                    tabbedNavShown: true,
                    storeCardListContext: Model.StoreCardPaginatedListComponentContext.STORE_CARD_LIST
                }
            },
            {
                path: 'transaction-spread',
                component: INTERNAL_COMPONENTS.TRANSACTION_SPREAD_COMPONENTS.TilloTransactionSpreadPaginatedListComponent,
                data: {
                    navTitle: 'Transaction Spread',
                    navIcon: 'pages',
                    tabbedNavShown: true
                }
            }
        ]
    },
    {
        path: 'tillo/brands/:brandId',
        component: INTERNAL_COMPONENTS.BRAND_COMPONENTS.TilloBrandDetailRouteComponent,
        data: {
            navTitle: 'Tillo Brand Details',
            navIcon: 'filter_alt',
            leftNavPanelShown: false
        },
        children: [
            {
                path: '',
                redirectTo: 'store-cards',
                pathMatch: 'full',
                data: { tabbedNavShown: false }
            },
            {
                path: 'store-cards',
                component: INTERNAL_COMPONENTS.STORE_CARD_COMPONENTS.TilloStoreCardPaginatedListComponent,
                data: {
                    navTitle: 'Store Cards',
                    navIcon: 'credit_card',
                    tabbedNavShown: true,
                    storeCardListContext: Model.StoreCardPaginatedListComponentContext.TILLO_BRAND_DETAIL
                }
            },
            ...additionalRoutes.brandDetailMerchantNetRoutes

        ]
    },
    
]