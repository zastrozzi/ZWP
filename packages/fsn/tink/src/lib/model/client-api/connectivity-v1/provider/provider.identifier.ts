import { ZWPISO3166Alpha2 } from '@zwp/platform.common'

export interface ProviderIdentifier {
    market: ZWPISO3166Alpha2
    providerName?: string
    type: string
    value: string
}