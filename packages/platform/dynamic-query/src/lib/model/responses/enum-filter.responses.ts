import { ColumnIdentifiers } from '../common'
import { FilterMethod } from '../enums'


export interface EnumFilterResponse {
    id: string;
    dbCreatedAt: Date;
    dbUpdatedAt: Date;
    dbDeletedAt?: Date;
    column: ColumnIdentifiers;
    fieldIsArray: boolean;
    enumName: string;
    filterMethod: FilterMethod;
    filterValue?: string;
    filterArrayValue?: string[];
    structuredQueryId: string;
    parentGroupId?: string;
}