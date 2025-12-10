import { TinkAccountConsentFacade } from './account-consent.facade'
import { TinkAccountFacade } from './account.facade'
import { TinkCredentialFacade } from './credential.facade'
import { TinkMerchantFacade } from './merchant.facade'
import { TinkProviderConsentFacade } from './provider-consent.facade'
import { TinkProviderFacade } from './provider.facade'
import { TinkTransactionFacade } from './transaction.facade'
import { TinkUserFacade } from './user.facade'
import { TinkWebhookEndpointFacade } from './webhook-endpoint.facade'

export * from './account-consent.facade'
export * from './account.facade'
export * from './credential.facade'
export * from './merchant.facade'
export * from './provider-consent.facade'
export * from './provider.facade'
export * from './transaction.facade'
export * from './user.facade'
export * from './webhook-endpoint.facade'

export const ALL = [
    TinkAccountConsentFacade,
    TinkAccountFacade,
    TinkCredentialFacade,
    TinkMerchantFacade,
    TinkProviderConsentFacade,
    TinkProviderFacade,
    TinkTransactionFacade,
    TinkUserFacade,
    TinkWebhookEndpointFacade
]