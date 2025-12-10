import { ColumnIdentifiers } from '../common'
import { FilterMethod } from '../enums'

export interface CreateEnumFilterRequest {
    column: ColumnIdentifiers;
    fieldIsArray: boolean;
    enumName: string;
    filterMethod: FilterMethod;
    filterValue?: string;
    filterArrayValue?: string[];
}

export interface UpdateEnumFilterRequest {
    column?: ColumnIdentifiers;
    fieldIsArray?: boolean;
    enumName?: string;
    filterMethod?: FilterMethod;
    filterValue?: string;
    filterArrayValue?: string[];
}