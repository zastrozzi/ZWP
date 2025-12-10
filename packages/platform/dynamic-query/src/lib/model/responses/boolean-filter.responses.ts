import { ColumnIdentifiers } from '../common'
import { FilterMethod } from '../enums'

export interface BooleanFilterResponse {
    id: string;
    dbCreatedAt: Date;
    dbUpdatedAt: Date;
    dbDeletedAt?: Date;
    column: ColumnIdentifiers;
    fieldIsArray: boolean;
    filterMethod: FilterMethod;
    filterValue?: boolean;
    filterArrayValue?: boolean[];
    structuredQueryId: string;
    parentGroupId?: string;
}