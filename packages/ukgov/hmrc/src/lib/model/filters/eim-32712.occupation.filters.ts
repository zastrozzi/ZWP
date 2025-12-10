import { DateQueryFilter, EnumQueryFilter, Nullable, NumberQueryFilter, StringQueryFilter } from '@zwp/platform.common'
import { EIM32712Industry } from '../enums'

export interface EIM32712OccupationFilters {
    industry: Nullable<EnumQueryFilter<EIM32712Industry>>
    name: Nullable<StringQueryFilter>
    deduction: Nullable<NumberQueryFilter>
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
}