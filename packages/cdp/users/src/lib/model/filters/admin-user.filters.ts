import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter } from "@zwp/platform.common";
import { CredentialType, DeviceSystem, PhoneContactMethod } from '../enums'

export interface AdminUserFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    firstName: Nullable<StringQueryFilter>,
    lastName: Nullable<StringQueryFilter>,
    role: Nullable<StringQueryFilter>
}

export interface AdminUserCredentialFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    credentialType: Nullable<EnumQueryFilter<CredentialType>>,
    isValid: Nullable<boolean>
}

export interface AdminUserEmailFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    emailAddressValue: Nullable<StringQueryFilter>,
    isVerified: Nullable<boolean>
}

export interface AdminUserDeviceFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    localDeviceIdentifier: Nullable<StringQueryFilter>,
    system: Nullable<EnumQueryFilter<DeviceSystem>>,
    osVersion: Nullable<StringQueryFilter>,
    lastSeenAt: Nullable<DateQueryFilter>,
    userAgent: Nullable<StringQueryFilter>,
    apnsPushToken: Nullable<StringQueryFilter>,
    fcmPushToken: Nullable<StringQueryFilter>
}

export interface AdminUserPhoneFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    phoneNumberValue: Nullable<StringQueryFilter>,
    isWhatsapp: Nullable<boolean>,
    isSMS: Nullable<boolean>,
    isVoice: Nullable<boolean>,
    isWhatsappVerified: Nullable<boolean>,
    isSMSVerified: Nullable<boolean>,
    isVoiceVerified: Nullable<boolean>,
    preferredContactMethod: Nullable<EnumQueryFilter<PhoneContactMethod>>
}

export interface AdminUserSessionFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    isActive: Nullable<boolean>
}

export const initialAdminUserFilters: AdminUserFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    firstName: null,
    lastName: null,
    role: null
}

export const initialAdminUserCredentialFilters: AdminUserCredentialFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    credentialType: null,
    isValid: null
}

export const initialAdminUserEmailFilters: AdminUserEmailFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    emailAddressValue: null,
    isVerified: null
}

export const initialAdminUserDeviceFilters: AdminUserDeviceFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    localDeviceIdentifier: null,
    system: null,
    osVersion: null,
    lastSeenAt: null,
    userAgent: null,
    apnsPushToken: null,
    fcmPushToken: null
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

export const initialAdminUserSessionFilters: AdminUserSessionFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    isActive: null
}