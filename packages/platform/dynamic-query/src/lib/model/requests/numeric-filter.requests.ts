import { ColumnIdentifiers } from '../common'
import { FilterMethod, NumericDataType } from '../enums'

export interface CreateNumericFilterRequest {
    column: ColumnIdentifiers;
    fieldIsArray: boolean;
    filterMethod: FilterMethod;
    numericDataType: NumericDataType;
    int8FilterValue?: number;
    int8ArrayFilterValue?: number[];
    int16FilterValue?: number;
    int16ArrayFilterValue?: number[];
    int32FilterValue?: number;
    int32ArrayFilterValue?: number[];
    int64FilterValue?: number;
    int64ArrayFilterValue?: number[];
    uint8FilterValue?: number;
    uint8ArrayFilterValue?: number[];
    uint16FilterValue?: number;
    uint16ArrayFilterValue?: number[];
    uint32FilterValue?: number;
    uint32ArrayFilterValue?: number[];
    uint64FilterValue?: number;
    uint64ArrayFilterValue?: number[];
    doubleFilterValue?: number;
    doubleArrayFilterValue?: number[];
    floatFilterValue?: number;
    floatArrayFilterValue?: number[];
}

export interface UpdateNumericFilterRequest {
    column?: ColumnIdentifiers;
    fieldIsArray?: boolean;
    filterMethod?: FilterMethod;
    numericDataType?: NumericDataType;
    int8FilterValue?: number;
    int8ArrayFilterValue?: number[];
    int16FilterValue?: number;
    int16ArrayFilterValue?: number[];
    int32FilterValue?: number;
    int32ArrayFilterValue?: number[];
    int64FilterValue?: number;
    int64ArrayFilterValue?: number[];
    uint8FilterValue?: number;
    uint8ArrayFilterValue?: number[];
    uint16FilterValue?: number;
    uint16ArrayFilterValue?: number[];
    uint32FilterValue?: number;
    uint32ArrayFilterValue?: number[];
    uint64FilterValue?: number;
    uint64ArrayFilterValue?: number[];
    doubleFilterValue?: number;
    doubleArrayFilterValue?: number[];
    floatFilterValue?: number;
    floatArrayFilterValue?: number[];
}