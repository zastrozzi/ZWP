import { DateQueryFilter, EnumQueryFilter, FileExtension, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { AssetStatus } from '../enums'
import { AssetResponse } from '../responses'

export interface AssetFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    name: Nullable<StringQueryFilter>
    url: Nullable<StringQueryFilter>
    type: Nullable<EnumQueryFilter<FileExtension>>
    status: Nullable<EnumQueryFilter<AssetStatus>>
}

export const initialAssetFilters: AssetFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    name: null,
    url: null,
    type: null,
    status: null
}
export const assetFilterEntityMap: QueryFilterEntityMap<
    AssetFilters,
    AssetResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    name: 'name',
    url: 'url',
    type: 'type',
    status: 'status'
}