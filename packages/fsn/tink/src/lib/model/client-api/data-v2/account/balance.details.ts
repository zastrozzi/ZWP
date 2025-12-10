import { Common } from '../../common'

export interface BalanceDetails {
    availableBalanceExcludingCredit?: Common.Balance
    availableBalanceIncludingCredit?: Common.Balance
    bookedBalance?: Common.Balance
}