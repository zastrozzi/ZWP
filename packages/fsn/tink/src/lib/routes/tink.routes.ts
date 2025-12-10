import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'
import { Model } from '../model'

export const tinkChildRoutes: Routes = [
    {
        path: '',
        redirectTo: 'accounts',
        pathMatch: 'full',
        data: { leftNavPanelShown: false }
    },
    {
        path: 'accounts',
        component: INTERNAL_COMPONENTS.ACCOUNT_COMPONENTS.AccountPaginatedListComponent,
        data: {
            navTitle: 'Accounts',
            navIcon: 'account_balance_wallet',
            leftNavPanelShown: true,
            accountListContext: Model.Enums.AccountPaginatedListComponentContext.ACCOUNT_LIST
        }
    },
    {
        path: 'providers',
        component: INTERNAL_COMPONENTS.PROVIDER_COMPONENTS.ProviderPaginatedListComponent,
        data: {
            navTitle: 'Providers',
            navIcon: 'account_balance',
            leftNavPanelShown: true,
            providerListContext: Model.Enums.ProviderPaginatedListComponentContext.PROVIDER_LIST
        }
    },
    {
        path: 'provider-consents',
        component: INTERNAL_COMPONENTS.PROVIDER_CONSENT_COMPONENTS.ProviderConsentPaginatedListComponent,
        data: {
            navTitle: 'Provider Consents',
            navIcon: 'lock',
            leftNavPanelShown: true,
            providerConsentListContext: Model.Enums.ProviderConsentPaginatedListComponentContext.PROVIDER_CONSENT_LIST
        }
    },
    {
        path: 'tink-users',
        component: INTERNAL_COMPONENTS.USER_COMPONENTS.UserPaginatedListComponent,
        data: {
            navTitle: 'Tink Users',
            navIcon: 'people',
            leftNavPanelShown: true,
            userListContext: Model.Enums.UserPaginatedListComponentContext.USER_LIST
        }
    },
    {
        path: 'transactions',
        component: INTERNAL_COMPONENTS.TRANSACTION_COMPONENTS.TransactionPaginatedListComponent,
        data: {
            navTitle: 'Transactions',
            navIcon: 'paid',
            leftNavPanelShown: true,
            transactionListContext: Model.Enums.TransactionPaginatedListComponentContext.TRANSACTION_LIST
        }
    },
    {
        path: 'merchants',
        component: INTERNAL_COMPONENTS.MERCHANT_COMPONENTS.MerchantPaginatedListComponent,
        data: {
            navTitle: 'PISP Merchants',
            navIcon: 'store',
            leftNavPanelShown: true,
            merchantListContext: Model.Enums.MerchantPaginatedListComponentContext.MERCHANT_LIST
        }
    }
]