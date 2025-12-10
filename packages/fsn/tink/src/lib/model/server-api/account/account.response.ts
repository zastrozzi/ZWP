import { ClientAPIModel } from '../../client-api'

export interface TinkV2AccountResponse {
    id: string // UUID as string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    balances?: ClientAPIModel.Common.Balances
    customerSegment?: ClientAPIModel.DataV2.Account.CustomerSegment
    dates: ClientAPIModel.Common.Dates
    financialInstitutionId?: string
    tinkId: string
    identifiers?: ClientAPIModel.DataV2.Account.Identifiers
    name: string
    type: ClientAPIModel.DataV2.Account.AccountType
    tinkUserId: string // UUID as string
}