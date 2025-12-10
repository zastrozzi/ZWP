import { Routes } from '@angular/router'
import { MERCHANT_NET_COMPONENTS } from '../components'
import { Model } from '../model'

export const tilloBrandDetailMerchantNetRoutes: Routes = [
    {
        path: '',
        component: MERCHANT_NET_COMPONENTS.MERCHANT_NET_TILLO_BRAND_COMPONENTS.TilloBrandMerchantNetLinksComponent,
        outlet: 'tillo-brand-detail'
    }
]

export const merchantNetChildRoutes: Routes = [
    {
        path: '',
        redirectTo: 'merchants',
        pathMatch: 'full',
        data: { leftNavPanelShown: false }
    },
    // {
    //     path: 'overview',
    //     component: MERCHANT_NET_COMPONENTS.MerchantNetHomeComponent,
    //     data: { 
    //         navTitle: 'Overview',
    //         navIcon: 'dashboard',
    //         leftNavPanelShown: true 
    //     }
    // },
    {
        path: 'merchants',
        component: MERCHANT_NET_COMPONENTS.MERCHANT_COMPONENTS.MerchantListComponent,
        data: { 
            navTitle: 'Merchants',
            navIcon: 'storefront',
            leftNavPanelShown: true,
            merchantListContext: Model.ComponentRouteContext.ROOT
        }
    },
    {
        path: 'merchants/:merchantId',
        component: MERCHANT_NET_COMPONENTS.MERCHANT_COMPONENTS.MerchantDetailRouteComponent,
        data: {
            navTitle: 'Merchant Details',
            navIcon: 'storefront',
            leftNavPanelShown: false,
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
                component: MERCHANT_NET_COMPONENTS.BRAND_COMPONENTS.BrandListComponent,
                data: {
                    navTitle: 'Brands',
                    navIcon: 'pages',
                    tabbedNavShown: true,
                    brandListContext: Model.BrandPaginatedListComponentContext.MERCHANT_DETAIL
                },
            },
            {
                path: 'locations',
                component: MERCHANT_NET_COMPONENTS.LOCATION_COMPONENTS.LocationListComponent,
                data: {
                    navTitle: 'Locations',
                    navIcon: 'location_on',
                    tabbedNavShown: true,
                    locationListContext: Model.ComponentRouteContext.MERCHANT_DETAIL
                },
            },
            {
                path: 'cards',
                data: {
                    navTitle: 'Cards',
                    navIcon: 'credit_card',
                    tabbedNavShown: true,
                    tabbedDropdown: true
                },
                children: [
                    {
                        path: 'loyalty-cards',
                        component: MERCHANT_NET_COMPONENTS.LOYALTY_COMPONENTS.LoyaltyCardPaginatedListComponent,
                        data:{
                            navTitle: 'Loyalty Cards',
                            navIcon: 'credit_card',
                            tabbedNavShown: true,
                            loyaltyCardListContext: Model.LoyaltyCardPaginatedListComponentContext.MERCHANT_DETAIL
                        },
                    },
                    {
                        path: 'loyalty-card-schemes',
                        component: MERCHANT_NET_COMPONENTS.LOYALTY_COMPONENTS.LoyaltyCardSchemePaginatedListComponent,
                        data:{
                            navTitle: 'Loyalty Card Schemes',
                            navIcon: 'payments',
                            tabbedNavShown: true,
                            loyaltyCardSchemeListContext: Model.LoyaltyCardSchemePaginatedListComponentContext.MERCHANT_DETAIL
                        }
                    }
                ]
            },
            {
                path: 'offers',
                component: MERCHANT_NET_COMPONENTS.OFFER_COMPONENTS.OfferListComponent,
                data: {
                    navTitle: 'Offers',
                    navIcon: 'local_offer',
                    tabbedNavShown: true,
                    offerListContext: Model.ComponentRouteContext.MERCHANT_DETAIL
                },
            },
            {
                path: 'communications',
                component:
                    MERCHANT_NET_COMPONENTS.MerchantNetHomeComponent,
                data: {
                    navTitle: 'Communications',
                    navIcon: 'contacts',
                    tabbedNavShown: true,
                },
            },
            {
                path: 'invoices',
                component: MERCHANT_NET_COMPONENTS.INVOICE_COMPONENTS.InvoiceListComponent,
                data: { 
                    navTitle: 'Invoices',
                    navIcon: 'receipt',
                    tabbedNavShown: true,
                    invoiceListContext: Model.ComponentRouteContext.MERCHANT_DETAIL
                }
            },
        ],
    },
    {
        path: 'brands',
        component: MERCHANT_NET_COMPONENTS.BRAND_COMPONENTS.BrandListComponent,
        data: { 
            navTitle: 'Brands',
            navIcon: 'pages',
            leftNavPanelShown: true,
            brandListContext: Model.BrandPaginatedListComponentContext.BRAND_LIST
        }
    },
    {
        path: 'brands/:brandId',
        component: MERCHANT_NET_COMPONENTS.BRAND_COMPONENTS.BrandDetailRouteComponent,
        data: {
            navTitle: 'Brand Details',
            navIcon: 'pages',
            leftNavPanelShown: false,
        },
        children: [
            {
                path: '',
                redirectTo: 'locations',
                pathMatch: 'full',
                data: { tabbedNavShown: false },
            },
            {
                path: 'locations',
                component: MERCHANT_NET_COMPONENTS.LOCATION_COMPONENTS.LocationListComponent,
                data: {
                    navTitle: 'Locations',
                    navIcon: 'location_on',
                    tabbedNavShown: true,
                    locationListContext: Model.ComponentRouteContext.BRAND_DETAIL
                },
            },
            {
                path: 'cards',
                data: {
                    navTitle: 'Cards',
                    navIcon: 'credit_card',
                    tabbedNavShown: true,
                    tabbedDropdown: true
                },
                children: [
                    {
                        path: 'loyalty-cards',
                        component: MERCHANT_NET_COMPONENTS.LOYALTY_COMPONENTS.LoyaltyCardPaginatedListComponent,
                        data:{
                            navTitle: 'Loyalty Cards',
                            navIcon: 'credit_card',
                            tabbedNavShown: true,
                            loyaltyCardListContext: Model.LoyaltyCardPaginatedListComponentContext.BRAND_DETAIL
                        },
                    },
                    {
                        path: 'loyalty-card-schemes',
                        component: MERCHANT_NET_COMPONENTS.LOYALTY_COMPONENTS.LoyaltyCardSchemePaginatedListComponent,
                        data:{
                            navTitle: 'Loyalty Card Schemes',
                            navIcon: 'payments',
                            tabbedNavShown: true,
                            loyaltyCardSchemeListContext: Model.LoyaltyCardSchemePaginatedListComponentContext.BRAND_DETAIL
                        }
                    }
                ]
            },
            {
                path: 'offers',
                component: MERCHANT_NET_COMPONENTS.OFFER_COMPONENTS.OfferListComponent,
                data: {
                    navTitle: 'Offers',
                    navIcon: 'local_offer',
                    tabbedNavShown: true,
                    offerListContext: Model.ComponentRouteContext.BRAND_DETAIL
                },
            },
            {
                path: 'transactions',
                component: MERCHANT_NET_COMPONENTS.MerchantNetHomeComponent,
                data: {
                    navTitle: 'Transactions',
                    navIcon: 'receipt',
                    tabbedNavShown: true,
                },
            }
        ],
    },
    {
        path: 'invoices',
        component: MERCHANT_NET_COMPONENTS.INVOICE_COMPONENTS.InvoiceListComponent,
        data: { 
            navTitle: 'Invoices',
            navIcon: 'receipt',
            leftNavPanelShown: true,
            invoiceListContext: Model.ComponentRouteContext.ROOT
        }
    },
    {
        path: 'locations',
        component: MERCHANT_NET_COMPONENTS.LOCATION_COMPONENTS.LocationListComponent,
        data: { 
            navTitle: 'Locations',
            navIcon: 'location_on',
            leftNavPanelShown: true,
            locationListContext: Model.ComponentRouteContext.ROOT
        }
    },
    {
        path: 'locations/:locationId',
        component: MERCHANT_NET_COMPONENTS.LOCATION_COMPONENTS.LocationDetailRouteComponent,
        data: { 
            navTitle: 'Locations',
            navIcon: 'location_on',
            leftNavPanelShown: false
        }
    },
    {
        path: 'offers',
        component: MERCHANT_NET_COMPONENTS.OFFER_COMPONENTS.OfferListComponent,
        data: { 
            navTitle: 'Offers',
            navIcon: 'local_offer',
            leftNavPanelShown: true,
            offerListContext: Model.ComponentRouteContext.ROOT
        }
    },
    {
        path: 'offers/:offerId',
        component: MERCHANT_NET_COMPONENTS.OFFER_COMPONENTS.OfferDetailRouteComponent,
        data: { 
            navTitle: 'Offers',
            navIcon: 'local_offer',
            leftNavPanelShown: false
        }
    },
    {
        path: 'loyalty-card-schemes',
        component: MERCHANT_NET_COMPONENTS.LOYALTY_COMPONENTS.LoyaltyCardSchemePaginatedListComponent,
        data: {
            navTitle: 'Loyalty Card Schemes',
            navIcon: 'payments',
            leftNavPanelShown: true,
            loyaltyCardSchemeListContext: Model.LoyaltyCardSchemePaginatedListComponentContext.LOYALTY_CARD_SCHEME_LIST
        }
    },
    {
        path: 'loyalty-card-schemes/:loyaltyCardSchemeId',
        component: MERCHANT_NET_COMPONENTS.LOYALTY_COMPONENTS.LoyaltyCardSchemeDetailRouteComponent,
        data: { 
            navTitle: 'Loyalty Card Schemes',
            navIcon: 'payments',
            leftNavPanelShown: false
        },
        children: [
            {
                path: '',
                redirectTo: 'loyalty-cards',
                pathMatch: 'full',
                data: { tabbedNavShown: false },
            },
            {
                path: 'loyalty-cards',
                component: MERCHANT_NET_COMPONENTS.LOYALTY_COMPONENTS.LoyaltyCardPaginatedListComponent,
                data: {
                    navTitle: 'Loyalty Cards',
                    navIcon: 'credit_card',
                    tabbedNavShown: true,
                    loyaltyCardListContext: Model.LoyaltyCardPaginatedListComponentContext.LOYALTY_CARD_SCHEME_DETAIL
                },
            }
        ]
    },
    {
        path: 'loyalty-cards',
        component: MERCHANT_NET_COMPONENTS.LOYALTY_COMPONENTS.LoyaltyCardPaginatedListComponent,
        data:{
            navTitle: 'Loyalty Cards',
            navIcon: 'credit_card',
            leftNavPanelShown: true,
            loyaltyCardListContext: Model.LoyaltyCardPaginatedListComponentContext.LOYALTY_CARD_LIST
        },
    },
    {
        path: 'categories',
        component: MERCHANT_NET_COMPONENTS.CATEGORY_COMPONENTS.CategoryPaginatedTreeComponent,
        data: { 
            navTitle: 'Categories',
            navIcon: 'category',
            leftNavPanelShown: true,
            categoryListContext: Model.CategoryPaginatedListComponentContext.CATEGORY_TREE
        }
    },
    {
        path: 'categories/:categoryId',
        component: MERCHANT_NET_COMPONENTS.CATEGORY_COMPONENTS.CategoryDetailRouteComponent,
        data: { 
            navTitle: 'Categories',
            navIcon: 'category',
            leftNavPanelShown: false
        },
        children: [
            {
                path: '',
                redirectTo: 'offers',
                pathMatch: 'full',
                data: { tabbedNavShown: false },
            },
            {
                path: 'offers',
                component: MERCHANT_NET_COMPONENTS.MerchantNetHomeComponent,
                data: {
                    navTitle: 'Offers',
                    navIcon: 'local_offer',
                    tabbedNavShown: true
                },
            }
        ]
    },
    {
        path: 'sectors',
        component: MERCHANT_NET_COMPONENTS.SECTOR_COMPONENTS.SectorPaginatedTreeComponent,
        data: { 
            navTitle: 'Sectors',
            navIcon: 'filter_alt',
            leftNavPanelShown: true,
            sectorListContext: Model.SectorPaginatedListComponentContext.SECTOR_TREE
        }
    },
    {
        path: 'sectors/:sectorId',
        component: MERCHANT_NET_COMPONENTS.SECTOR_COMPONENTS.SectorDetailRouteComponent,
        data: { 
            navTitle: 'Sectors',
            navIcon: 'filter_alt',
            leftNavPanelShown: false
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
                component: MERCHANT_NET_COMPONENTS.MerchantNetHomeComponent,
                data: {
                    navTitle: 'Brands',
                    navIcon: 'pages',
                    tabbedNavShown: true
                },
            }
        ]
    },
]

export const merchantNetChildRoutesForEnduser: Routes = [
    {
        path: 'loyalty-cards',
        component: MERCHANT_NET_COMPONENTS.LOYALTY_COMPONENTS.LoyaltyCardPaginatedListComponent,
        data:{
            navTitle: 'Loyalty Cards',
            navIcon: 'credit_card',
            tabbedNavShown: true,
            loyaltyCardListContext: Model.LoyaltyCardPaginatedListComponentContext.ENDUSER_DETAIL
        },
    },
]