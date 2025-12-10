import { ColumnIdentifiers } from '../common'
import { FilterMethod } from '../enums'

export interface CreateStringFilterRequest {
    column: ColumnIdentifiers;
    fieldIsArray: boolean;
    filterMethod: FilterMethod;
    filterValue?: string;
    filterArrayValue?: string[];
}

export interface UpdateStringFilterRequest {
    column?: ColumnIdentifiers;
    fieldIsArray?: boolean;
    filterMethod?: FilterMethod;
    filterValue?: string;
    filterArrayValue?: string[];
}