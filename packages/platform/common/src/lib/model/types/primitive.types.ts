import { isNil, isNull, isUndefined } from '../../utils'

export type nil = null | undefined

export type Nilable<T> = T | nil
export type Nullable<T> = T | null
export type Undefinable<T> = T | undefined
export type NonNil<T> = T extends nil ? never : T
export type Without<T> = {[P in keyof T]?: never}
export type XOR<T, U> = (Without<T> & U) | (Without<U> & T)

export type ValueOf<T> = T[keyof T]
export type NonEmptyArray<T> = [T, ...T[]]
export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never

export type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType & (string | number)]: 
        NonNullable<ObjectType[Key]> extends object
            ? `${Key}` | `${Key}.${NestedKeyOf<NonNullable<ObjectType[Key]>>}`
            : `${Key}`
}[keyof ObjectType & (string | number)];

export const getNestedValue = <T extends object, K = NestedKeyOf<T> | keyof T>(obj: T, key: K): any => {
    const keys = (key as string).split('.')
    return keys.reduce((acc, curr) => {
        if (isNull(acc)) { return null }
        if (isUndefined(acc)) { return undefined }
        else { return acc[curr as keyof typeof acc] as any }
    }, obj)
}

export type FlexibleKeyOf<T extends object> = NestedKeyOf<T> | keyof T