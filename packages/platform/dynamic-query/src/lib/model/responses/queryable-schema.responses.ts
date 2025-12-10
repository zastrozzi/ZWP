import { ColumnIdentifiers, TableIdentifiers } from '../common'
import { ColumnDataType, RelationshipType } from '../enums'

export interface QueryableSchemaTableResponse {
    id: string;
    displayName: string
    tableIdentifiers: TableIdentifiers
}

export interface QueryableSchemaColumnResponse {
    id: string
    columnIdentifiers: ColumnIdentifiers
    ordinalPosition: number
    isNullable: boolean
    isCustom: boolean
    isArray: boolean
    isPrimaryKey: boolean
    isForeignKey: boolean
    isUnique: boolean
    dataType: ColumnDataType
    customDataType?: string
    tableId: string
}

export interface QueryableSchemaRelationshipResponse {
    id: string
    relationshipType: RelationshipType
    isOptional: boolean
    fromColumn: ColumnIdentifiers
    toColumn: ColumnIdentifiers
    joinFromColumn?: ColumnIdentifiers
    joinToColumn?: ColumnIdentifiers
    fromTableId: string
    fromColumnId: string
    toTableId: string
    toColumnId: string
    joinTableId?: string
    joinFromColumnId?: string
    joinToColumnId?: string
}