import { Identity } from './identity'
import { PartyRole } from './party.role'

export interface Party {
    identity: Identity
    role: PartyRole
}