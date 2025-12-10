import { Common } from '../../common'
import { BalanceDetails } from './balance.details'

export interface Balances {
    accountId?: string
    balances?: BalanceDetails
    creditLimit?: Common.Balance
    refreshed?: Date
}