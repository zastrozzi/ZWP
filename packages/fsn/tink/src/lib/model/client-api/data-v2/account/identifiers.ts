import { Common } from '../../common'
import { FinancialInstitution } from './financial-institution'
import { Pan } from './pan'
import { SortCode } from './sort-code'

export interface Identifiers {
    financialInstitution?: FinancialInstitution
    iban?: Common.IBAN
    pan?: Pan
    sortCode?: SortCode
}