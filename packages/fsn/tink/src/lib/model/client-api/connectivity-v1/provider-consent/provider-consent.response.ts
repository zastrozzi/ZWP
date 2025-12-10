import { ConnectivityErrorResponse } from './connectivity-error.response'
import { ProviderConsentStatus } from './provider-consent.status'

export interface ProviderConsentResponse {
    accountIds?: string[]
    credentialsId?: string
    detailedError?: ConnectivityErrorResponse
    providerName?: string
    sessionExpiryDate?: Date
    sessionExtendable?: boolean
    status?: ProviderConsentStatus
    statusUpdated?: Date
}