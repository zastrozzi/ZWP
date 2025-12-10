import { DateQueryFilter, Nullable, QueryFilterEntityMap } from '@zwp/platform.common'
import { ServerAPIModel } from '../server-api'

export interface AccountConsentFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
}

export const initialAccountConsentFilters: AccountConsentFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
}

export const accountConsentFilterEntityMap: QueryFilterEntityMap<
    AccountConsentFilters,
    ServerAPIModel.Consent.TinkV1AccountConsentResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
}
