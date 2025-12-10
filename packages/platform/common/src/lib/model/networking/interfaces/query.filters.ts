import { HttpParams } from '@angular/common/http'
import { FlexibleKeyOf, Nullable } from "../../types"
import { createHTTPParams, upsertHTTPParams } from '../../../utils'
import { Observable } from 'rxjs'

export type DateQueryFilter = {
    lessThan: Nullable<number>
    greaterThan: Nullable<number>
    equalTo: Nullable<number>
}

export type NumberQueryFilter = {
    lessThan: Nullable<number>
    greaterThan: Nullable<number>
    equalTo: Nullable<number>
    lessThanOrEqualTo: Nullable<number>
    greaterThanOrEqualTo: Nullable<number>
}

export type StringQueryFilter = {
    equalTo: Nullable<string>
    contains: Nullable<string>
}

export type EnumQueryFilter<Enum> = {
    equalTo: Nullable<Enum>
    in: Nullable<Enum[]>
    all: Nullable<Enum[]>
    notIn: Nullable<Enum[]>
}

export type BooleanQueryFilter = {
    equalTo: Nullable<boolean>
}

export type GeometricPoint2DQueryFilter = {
    x: Nullable<NumberQueryFilter>
    y: Nullable<NumberQueryFilter>
}

export type AnyQueryFilter = DateQueryFilter | NumberQueryFilter | StringQueryFilter | EnumQueryFilter<unknown> | BooleanQueryFilter | GeometricPoint2DQueryFilter

export type QueryFilterEntityMap<Filters extends object, Entity extends object> = Record<keyof Filters, FlexibleKeyOf<Entity>>

export type QueryFilterCollection<Filters extends object> = Record<keyof Filters, Nullable<AnyQueryFilter>>

export const selectQueryFilters = <Filters extends object>(filters: Filters): QueryFilterCollection<Filters> => (filters as QueryFilterCollection<Filters>)

export const isDateQueryFilter = (filter: AnyQueryFilter): filter is DateQueryFilter => {
    return (filter as DateQueryFilter).lessThan !== undefined && (filter as DateQueryFilter).greaterThan !== undefined && (filter as DateQueryFilter).equalTo !== undefined
}

export const isNumberQueryFilter = (filter: AnyQueryFilter): filter is NumberQueryFilter => {
    return (filter as NumberQueryFilter).lessThan !== undefined && (filter as NumberQueryFilter).greaterThan !== undefined && (filter as NumberQueryFilter).equalTo !== undefined && (filter as NumberQueryFilter).lessThanOrEqualTo !== undefined && (filter as NumberQueryFilter).greaterThanOrEqualTo !== undefined
}

export const isStringQueryFilter = (filter: AnyQueryFilter): filter is StringQueryFilter => {
    return (filter as StringQueryFilter).equalTo !== undefined && (filter as StringQueryFilter).contains !== undefined
}

export const isEnumQueryFilter = (filter: AnyQueryFilter): filter is EnumQueryFilter<unknown> => {
    return (filter as EnumQueryFilter<unknown>).equalTo !== undefined && (filter as EnumQueryFilter<unknown>).in !== undefined && (filter as EnumQueryFilter<unknown>).all !== undefined && (filter as EnumQueryFilter<unknown>).notIn !== undefined
}

export const isBooleanQueryFilter = (filter: AnyQueryFilter): filter is BooleanQueryFilter => {
    return (filter as BooleanQueryFilter).equalTo !== undefined
}

export const isGeometricPoint2DQueryFilter = (filter: AnyQueryFilter): filter is GeometricPoint2DQueryFilter => {
    return (filter as GeometricPoint2DQueryFilter).x !== undefined && (filter as GeometricPoint2DQueryFilter).y !== undefined
}

export const filterDateQuery = (filter: DateQueryFilter, value: Date): boolean => {
    const dateValue = Math.floor(value.getTime()/1000)
    return (
        (filter.lessThan === null || dateValue < filter.lessThan) &&
        (filter.greaterThan === null || dateValue > filter.greaterThan) &&
        (filter.equalTo === null || dateValue === filter.equalTo)
    )
}

export const filterNumberQuery = (filter: NumberQueryFilter, value: number): boolean => {
    return (
        (filter.lessThan === null || value < filter.lessThan) &&
        (filter.greaterThan === null || value > filter.greaterThan) &&
        (filter.equalTo === null || value === filter.equalTo) &&
        (filter.lessThanOrEqualTo === null || value <= filter.lessThanOrEqualTo) &&
        (filter.greaterThanOrEqualTo === null || value >= filter.greaterThanOrEqualTo)
    )
}

export const filterStringQuery = (filter: StringQueryFilter, value: string): boolean => {
    return (
        (filter.equalTo === null || value === filter.equalTo) &&
        (filter.contains === null || value.toLowerCase().includes(filter.contains.toLowerCase()))
    )
}

export const filterEnumQuery = <Enum>(filter: EnumQueryFilter<Enum>, value: Enum): boolean => {
    return (
        (filter.equalTo === null || value === filter.equalTo) &&
        (filter.in === null || filter.in.includes(value))
    )
}

export const filterBooleanQuery = (filter: BooleanQueryFilter, value: boolean): boolean => {
    return filter.equalTo === null || value === filter.equalTo
}

export const filterGeometricPoint2DQuery = (filter: GeometricPoint2DQueryFilter, value: { x: number, y: number }): boolean => {
    return (
        (filter.x === null || filterNumberQuery(filter.x, value.x)) &&
        (filter.y === null || filterNumberQuery(filter.y, value.y))
    )
}

export const serialiseDateQueryFilter = (paramName: string, filter: DateQueryFilter): HttpParams => {
    let params = new HttpParams()
    if (filter.lessThan) params = params.append(`${paramName}[lt]`, filter.lessThan)
    if (filter.greaterThan) params = params.append(`${paramName}[gt]`, filter.greaterThan)
    if (filter.equalTo) params = params.append(`${paramName}[eq]`, filter.equalTo)
    return params
}

export const serialiseNumberQueryFilter = (paramName: string, filter: NumberQueryFilter, scale: number = 1): HttpParams => {
    let params = new HttpParams()
    if (filter.lessThan) params = params.append(`${paramName}[lt]`, (filter.lessThan * scale).toString())
    if (filter.greaterThan) params = params.append(`${paramName}[gt]`, (filter.greaterThan * scale).toString())
    if (filter.equalTo) params = params.append(`${paramName}[eq]`, (filter.equalTo * scale).toString())
    if (filter.lessThanOrEqualTo) params = params.append(`${paramName}[lte]`, (filter.lessThanOrEqualTo * scale).toString())
    if (filter.greaterThanOrEqualTo) params = params.append(`${paramName}[gte]`, (filter.greaterThanOrEqualTo * scale).toString())
    return params
}

export const serialiseStringQueryFilter = (paramName: string, filter: StringQueryFilter): HttpParams => {
    let params = new HttpParams()
    if (filter.equalTo) params = params.append(`${paramName}[eq]`, filter.equalTo)
    if (filter.contains) params = params.append(`${paramName}[contains]`, filter.contains)
    return params
}

export const serialiseEnumQueryFilter = <Enum>(paramName: string, filter: EnumQueryFilter<Enum>): HttpParams => {
    let params = new HttpParams()
    if (filter.equalTo) params = params.append(`${paramName}[eq]`, filter.equalTo.toString())
    if (filter.in && filter.in.length > 0) {
        const inValues = filter.in.map((value) => (value as NonNullable<Enum>).toString()).join(',')
        params = params.append(`${paramName}[in]`, inValues)
    }
    if (filter.all && filter.all.length > 0) {
        const allValues = filter.all.map((value) => (value as NonNullable<Enum>).toString()).join(',')
        params = params.append(`${paramName}[all]`, allValues)
    }
    if (filter.notIn && filter.notIn.length > 0) {
        const notInValues = filter.notIn.map((value) => (value as NonNullable<Enum>).toString()).join(',')
        params = params.append(`${paramName}[not_in]`, notInValues)
    }
    return params
}

export const serialiseBooleanQueryFilter = (filter: BooleanQueryFilter): string => {
    let objectToSerialise = {}
    if (filter.equalTo) objectToSerialise = { ...objectToSerialise, eq: filter.equalTo }
    return JSON.stringify(objectToSerialise)
}

export const serialiseDateQueryFilterParams = (paramName: string, filter: Observable<Nullable<DateQueryFilter>>): HttpParams => {
    let newParams = createHTTPParams()
    filter.subscribe(filterValue => {
        if (filterValue) {
            newParams = upsertHTTPParams(newParams, serialiseDateQueryFilter(paramName, filterValue))
        }
    }).unsubscribe()
    return newParams
}

export const serialiseNumberQueryFilterParams = (paramName: string, filter: Observable<Nullable<NumberQueryFilter>>): HttpParams => {
    let newParams = createHTTPParams()
    filter.subscribe(filterValue => {
        if (filterValue) {
            newParams = upsertHTTPParams(newParams, serialiseNumberQueryFilter(paramName, filterValue))
        }
    }).unsubscribe()
    return newParams
}

export const serialiseStringQueryFilterParams = (paramName: string, filter: Observable<Nullable<StringQueryFilter>>): HttpParams => {
    let newParams = createHTTPParams()
    filter.subscribe(filterValue => {
        if (filterValue) {
            newParams = upsertHTTPParams(newParams, serialiseStringQueryFilter(paramName, filterValue))
        }
    }).unsubscribe()
    return newParams
}

export const serialiseEnumQueryFilterParams = <Enum>(paramName: string, filter: Observable<Nullable<EnumQueryFilter<Enum>>>): HttpParams => {
    let newParams = createHTTPParams()
    filter.subscribe(filterValue => {
        if (filterValue) {
            newParams = upsertHTTPParams(newParams, serialiseEnumQueryFilter(paramName, filterValue))
        }
    }).unsubscribe()
    return newParams
}

