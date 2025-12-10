import { ZWPISO3166Alpha2 } from '@zwp/platform.common'
import { ClientAPIModel } from '../../client-api'

export interface TinkMerchantResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    tinkAppId: string
    categoryCode: ClientAPIModel.PartnerIntegration.Merchants.MerchantCategoryCode
    countryCode: ZWPISO3166Alpha2
    tinkId: string
    name: string
    organizationNumber: string
    status: ClientAPIModel.PartnerIntegration.Merchants.MerchantStatus
    url: string
}
