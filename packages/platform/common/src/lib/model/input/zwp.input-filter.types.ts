import { DateQueryFilter, EnumQueryFilter, NumberQueryFilter, StringQueryFilter } from '../networking'
import { TransformEnumPipeSignature } from '../transform-enum-pipe.signature'
import { Nullable } from '../types'

export enum ZWPFilterChipInputType {
    STRING = 'string',
    NUMBER = 'number',
    DATE = 'date',
    ENUM = 'enum',
}

export enum ZWPNumberFilterType {
    LESS_THAN = 'lessThan',
    GREATER_THAN = 'greaterThan',
    RANGE = 'range',
    EQUAL_TO = 'equalTo'
}

export enum ZWPNumberFilterTypeLabel {
    LESS_THAN = 'Less Than',
    GREATER_THAN = 'Greater Than',
    RANGE = 'Range',
    EQUAL_TO = 'Equals'
}

export enum ZWPDateFilterType {
    LESS_THAN = 'lessThan',
    GREATER_THAN = 'greaterThan',
    RANGE = 'range',
    EQUAL_TO = 'equalTo'
}

export enum ZWPDateFilterTypeLabel {
    LESS_THAN = 'Less Than',
    GREATER_THAN = 'Greater Than',
    RANGE = 'Range',
    EQUAL_TO = 'Equals'
}

export enum ZWPStringFilterType {
    CONTAINS = 'contains',
    EQUAL_TO = 'equalTo'
}

export enum ZWPStringFilterTypeLabel {
    CONTAINS = 'Contains',
    EQUAL_TO = 'Equals'
}

export enum ZWPEnumFilterType {
    IN = 'in',
    NOT_IN = 'not',
    EQUAL_TO = 'equalTo'
}

export enum ZWPEnumFilterTypeLabel {
    IN = 'In',
    NOT_IN = 'Not In',
    EQUAL_TO = 'Equals'
}

export interface FilterChip {
    type: ZWPFilterChipInputType
    name: string
    displayName: string
    stringFilter: Nullable<StringQueryFilter>
    numberFilter: Nullable<NumberQueryFilter>
    dateFilter: Nullable<DateQueryFilter>
    enumFilter: Nullable<EnumQueryFilter<unknown>>
    stringFilterType: Nullable<ZWPStringFilterType>
    numberFilterType: Nullable<ZWPNumberFilterType>
    dateFilterType: Nullable<ZWPDateFilterType>
    enumFilterType: Nullable<ZWPEnumFilterType>
}

export interface FilterChipEvent {
    filter: FilterChip
    action: 'add' | 'remove'
}

export interface FilterDefinition {
    displayName: string
    name: string
    type: ZWPFilterChipInputType
    enumDefinition: Nullable<TransformEnumPipeSignature>
}

export interface FilterTypeDefinition {
    inputType: ZWPFilterChipInputType
    filterType: (ZWPDateFilterType | ZWPNumberFilterType | ZWPStringFilterType | ZWPEnumFilterType)
}
