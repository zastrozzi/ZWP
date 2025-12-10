import { ColumnIdentifiers } from '../common'
import { FilterMethod } from '../enums'


export interface DateFilterResponse {
    id: string;
    dbCreatedAt: Date;
    dbUpdatedAt: Date;
    dbDeletedAt?: Date;
    column: ColumnIdentifiers;
    fieldIsArray: boolean;
    filterMethod: FilterMethod;
    filterValue?: Date;
    filterArrayValue?: Date[];
    structuredQueryId: string;
    parentGroupId?: string;
}