import { Nilable, Nullable, Undefinable } from "../model";

export const isNil = <T>(value: Nilable<T>): value is undefined | null => value === undefined || value === null
export const isNull = <T>(value: Nullable<T>): value is null => value === null
export const isUndefined = <T>(value: Undefinable<T>): value is undefined => value === undefined

export const removeNilValues = (obj: any): any => {
    const copy = { ...obj }
    for (const key in obj) {
        if (isNil(obj[key])) { delete copy[key] }
    }
    return copy
}
  