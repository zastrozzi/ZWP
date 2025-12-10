import { ClientAPIModel } from '../../client-api'

export interface TinkV1CredentialsResponse {
    id: string // UUID as string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    tinkId: string
    fields: { [key: string]: string }
    sessionExpiryDate?: Date
    status?: ClientAPIModel.ConnectivityV1.Credentials.CredentialsStatus
    statusPayload?: string
    statusUpdated?: Date
    supplementalInformation?: { [key: string]: string }
    type?: ClientAPIModel.ConnectivityV1.Credentials.CredentialsType
    updated?: Date
    providerId: string // UUID as string
    tinkUserId?: string // UUID as string
}