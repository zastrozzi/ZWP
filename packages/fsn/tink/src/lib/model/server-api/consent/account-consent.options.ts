export interface TinkV1AccountConsentOptions {
    accountId: string // UUID as string
    tinkUserId: string // UUID as string
    providerId: string // UUID as string
    providerConsentId: string // UUID as string
}