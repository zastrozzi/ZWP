import { TrackedTransactionPart } from "./transactions.tracked-transation-part"

export interface TransactionPart {
    commissionGroupId: number
    amount: number
    commissionAmount: number,
    commissionGroupCode: string,
    commissionGroupName: string,
    trackedParts: TrackedTransactionPart[]
    
}