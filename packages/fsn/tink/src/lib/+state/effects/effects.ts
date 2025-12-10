import { EnvironmentProviders } from '@angular/core'
import { provideEffects } from '@ngrx/effects'

import { TinkAccountConsentEffects } from './account-consent.effects'
import { TinkAccountEffects } from './account.effects'
import { TinkCredentialEffects } from './credential.effects'
import { TinkMerchantEffects } from './merchant.effects'
import { TinkProviderConsentEffects } from './provider-consent.effects'
import { TinkProviderEffects } from './provider.effects'
import { TinkTransactionEffects } from './transaction.effects'
import { TinkUserEffects } from './user.effects'
import { TinkWebhookEndpointEffects } from './webhook-endpoint.effects'

export const environmentProviders: EnvironmentProviders[] = [
    provideEffects(
        TinkAccountEffects,
        TinkAccountConsentEffects,
        TinkCredentialEffects,
        TinkMerchantEffects,
        TinkProviderEffects,
        TinkProviderConsentEffects,
        TinkTransactionEffects,
        TinkUserEffects,
        TinkWebhookEndpointEffects
    )
]