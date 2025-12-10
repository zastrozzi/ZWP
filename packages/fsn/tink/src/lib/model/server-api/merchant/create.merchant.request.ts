import { ClientAPIModel } from '../../client-api'

export interface CreateTinkMerchantRequest {
    categoryCode: ClientAPIModel.PartnerIntegration.Merchants.MerchantCategoryCode
    countryCode: string
    externalId?: string
    name: string
    organizationNumber: string
    url: string
}