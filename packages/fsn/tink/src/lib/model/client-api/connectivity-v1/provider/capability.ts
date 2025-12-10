import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum Capability {
    unknown = "UNKNOWN",
    transfers = "TRANSFERS",
    einvoices = "EINVOICES",
    mortgageAggregation = "MORTGAGE_AGGREGATION",
    checkingAccounts = "CHECKING_ACCOUNTS",
    savingsAccounts = "SAVINGS_ACCOUNTS",
    creditCards = "CREDIT_CARDS",
    loans = "LOANS",
    investments = "INVESTMENTS",
    payments = "PAYMENTS",
    identityData = "IDENTITY_DATA",
    createBeneficiaries = "CREATE_BENEFICIARIES",
    listBeneficiaries = "LIST_BENEFICIARIES",
    createBeneficiariesInPayment = "CREATE_BENEFICIARIES_IN_PAYMENT"
}

export enum CapabilityLabel {
    unknown = "Unknown",
    transfers = "Transfers",
    einvoices = "E-invoices",
    mortgageAggregation = "Mortgage Aggregation",
    checkingAccounts = "Checking Accounts",
    savingsAccounts = "Savings Accounts",
    creditCards = "Credit Cards",
    loans = "Loans",
    investments = "Investments",
    payments = "Payments",
    identityData = "Identity Data",
    createBeneficiaries = "Create Beneficiaries",
    listBeneficiaries = "List Beneficiaries",
    createBeneficiariesInPayment = "Create Beneficiaries in Payment"
}

export const capabilityLabelEnumPipe = makeTransformEnumPipeSignature(
    Capability,
    CapabilityLabel
)