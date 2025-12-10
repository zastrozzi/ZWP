import { AuthenticationOptionsGroup } from './authentication.options-group'

export interface ProviderAuthenticationOptions {
    authenticationOptionsGroups?: AuthenticationOptionsGroup[]
    providerName?: string
}