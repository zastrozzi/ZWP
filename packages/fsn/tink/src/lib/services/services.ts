import { Provider } from '@angular/core'
import { TinkAPIConfig } from '../config'

import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'
import { ModuleAPIState } from '@zwp/platform.common'

export * from './abstract'
export * from './live'
export * from './mock'

export const environmentProviders = (apiConfig: TinkAPIConfig): Provider[] => [
    {
        provide: AbstractServices.TINK_ACCOUNT_CONSENT_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TinkAccountConsentLiveAPIService : MockServices.TinkAccountConsentMockAPIService
    },
    {
        provide: AbstractServices.TINK_ACCOUNT_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TinkAccountLiveAPIService : MockServices.TinkAccountMockAPIService
    },
    {
        provide: AbstractServices.TINK_CREDENTIAL_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TinkCredentialLiveAPIService : MockServices.TinkCredentialMockAPIService
    },
    {
        provide: AbstractServices.TINK_MERCHANT_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TinkMerchantLiveAPIService : MockServices.TinkMerchantMockAPIService
    },
    {
        provide: AbstractServices.TINK_PROVIDER_CONSENT_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TinkProviderConsentLiveAPIService : MockServices.TinkProviderConsentMockAPIService
    },
    {
        provide: AbstractServices.TINK_PROVIDER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TinkProviderLiveAPIService : MockServices.TinkProviderMockAPIService
    },
    {
        provide: AbstractServices.TINK_TRANSACTION_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TinkTransactionLiveAPIService : MockServices.TinkTransactionMockAPIService
    },
    {
        provide: AbstractServices.TINK_USER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TinkUserLiveAPIService : MockServices.TinkUserMockAPIService
    },
    {
        provide: AbstractServices.TINK_WEBHOOK_ENDPOINT_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.TinkWebhookEndpointLiveAPIService : MockServices.TinkWebhookEndpointMockAPIService
    }
]