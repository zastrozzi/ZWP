import { Nullable, QueryFilterEntityMap, StringQueryFilter } from '@zwp/platform.common'
import { QueryableSchemaTableResponse } from '../responses'

export interface QueryableSchemaTableFilters {
    displayName: Nullable<StringQueryFilter>
    tableName: Nullable<StringQueryFilter>
    schemaName: Nullable<StringQueryFilter>
}

export const initialQueryableSchemaTableFilters: QueryableSchemaTableFilters = {
    displayName: null,
    tableName: null,
    schemaName: null
}

export const queryableSchemaTableFilterEntityMap: QueryFilterEntityMap<
    QueryableSchemaTableFilters, 
    QueryableSchemaTableResponse
> = {
    displayName: 'displayName',
    tableName: 'tableIdentifiers.table',
    schemaName: 'tableIdentifiers.schema'
}