import { COLUMN_COMPONENTS } from './column'
import { RELATIONSHIP_COMPONENTS } from './relationship'
import { TABLE_COMPONENTS } from './table'

export * from './column'
export * from './relationship'
export * from './table'

export const QUERYABLE_SCHEMA_COMPONENTS = {
    COLUMN_COMPONENTS,
    RELATIONSHIP_COMPONENTS,
    TABLE_COMPONENTS,

    ALL: [
        ...COLUMN_COMPONENTS.ALL,
        ...RELATIONSHIP_COMPONENTS.ALL,
        ...TABLE_COMPONENTS.ALL
    ]
}