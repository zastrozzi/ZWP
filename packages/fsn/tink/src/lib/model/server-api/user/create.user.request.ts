import { ZWPISO3166Alpha2 } from '@zwp/platform.common'
import { ClientAPIModel } from '../../client-api'

export interface CreateTinkUserRequest {
    locale?: ClientAPIModel.Common.TinkLocale
    market: ZWPISO3166Alpha2  // ISO3166CountryAlpha2Code as string
    retentionClass?: ClientAPIModel.General.User.RetentionClass
}