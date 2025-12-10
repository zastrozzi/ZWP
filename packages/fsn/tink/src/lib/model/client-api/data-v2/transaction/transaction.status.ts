import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum TransactionStatus {
    undefined = "UNDEFINED",
    pending = "PENDING",
    booked = "BOOKED"
}

export enum TransactionStatusLabel {
    undefined = "Undefined",
    pending = "Pending",
    booked = "Booked"
}

export const transactionStatusLabelEnumPipe = makeTransformEnumPipeSignature(
    TransactionStatus,
    TransactionStatusLabel
)