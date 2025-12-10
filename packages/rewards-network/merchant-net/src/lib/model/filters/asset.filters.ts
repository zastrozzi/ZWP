import { DateQueryFilter, EnumQueryFilter, FileExtension, Nullable, QueryFilterEntityMap, StringQueryFilter } from "@zwp/platform.common";
import { AssetStatus } from '../enums'
import { AssetResponse } from '../responses'

export interface AssetFilters {
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>,
    status: Nullable<EnumQueryFilter<AssetStatus>>,
    assetName: Nullable<StringQueryFilter>,
    assetUrl: Nullable<StringQueryFilter>,
    assetType: Nullable<EnumQueryFilter<FileExtension>>
}

export const initialAssetFilters: AssetFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    status: null,
    assetName: null,
    assetUrl: null,
    assetType: null,
}

export const assetFilterEntityMap: QueryFilterEntityMap<AssetFilters, AssetResponse> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    status: 'status',
    assetName: 'assetName',
    assetUrl: 'assetUrl',
    assetType: 'assetType'
}