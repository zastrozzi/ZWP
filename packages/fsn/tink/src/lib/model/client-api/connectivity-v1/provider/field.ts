import { SelectOption } from './select.option'

export interface Field {
    additionalInfo?: string
    checkbox?: boolean
    defaultValue?: string
    description?: string
    group?: string
    helpText?: string
    hint?: string
    immutable?: boolean
    masked?: boolean
    maxLength?: number
    minLength?: number
    name?: string
    numeric?: boolean
    oneOf?: boolean
    optional?: boolean
    options?: string[]
    pattern?: string
    patternError?: string
    selectOptions?: SelectOption[]
    sensitive?: boolean
    style?: string
    type?: string
    value?: string
}