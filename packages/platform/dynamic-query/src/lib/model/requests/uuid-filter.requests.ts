import { ColumnIdentifiers } from '../common'
import { FilterMethod } from '../enums'

export interface CreateUUIDFilterRequest {
    column: ColumnIdentifiers;
    fieldIsArray: boolean;
    filterMethod: FilterMethod;
    filterValue?: string;
    filterArrayValue?: string[];
}

export interface UpdateUUIDFilterRequest {
    column?: ColumnIdentifiers;
    fieldIsArray?: boolean;
    filterMethod?: FilterMethod;
    filterValue?: string;
    filterArrayValue?: string[];
}