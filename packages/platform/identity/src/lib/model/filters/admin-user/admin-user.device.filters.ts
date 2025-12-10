import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { DeviceSystem } from '../../enums'
import { AdminUserDeviceResponse } from '../../responses'

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

export const adminUserDeviceFilterEntityMap: QueryFilterEntityMap<
    AdminUserDeviceFilters,
    AdminUserDeviceResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    localDeviceIdentifier: 'localDeviceIdentifier',
    system: 'system',
    osVersion: 'osVersion',
    lastSeenAt: 'lastSeenAt',
    userAgent: 'userAgent',
    apnsPushToken: 'apnsPushToken',
    fcmPushToken: 'fcmPushToken'
}