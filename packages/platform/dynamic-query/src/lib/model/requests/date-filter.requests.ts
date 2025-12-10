import { ColumnIdentifiers } from '../common'
import { FilterMethod } from '../enums'

export interface CreateDateFilterRequest {
    column: ColumnIdentifiers;
    fieldIsArray: boolean;
    filterMethod: FilterMethod;
    filterValue?: Date;
    filterArrayValue?: Date[];
}

export interface UpdateDateFilterRequest {
    column?: ColumnIdentifiers;
    fieldIsArray?: boolean;
    filterMethod?: FilterMethod;
    filterValue?: Date;
    filterArrayValue?: Date[];
}