import { randomFromArray, randomFromNonEmptyArray } from './array.utils'

export const getInputEnumKey = (value: string, iEnum: object) => Object.entries(iEnum).find(([, val]) => val === value)?.[0] as string
export const getOutputEnumValue = (value: string, oEnum: object) => oEnum[value as keyof typeof oEnum] as string

export const transformEnum = (value: string, iEnum: object, oEnum: object) => {
    const inputEnumKey = getInputEnumKey(value, iEnum)
    const outputEnumValue = getOutputEnumValue(inputEnumKey, oEnum)
    return outputEnumValue
}

export const transformEnumArray = (value: string[], iEnum: object, oEnum: object) => {
    const inputEnumKeys = value.map((v) => getInputEnumKey(v, iEnum))
    const outputEnumValues = inputEnumKeys.map((k) => getOutputEnumValue(k, oEnum))
    return outputEnumValues
}

export const allEnumCases = <Enum extends object>(o: Enum) => Object.keys(o).map((key) => o[key as keyof Enum])

export const randomEnumCase = <E extends object>(e: E): E[keyof E] => {
    const namedKeys = Object.keys(e).filter((k) => Number.isNaN(Number(k)))
    const values = namedKeys.map((k) => e[k as keyof E]) as E[keyof E][]
    return randomFromNonEmptyArray(values)
}

