import { isNil, isNull, isUndefined } from './optional.utils'

export const arrayDistinctFilter = <T>(value: T, index: number, self: T[]) => { return self.indexOf(value) === index }
export const arrayDistinctUpsert = <T>(existing: T[] | undefined, ...newValue: T[]) => ([...safeArray(existing), ...safeArray(newValue)].filter(arrayDistinctFilter))
export const arrayDistinctRemove = <T>(existing: T[] | undefined, ...removeValue: T[]) => (safeArray(existing).filter(x => !removeValue.includes(x)).filter(arrayDistinctFilter))
export const safeArray = <T>(array: T[] | undefined) => array ?? []
export const arrayHasDuplicates = <T>(array: T[]) => array.length !== new Set(array).size
export const arrayHasNulls = <T>(array: T[]) => array.some(x => isNull(x))
export const arrayHasUndefineds = <T>(array: T[]) => array.some(x => isUndefined(x))
export const arrayHasNils = <T>(array: T[]) => array.some(x => isNil(x))

export const randomFromArray = <T>(array: T[]): T | null => {
    if (array.length === 0) { return null }
    return array[Math.floor(Math.random() * array.length)]
}

export const randomFromNonEmptyArray = <T>(array: T[]): T => {
    // if (array.length === 0) { return null }
    return array[Math.floor(Math.random() * array.length)]
}