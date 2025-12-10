import { ClientAPIModel } from '../../client-api'

export interface TinkV2TransactionResponse {
    id: string // UUID as string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date

    amount: ClientAPIModel.Common.CurrencyDenominatedAmount
    bookedDateTime?: Date
    categories?: ClientAPIModel.DataV2.Transaction.Categories
    counterparties?: ClientAPIModel.DataV2.Transaction.Counterparties
    dates?: ClientAPIModel.DataV2.Transaction.Dates
    descriptions?: ClientAPIModel.DataV2.Transaction.Descriptions
    tinkId: string
    identifiers?: ClientAPIModel.DataV2.Transaction.Identifiers
    merchantInformation?: ClientAPIModel.DataV2.Transaction.MerchantInformation
    providerMutability?: ClientAPIModel.Common.Mutability
    reference?: string
    status: ClientAPIModel.DataV2.Transaction.TransactionStatus
    transactionDateTime?: Date
    types?: ClientAPIModel.DataV2.Transaction.TransactionTypes
    valueDateTime?: Date

    accountId: string // UUID as string
}