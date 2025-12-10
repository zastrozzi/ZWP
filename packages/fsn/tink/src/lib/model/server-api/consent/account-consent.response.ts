export interface TinkV1AccountConsentResponse {
    id: string // UUID as string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    accountId: string // UUID as string
    tinkUserId: string // UUID as string
    providerId: string // UUID as string
    providerConsentId: string // UUID as string
}