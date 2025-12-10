import { ColumnDataType } from '../enums'
import { ColumnIdentifiers } from './column-identifiers'

export interface SchemaColumn {
    id: number
    columnIdentifiers: ColumnIdentifiers
    isNullable: boolean
    isCustom: boolean
    isArray: boolean
    dataType: ColumnDataType
    customDataType?: string
}