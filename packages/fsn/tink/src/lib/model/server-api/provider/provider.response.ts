import { ISO4217CurrencyCode, ZWPISO3166Alpha2 } from '@zwp/platform.common'
import { ClientAPIModel } from '../../client-api'

export interface TinkV1ProviderResponse {
    id: string // UUID as string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date

    accessType: ClientAPIModel.ConnectivityV1.Provider.AccessType
    authenticationFlow?: ClientAPIModel.ConnectivityV1.Provider.AuthenticationFlow
    authenticationUserType: ClientAPIModel.ConnectivityV1.Provider.AuthenticationUserType
    capabilities: ClientAPIModel.ConnectivityV1.Provider.Capability[]
    credentialsType: ClientAPIModel.ConnectivityV1.Credentials.CredentialsType
    currency: ISO4217CurrencyCode // ISO4217 currency code as string
    displayDescription?: string
    displayName: string
    fields: ClientAPIModel.ConnectivityV1.Provider.Field[]
    financialInstitutionId: string
    financialInstitutionName: string
    financialServices?: ClientAPIModel.ConnectivityV1.Provider.FinancialService[]
    groupDisplayName?: string
    hasAuthenticationOptions: boolean
    images?: ClientAPIModel.ConnectivityV1.Provider.ImageUrls
    keywords?: string[]
    loginheaderColour?: string
    market: ZWPISO3166Alpha2
    multiFactor: boolean
    name: string
    passwordHelpText?: string
    pisCapabilities?: ClientAPIModel.ConnectivityV1.Provider.PISCapability[]
    popular: boolean
    rank?: number
    releaseStatus?: string
    status: ClientAPIModel.ConnectivityV1.Provider.ProviderStatus
    transactional: boolean
    type: ClientAPIModel.ConnectivityV1.Provider.ProviderType
}