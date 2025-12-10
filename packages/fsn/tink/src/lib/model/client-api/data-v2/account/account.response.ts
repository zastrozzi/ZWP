import { Common } from '../../common'
import { AccountType } from './account.type'
import { CustomerSegment } from './customer.segment'
import { Identifiers } from './identifiers'

export interface AccountResponse {
    balances?: Common.Balances
    customerSegment?: CustomerSegment
    dates: Common.Dates
    financialInstitutionId?: string
    id: string
    identifiers?: Identifiers
    name: string
    type: AccountType
}