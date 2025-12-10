import { DateQueryFilter, EnumQueryFilter, Nullable, QueryFilterEntityMap, StringQueryFilter } from "@zwp/platform.common";
import { CategoryStatus } from '../enums'
import { CategoryResponse } from '../responses'

export interface CategoryFilters {
    name: Nullable<StringQueryFilter>,
    status: Nullable<EnumQueryFilter<CategoryStatus>>,
    
    
    dbCreatedAt: Nullable<DateQueryFilter>,
    dbUpdatedAt: Nullable<DateQueryFilter>,
    dbDeletedAt: Nullable<DateQueryFilter>
}

export const initialCategoryFilters: CategoryFilters = {
    name: null,
    status: null,
    
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null
}

export const categoryFilterEntityMap: QueryFilterEntityMap<
    CategoryFilters,
    CategoryResponse
> = {
    name: 'name',
    status: 'status',
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt'
}