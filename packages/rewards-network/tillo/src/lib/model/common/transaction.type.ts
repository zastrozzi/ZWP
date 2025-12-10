import { makeTransformEnumPipeSignature } from "@zwp/platform.common";

export enum TransactionType {
    digitalIssuance = "digital_issuance",
    digitalCashOut = "digital_cash_out",
    cancelledDigitalIssuance = "cancelled_digital_issuance",
    physicalActivation = "physical_activation",
    physicalTopUp = "physical_top_up",
    physicalCashOut = "physical_cash_out",
    cancelledPhysicalActivation = "cancelled_physical_activation",
    cancelledPhysicalTopUp = "cancelled_physical_top_up",
    balanceCheck = "balance_check"
}

export enum TransactionTypeLabel {
    digitalIssuance = 'Digital Issuance' ,
    digitalCashOut = 'Digital Cash Out',
    cancelledDigitalIssuance = "Cancelled Digital Issuance",
    physicalActivation = "Physical Activation",
    physicalTopUp = "Physical Top up",
    physicalCashOut = "Physical Cash out",
    cancelledPhysicalActivation = "Cancelled Physical Activation",
    cancelledPhysicalTopUp = "Cancelled Physical Top up",
    balanceCheck = "Balance Check"
}

export const transactionTypePipeSignature = makeTransformEnumPipeSignature(
    TransactionType,
    TransactionTypeLabel
)