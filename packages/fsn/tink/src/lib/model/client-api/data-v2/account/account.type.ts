import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum AccountType {
    undefined = "UNDEFINED",
    checking = "CHECKING",
    savings = "SAVINGS",
    creditCard = "CREDIT_CARD"
}

export enum AccountTypeLabel {
    undefined = "Undefined",
    checking = "Checking",
    savings = "Savings",
    creditCard = "Credit Card"
}

export const accountTypeLabelEnumPipe = makeTransformEnumPipeSignature(
    AccountType,
    AccountTypeLabel
)

