import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { AssetStatus } from '../enums'
import { PartnerAssetAssignmentResponse, SubgroupAssetAssignmentResponse } from '../responses'

export interface PartnerAssetAssignmentFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    role: Nullable<StringQueryFilter>
    status: Nullable<EnumQueryFilter<AssetStatus>>
}

export interface SubgroupAssetAssignmentFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    role: Nullable<StringQueryFilter>
    status: Nullable<EnumQueryFilter<AssetStatus>>
}

export const initialPartnerAssetAssignmentFilters: PartnerAssetAssignmentFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    role: null,
    status: null
}

export const initialSubgroupAssetAssignmentFilters: SubgroupAssetAssignmentFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    role: null,
    status: null
}

export const partnerAssetAssignmentFilterEntityMap: QueryFilterEntityMap<
    PartnerAssetAssignmentFilters,
    PartnerAssetAssignmentResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    role: 'role',
    status: 'status'
}

export const subgroupAssetAssignmentFilterEntityMap: QueryFilterEntityMap<
    SubgroupAssetAssignmentFilters,
    SubgroupAssetAssignmentResponse
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    role: 'role',
    status: 'status'
}