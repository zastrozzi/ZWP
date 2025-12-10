import { filter } from 'rxjs'
import { Undefinable } from '../model'
import { isUndefined } from '../utils'

export function includeFilter<V, KV>(keyPath: (value: V) => KV = (value) => (value as unknown as KV), include: Undefinable<KV[]> = undefined) {
    return filter((value: V) => { 
        const keyValue = keyPath(value)
        if (isUndefined(include)) { return true }
        if (!isUndefined(include) && include.includes(keyValue)) { return true }
        return false
    })
}

export function excludeFilter<V, KV>(keyPath: (value: V) => KV = (value) => (value as unknown as KV), exclude: Undefinable<KV[]> = undefined) {
    return filter((value: V) => {
        const keyValue = keyPath(value)
        if (isUndefined(exclude)) { return true }
        if (!isUndefined(exclude) && exclude.includes(keyValue)) { return false }
        return false
    })
}

export function includeExcludeFilter<V, KV>(keyPath: (value: V) => KV = (value) => (value as unknown as KV), include: Undefinable<KV[]> = undefined, exclude: Undefinable<KV[]> = undefined) {
    return filter((value: V) => { 
        const keyValue = keyPath(value)
        if (isUndefined(include) && isUndefined(exclude)) { return true }
        if (isUndefined(exclude) && !isUndefined(include) && include.includes(keyValue)) { return true }
        if (isUndefined(include) && !isUndefined(exclude) && exclude.includes(keyValue)) { return false }
        if (!isUndefined(include) && !isUndefined(exclude) && include.includes(keyValue) && !exclude.includes(keyValue)) { return true }
        return false
    })
}