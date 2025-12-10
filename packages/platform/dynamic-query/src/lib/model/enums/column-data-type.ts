import { TransformEnumPipeSignature } from '@zwp/platform.common'

export enum ColumnDataType {
    bool = "bool",
    bytea = "bytea",
    char = "char",
    date = "date",
    float4 = "float4",
    float8 = "float8",
    int2 = "int2",
    int4 = "int4",
    int8 = "int8",
    interval = "interval",
    json = "json",
    jsonb = "jsonb",
    numeric = "numeric",
    text = "text",
    time = "time",
    timestamp = "timestamp",
    timestamptz = "timestamptz",
    timetz = "timetz",
    uuid = "uuid",
    varchar = "varchar",
    xml = "xml",
    custom = "custom"
}

export enum ColumnDataTypeLabel {
    bool = "Boolean",
    bytea = "Binary Data",
    char = "Character",
    date = "Date",
    float4 = "Float",
    float8 = "Double",
    int2 = "Short",
    int4 = "Integer",
    int8 = "Long",
    interval = "Time Interval",
    json = "JSON",
    jsonb = "JSON Binary",
    numeric = "Numeric",
    text = "Text",
    time = "Time",
    timestamp = "Timestamp",
    timestamptz = "Timestamp (with Timezone)",
    timetz = "Time (with Timezone)",
    uuid = "UUID",
    varchar = "String",
    xml = "XML",
    custom = "Custom"
}

export const columnDataTypeLabelPipeSignature: TransformEnumPipeSignature = { input: ColumnDataType, output: ColumnDataTypeLabel }