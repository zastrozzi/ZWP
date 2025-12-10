import { AuthenticationOption } from './authentication.option'

export interface AuthenticationOptionsGroup {
    authenticationOptions?: AuthenticationOption[]
    displayText?: string
    helpText?: string
    name?: string
}