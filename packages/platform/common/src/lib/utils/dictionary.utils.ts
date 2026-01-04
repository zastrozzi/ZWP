export type ZWPDictionaryEntry<T> = [key: string, value: T]
export type ZWPDictionary<T> = { [key: string]: T }

export type ZWPEnumDictionary<E extends object, T> = {
    [K in Extract<keyof E, string>]: T
}
export type ZWPEnumDictionaryPartial<E extends object, T> = Partial<ZWPEnumDictionary<E, T>>

export const hasAllKeys = <K extends readonly string[]>(
    obj: Record<string, unknown>,
    keys: K
): obj is Record<K[number], unknown> => keys.every((key) => key in obj)

export const deleteKeys = <K extends readonly string[]>(obj: Record<string, unknown>, keys: K): void => {
    for (const key of keys) {
        delete obj[key]
    }
}

export const filterDictionary = <T>(input: ZWPDictionary<T>, predicate: (item: T) => boolean): ZWPDictionary<T> => {
    const obj: ZWPDictionary<T> = {}
    for (const k in input) {
        if (predicate(input[k] as T)) {
            obj[k] = input[k]
        }
    }
    return obj
}

export const mapDictionary = <T, S>(
    input: ZWPDictionary<T>,
    transform: (entry: ZWPDictionaryEntry<T>) => S
): ZWPDictionary<S> => {
    const obj: ZWPDictionary<S> = {}
    for (const k in input) {
        obj[k] = transform([k, input[k]])
    }
    return obj
}

export const reduceDictionary = <T, V>(
    input: ZWPDictionary<T>,
    reducer: (acc: V, curr: ZWPDictionaryEntry<T>, i: number, arr: ZWPDictionaryEntry<T>[]) => V,
    initialValue: V
): V => Object.entries(input).reduce((acc, curr, i, arr) => reducer(acc, curr, i, arr), initialValue)

export const reduceRightDictionary = <T, V>(
    input: ZWPDictionary<T>,
    reducer: (acc: V, curr: ZWPDictionaryEntry<T>, i: number, arr: ZWPDictionaryEntry<T>[]) => V,
    initialValue: V
): V => Object.entries(input).reduceRight((acc, curr, i, arr) => reducer(acc, curr, i, arr), initialValue)

export const filterEnumDictionary = <E extends object, T>(
    input: ZWPEnumDictionaryPartial<E, T>,
    predicate: (item: T) => boolean
): ZWPEnumDictionaryPartial<E, T> => {
    const obj: ZWPEnumDictionaryPartial<E, T> = {}
    for (const k in input) {
        const val = input[k as Extract<keyof E, string>] as T | undefined
        if (val !== undefined && predicate(val)) {
            obj[k as Extract<keyof E, string>] = val
        }
    }
    return obj
}

export const mapEnumDictionary = <E extends object, T, S>(
    input: ZWPEnumDictionaryPartial<E, T>,
    transform: (entry: ZWPDictionaryEntry<T>) => S
): ZWPEnumDictionaryPartial<E, S> => {
    const obj: ZWPEnumDictionaryPartial<E, S> = {}
    for (const k in input) {
        const v = input[k as Extract<keyof E, string>]
        if (v !== undefined) obj[k as Extract<keyof E, string>] = transform([k, v as T])
    }
    return obj
}

export const reduceEnumDictionary = <E extends object, T, V>(
    input: ZWPEnumDictionaryPartial<E, T>,
    reducer: (acc: V, curr: ZWPDictionaryEntry<T>, i: number, arr: ZWPDictionaryEntry<T>[]) => V,
    initialValue: V
): V =>
    Object.entries(input).reduce(
        (acc, curr, i, arr) => reducer(acc, curr as ZWPDictionaryEntry<T>, i, arr as ZWPDictionaryEntry<T>[]),
        initialValue
    )

export const dictToEnumDictionary = <E extends object, T>(
    input: ZWPDictionary<T>,
    e: E
): ZWPEnumDictionaryPartial<E, T> => {
    const obj: ZWPEnumDictionaryPartial<E, T> = {}
    const namedKeys = Object.keys(e).filter((k) => Number.isNaN(Number(k))) as Extract<keyof E, string>[]
    for (const k of namedKeys) {
        if (Object.prototype.hasOwnProperty.call(input, k)) {
            obj[k] = input[k]
        }
    }
    return obj
}

export const filterDictionaryToEnum = <E extends object, T>(
    input: ZWPDictionary<T>,
    e: E,
    predicate: (item: T) => boolean
): ZWPEnumDictionaryPartial<E, T> => {
    const obj: ZWPEnumDictionaryPartial<E, T> = {}
    const namedKeys = Object.keys(e).filter((k) => Number.isNaN(Number(k))) as Extract<keyof E, string>[]
    for (const k of namedKeys) {
        if (Object.prototype.hasOwnProperty.call(input, k)) {
            const v = input[k]
            if (predicate(v)) obj[k] = v
        }
    }
    return obj
}

export const reduceDictionaryOverEnum = <E extends object, T, V>(
    input: ZWPDictionary<T>,
    e: E,
    reducer: (acc: V, curr: ZWPDictionaryEntry<T>, i: number, arr: ZWPDictionaryEntry<T>[]) => V,
    initialValue: V
): V => {
    const namedKeys = Object.keys(e).filter((k) => Number.isNaN(Number(k))) as Extract<keyof E, string>[]
    const entries: ZWPDictionaryEntry<T>[] = []
    for (const k of namedKeys) {
        if (Object.prototype.hasOwnProperty.call(input, k)) {
            entries.push([k, input[k]])
        }
    }
    return entries.reduce(
        (acc, curr, i, arr) => reducer(acc, curr as ZWPDictionaryEntry<T>, i, arr as ZWPDictionaryEntry<T>[]),
        initialValue
    )
}

export function arrayToDictionary<T extends Record<K, string>, K extends Extract<keyof T, string>>(
    arr: T[],
    key: K
): ZWPDictionary<T>
export function arrayToDictionary<T, K extends Extract<keyof T, string>>(arr: T[], key: K): ZWPDictionary<T>
export function arrayToDictionary<T, K extends Extract<keyof T, string>>(arr: T[], key: K): ZWPDictionary<T> {
    const obj: ZWPDictionary<T> = {}
    for (const item of arr) {
        const k = (item as T)[key]
        if (typeof k === 'string') {
            obj[k] = item
        }
    }
    return obj
}

export function arrayToDictionaryStrict<T, K extends Extract<keyof T, string>>(arr: T[], key: K): ZWPDictionary<T> {
    const obj: ZWPDictionary<T> = {}
    for (const item of arr) {
        const rawKey = (item as T)[key]
        if (typeof rawKey !== 'string') {
            throw new TypeError(
                `arrayToDictionaryStrict: key property "${String(key)}" must be a string. Received ${typeof rawKey}`
            )
        }
        if (Object.prototype.hasOwnProperty.call(obj, rawKey)) {
            throw new Error(`arrayToDictionaryStrict: duplicate key "${rawKey}" encountered`)
        }
        obj[rawKey] = item
    }
    return obj
}

export function arrayToDictionaryMulti<T, K extends Extract<keyof T, string>>(arr: T[], key: K): ZWPDictionary<T[]> {
    const obj: ZWPDictionary<T[]> = {}
    for (const item of arr) {
        const rawKey = (item as T)[key]
        if (typeof rawKey !== 'string') continue
        if (!Object.prototype.hasOwnProperty.call(obj, rawKey)) obj[rawKey] = []
        obj[rawKey].push(item)
    }
    return obj
}

export function arrayToEnumDictionaryMulti<E extends object, T, K extends Extract<keyof T, string>>(
    arr: T[],
    key: K,
    e: E
): ZWPEnumDictionaryPartial<E, T[]> {
    const obj: ZWPEnumDictionaryPartial<E, T[]> = {}
    const namedKeys = Object.keys(e).filter((k) => Number.isNaN(Number(k))) as Extract<keyof E, string>[]
    const valid = new Set<string>(namedKeys)
    for (const item of arr) {
        const rawKey = (item as T)[key]
        if (typeof rawKey !== 'string') continue
        if (!valid.has(rawKey)) continue
        const k = rawKey as Extract<keyof E, string>
        if (!Object.prototype.hasOwnProperty.call(obj, k)) obj[k] = []
        obj[k]?.push(item)
    }
    return obj
}
