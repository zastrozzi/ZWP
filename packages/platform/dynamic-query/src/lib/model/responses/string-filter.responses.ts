import { ColumnIdentifiers } from '../common'
import { FilterMethod } from '../enums'

export interface StringFilterResponse {
    id: string;
    dbCreatedAt: Date;
    dbUpdatedAt: Date;
    dbDeletedAt?: Date;
    column: ColumnIdentifiers;
    fieldIsArray: boolean;
    filterMethod: FilterMethod;
    filterValue?: string;
    filterArrayValue?: string[];
    structuredQueryId: string;
    parentGroupId?: string;
}