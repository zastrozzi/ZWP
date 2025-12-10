import { isNil, isNull } from './optional.utils'
import { isArray, isObject, isString } from './primitive-type.utils'

export const arraysContentEqual = (a: any[], b: any[]): boolean => {
    if (a.length !== b.length) { return false }
    return a.some((v) => b.includes(v)) && b.some((v) => a.includes(v))
}

export const arraysStrictEqual = (a: any[], b: any[]): boolean => {
    if (a.length !== b.length) { return false }
    return a.every((v, i) => b[i] === v) && b.every((v, i) => a[i] === v)
}

export const areEqual = (a: any, b: any): boolean => {
    if (isNil(a) || isNil(b)) { return false }
    if (isArray(a) && isArray(b)) { return arraysStrictEqual(a, b) }
    if (isString(a) && isString(b)) { return a === b }
    if (isObject(a) && isObject(b)) { return JSON.stringify(a).toLowerCase() === JSON.stringify(b).toLowerCase() }
    if (isString(a) && isArray(b)) { return b.length > 0 && b[0] === a }
    if (isArray(a) && isString(b)) { return a.length > 0 && a[0] === b }
    return a === b
}

export const stringOrNonOrderedArrayEqual = (a: string | any[], b: string | any[]): boolean => {
    if (isNil(a) || isNil(b)) { return false }
    if (isArray(a) && isArray(b)) { return arraysContentEqual(a, b) }
    if (isString(a) && isString(b)) { return a === b }
    return false
}

// export const guardElseThrow = <C extends boolean>(condition: () => C, throwing: () => void): C => {
//     if (condition() === true) { return true as C } else { throw throwing() }
// }

