
export type ZWPDictionaryEntry<T> = [key: string, value: T]
export type ZWPDictionary<T> = { [key: string]: T }

export const filterDictionary = <T>(
    input: ZWPDictionary<T>, 
    predicate: (item: T) => boolean
): ZWPDictionary<T> => {
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
    reducer: (acc: V, curr: ZWPDictionaryEntry<T>, i: number, arr: ZWPDictionaryEntry<T>[]) => V, initialValue: V
): V => Object.entries(input).reduce((acc, curr, i, arr) => reducer(acc, curr, i, arr), initialValue)

export const reduceRightDictionary = <T, V>(
    input: ZWPDictionary<T>, 
    reducer: (acc: V, curr: ZWPDictionaryEntry<T>, i: number, arr: ZWPDictionaryEntry<T>[]) => V, initialValue: V
): V => Object.entries(input).reduceRight((acc, curr, i, arr) => reducer(acc, curr, i, arr), initialValue)