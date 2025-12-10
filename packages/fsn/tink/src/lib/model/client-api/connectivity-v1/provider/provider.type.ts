import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum ProviderType {
    bank = "BANK",
    creditCard = "CREDIT_CARD",
    broker = "BROKER",
    test = "TEST",
    other = "OTHER"
}

export enum ProviderTypeLabel {
    bank = "Bank",
    creditCard = "Credit Card",
    broker = "Broker",
    test = "Test",
    other = "Other"
}

export const providerTypeLabelEnumPipe = makeTransformEnumPipeSignature(
    ProviderType,
    ProviderTypeLabel
)