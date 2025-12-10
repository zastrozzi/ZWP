import { ACCOUNT_COMPONENTS } from './account'
import { COMMON_COMPONENTS } from './common'
import { MERCHANT_COMPONENTS } from './merchant'
import { PROVIDER_COMPONENTS } from './provider'
import { PROVIDER_CONSENT_COMPONENTS } from './provider-consent'
import { TRANSACTION_COMPONENTS } from './transaction'
import { USER_COMPONENTS } from './user'
import { TinkHomeComponent } from './tink.home.component'

export const INTERNAL_COMPONENTS = {
    TinkHomeComponent,
    ACCOUNT_COMPONENTS,
    COMMON_COMPONENTS,
    MERCHANT_COMPONENTS,
    PROVIDER_COMPONENTS,
    PROVIDER_CONSENT_COMPONENTS,
    TRANSACTION_COMPONENTS,
    USER_COMPONENTS,
    ALL: [
        TinkHomeComponent,
        ...ACCOUNT_COMPONENTS.ALL,
        ...COMMON_COMPONENTS.ALL,
        ...MERCHANT_COMPONENTS.ALL,
        ...PROVIDER_COMPONENTS.ALL,
        ...PROVIDER_CONSENT_COMPONENTS.ALL,
        ...TRANSACTION_COMPONENTS.ALL,
        ...USER_COMPONENTS.ALL
    ]
}