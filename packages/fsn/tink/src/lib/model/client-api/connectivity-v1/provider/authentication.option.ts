import { Field } from './field'
import { SupportedChannel } from './supported-channel'

export interface AuthenticationOption {
    default?: boolean
    displayText?: string
    fields?: Field[]
    helpText?: string
    name?: string
    supportedChannels?: SupportedChannel[]
}