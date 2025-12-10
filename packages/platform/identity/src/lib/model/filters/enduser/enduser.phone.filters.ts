import { BooleanQueryFilter, DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { PhoneContactMethod } from '../../enums'
import { EnduserPhoneResponse } from '../../responses'

export interface EnduserPhoneFilters {
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

export const initialEnduserPhoneFilters: EnduserPhoneFilters = {
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

export const enduserPhoneFilterEntityMap: QueryFilterEntityMap<
    EnduserPhoneFilters,
    EnduserPhoneResponse
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