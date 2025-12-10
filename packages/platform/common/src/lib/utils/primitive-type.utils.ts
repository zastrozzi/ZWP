import { MustInclude, Nilable, NonEmptyArray, Nullable, Undefinable } from '../model'
import { isNil, isNull } from './optional.utils'

export const isDate = (value: any): value is Date => value instanceof Date
export const isNumber = (value: any): value is number => typeof value === 'number'
export const isString = (value: any): value is string => typeof value === 'string'
export const isBoolean = (value: any): value is boolean => typeof value === 'boolean'
export const isObject = (value: any): value is object => !isNil(value) && typeof value === 'object'
export const isArray = (value: any): value is any[] => !isNull(value) && Array.isArray(value)
export const isEmpty = (value: any): boolean => isNull(value) || value === '' || value.length === 0 || Object.keys(value).length === 0
export const isEmptyObject = (value: any): boolean => isObject(value) && isEmpty(value)
export const isNonEmptyObject = (value: any): boolean => isObject(value) && !isEmpty(value)
// eslint-disable-next-line no-prototype-builtins
export const isObjectWithProperty = <X extends object, Y extends PropertyKey>(value: X, property: Y): value is X & Record<Y, unknown> => isObject(value) && value.hasOwnProperty(property)
export const coerceNumber = (value: any, fallback: number = 0): number => (isNumber(value) ? value : isString(value) ? parseFloat(value) : fallback)
export const coerceString = (value: any, fallback: string = ''): string => (isString(value) ? value : isNumber(value) ? value.toString() : fallback)
export const coerceBoolean = (value: any, fallback: boolean = false): boolean => (isBoolean(value) ? value : isString(value) ? value === 'true' : fallback)

export const propertyOrNull = <T, K extends keyof T>(value: T, property: K): Nullable<NonNullable<T[K]>> => (isObject(value) && isObjectWithProperty(value, property) ? value[property] ?? null : null)
export const propertyOrUndefined = <T, K extends keyof T>(value: T, property: K): Undefinable<NonNullable<T[K]>> =>
    isObject(value) && isObjectWithProperty(value, property) ? value[property] ?? undefined : undefined
export const propertyOrThrow = <T, K extends keyof T>(value: T, property: K): NonNullable<T[K]> => {
    const result = propertyOrNull(value, property)
    if (isNil(result)) {
        throw new Error(`Property ${property.toString()} is not defined on ${value}`)
    }
    return result
}

export const tryNumber = (value: any): Nullable<number> => (isNil(value) ? null : isNumber(value) ? value : isString(value) ? parseFloat(value) : null)
export const tryString = (value: any): Nullable<string> => (isNil(value) ? null : isString(value) ? value : isNumber(value) ? value.toString() : null)
export const tryBoolean = (value: any): Nullable<boolean> => (isNil(value) ? null : isBoolean(value) ? value : isString(value) ? value === 'true' : null)
export const tryPrimitive = <P = string | number | boolean>(value: any, fallback: P): Nullable<P> =>
    isNil(value) ? null : isString(fallback) ? (tryString(value) as P) : isNumber(fallback) ? (tryNumber(value) as P) : isBoolean(fallback) ? (tryBoolean(value) as P) : null

export const isTrue = (value: any): boolean => !isNil(value) && isBoolean(value) && value === true
export const isFalse = (value: any): boolean => !isNil(value) && isBoolean(value) && value === false

export const isEmptyString = (value: any): boolean => isString(value) && isEmpty(value)

export const stringUnionToArray = <T>(...elements: MustInclude<T, NonEmptyArray<T>>) => elements

export const removeNullAndUndefinedValues = (obj: any): any => {
    const copy = { ...obj }

    for (const key in obj) {
        if (obj[key] === undefined || obj[key] === null) {
            delete copy[key]
        }
    }

    return copy
}

export const createObjectFromPartial = <T extends object>(obj: Partial<T>): T => {
    const result: any = {}

    for (const key in obj) {
        if (!isNil(obj[key])) {
            result[key] = obj[key]
        } else {
            result[key] = typeof (obj as T)[key] === 'undefined' ? undefined : null
        }
    }

    return result
}