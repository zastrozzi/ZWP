import { DateQueryFilter, EnumQueryFilter, Nullable, NumberQueryFilter, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { Project } from './project.interfaces'
import { ProjectStatus } from './project.enums'

export interface ProjectFilters {
    dbCreatedAt: Nullable<DateQueryFilter>
    dbUpdatedAt: Nullable<DateQueryFilter>
    dbDeletedAt: Nullable<DateQueryFilter>
    name: Nullable<StringQueryFilter>
    description: Nullable<StringQueryFilter>
    status: Nullable<EnumQueryFilter<ProjectStatus>>
    startDate: Nullable<DateQueryFilter>
    endDate: Nullable<DateQueryFilter>
    budget: Nullable<NumberQueryFilter>
}

export const initialProjectFilters: ProjectFilters = {
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
    name: null,
    description: null,
    status: null,
    startDate: null,
    endDate: null,
    budget: null,
}

export const projectFilterEntityMap: QueryFilterEntityMap<
    ProjectFilters,
    Project
> = {
    dbCreatedAt: 'dbCreatedAt',
    dbUpdatedAt: 'dbUpdatedAt',
    dbDeletedAt: 'dbDeletedAt',
    name: 'name',
    description: 'description',
    status: 'status',
    startDate: 'startDate',
    endDate: 'endDate',
    budget: 'budget'
}