import { ColumnInterface } from './column-interface'

export interface TableLayoutEntity {
    id: string
    allColumns: ColumnInterface<object>[]
}