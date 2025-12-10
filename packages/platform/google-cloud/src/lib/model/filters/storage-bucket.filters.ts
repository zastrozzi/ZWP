import { DateQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { Responses } from '../responses'

export interface StorageBucketFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    name: Nullable<StringQueryFilter>
}

export const initialStorageBucketFilters: StorageBucketFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    name: null
}

export const storageBucketFilterEntityMap: QueryFilterEntityMap<
    StorageBucketFilters,
    Responses.StorageBucketResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    name: 'name'
}