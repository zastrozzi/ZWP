import { ClientAPIModel } from '../../client-api'

export interface TinkV1ProviderConsentResponse {
    id: string // UUID as string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    detailedError?: ClientAPIModel.ConnectivityV1.ProviderConsent.ConnectivityErrorResponse
    sessionExpiryDate?: Date
    sessionExtendable?: boolean
    status?: ClientAPIModel.ConnectivityV1.ProviderConsent.ProviderConsentStatus
    statusUpdated?: Date
    credentialsId?: string // UUID as string
    providerId?: string // UUID as string
}