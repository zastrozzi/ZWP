import { ColumnIdentifiers } from '../common'
import { FilterMethod } from '../enums'

export interface CreateBooleanFilterRequest {
    column: ColumnIdentifiers;
    fieldIsArray: boolean;
    filterMethod: FilterMethod;
    filterValue?: boolean;
    filterArrayValue?: boolean[];
}

export interface UpdateBooleanFilterRequest {
    column?: ColumnIdentifiers;
    fieldIsArray?: boolean;
    filterMethod?: FilterMethod;
    filterValue?: boolean;
    filterArrayValue?: boolean[];
}