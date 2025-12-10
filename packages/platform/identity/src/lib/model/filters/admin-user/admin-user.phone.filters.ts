import { BooleanQueryFilter, DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { PhoneContactMethod } from '../../enums'
import { AdminUserPhoneResponse } from '../../responses'

export interface AdminUserPhoneFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    phoneNumberValue: Nullable<StringQueryFilter>,
    isWhatsapp: Nullable<BooleanQueryFilter>,
    isSMS: Nullable<BooleanQueryFilter>,
    isVoice: Nullable<BooleanQueryFilter>,
    isWhatsappVerified: Nullable<BooleanQueryFilter>,
    isSMSVerified: Nullable<BooleanQueryFilter>,
    isVoiceVerified: Nullable<BooleanQueryFilter>,
    preferredContactMethod: Nullable<EnumQueryFilter<PhoneContactMethod>>
}

export const initialAdminUserPhoneFilters: AdminUserPhoneFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    phoneNumberValue: null,
    isWhatsapp: null,
    isSMS: null,
    isVoice: null,
    isWhatsappVerified: null,
    isSMSVerified: null,
    isVoiceVerified: null,
    preferredContactMethod: null
}

export const adminUserPhoneFilterEntityMap: QueryFilterEntityMap<
    AdminUserPhoneFilters,
    AdminUserPhoneResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    phoneNumberValue: 'phoneNumberValue',
    isWhatsapp: 'isWhatsapp',
    isSMS: 'isSMS',
    isVoice: 'isVoice',
    isWhatsappVerified: 'isWhatsappVerified',
    isSMSVerified: 'isSMSVerified',
    isVoiceVerified: 'isVoiceVerified',
    preferredContactMethod: 'preferredContactMethod'
}