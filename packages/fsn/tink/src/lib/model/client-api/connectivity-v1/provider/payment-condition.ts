import { PaymentConditionOperator } from './payment-condition.operator'
import { PaymentConditionRule } from './payment-condition.rule'
import { PaymentConditionValue } from './payment-condition.value'

export interface PaymentCondition {
    operator: PaymentConditionOperator
    rule: PaymentConditionRule
    value: PaymentConditionValue
}