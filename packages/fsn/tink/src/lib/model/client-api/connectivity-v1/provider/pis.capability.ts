import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum PISCapability {
    unknown = "UNKNOWN",
    pisSeBg = "PIS_SE_BG",
    pisSePg = "PIS_SE_PG",
    pisSeBankTransfers = "PIS_SE_BANK_TRANSFERS",
    pisFutureDate = "PIS_FUTURE_DATE",
    pisSepaRecurringPayments = "PIS_SEPA_RECURRING_PAYMENTS",
    pisSepaIctRecurringPayments = "PIS_SEPA_ICT_RECURRING_PAYMENTS",
    sepaCreditTransfer = "SEPA_CREDIT_TRANSFER",
    sepaInstantCreditTransfer = "SEPA_INSTANT_CREDIT_TRANSFER",
    fasterPayments = "FASTER_PAYMENTS",
    chaps = "CHAPS",
    bacs = "BACS",
    norwegianDomesticCreditTransfer = "NORWEGIAN_DOMESTIC_CREDIT_TRANSFER",
    instantNorwegianDomesticCreditTransfer = "INSTANT_NORWEGIAN_DOMESTIC_CREDIT_TRANSFER_STRAKS",
    multiBanco = "MULTIBANCO",
    pisBulkPayments = "PIS_BULK_PAYMENTS",
    paymentCancellation = "PAYMENT_CANCELLATION",
    swissDomesticCreditTransfer = "SWISS_DOMESTIC_CREDIT_TRANSFER",
    danishDomesticCreditTransfer = "DANISH_DOMESTIC_CREDIT_TRANSFER",
    instantDanishDomesticCreditTransfer = "INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_STRAKS",
    instantDanishDomesticCreditTransferIntradag = "INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_INTRADAG",
    polishDomesticCreditTransfer = "POLISH_DOMESTIC_CREDIT_TRANSFER",
    instantPolishDomesticCreditTransfer = "INSTANT_POLISH_DOMESTIC_CREDIT_TRANSFER",
    vrpSweeping = "VRP_SWEEPING",
    vrpCommercial = "VRP_COMMERCIAL",
    pisMobileAutoSign = "PIS_MOBILE_AUTO_SIGN",
    paypal = "PAYPAL"
}

export enum PISCapabilityLabel {
    unknown = "Unknown",
    pisSeBg = "PIS SE BG",
    pisSePg = "PIS SE PG",
    pisSeBankTransfers = "PIS SE Bank Transfers",
    pisFutureDate = "PIS Future Date",
    pisSepaRecurringPayments = "PIS SEPA Recurring Payments",
    pisSepaIctRecurringPayments = "PIS SEPA ICT Recurring Payments",
    sepaCreditTransfer = "SEPA Credit Transfer",
    sepaInstantCreditTransfer = "SEPA Instant Credit Transfer",
    fasterPayments = "Faster Payments",
    chaps = "CHAPS",
    bacs = "BACS",
    norwegianDomesticCreditTransfer = "Norwegian Domestic Credit Transfer",
    instantNorwegianDomesticCreditTransfer = "Instant Norwegian Domestic Credit Transfer Straks",
    multiBanco = "MultiBanco",
    pisBulkPayments = "PIS Bulk Payments",
    paymentCancellation = "Payment Cancellation",
    swissDomesticCreditTransfer = "Swiss Domestic Credit Transfer",
    danishDomesticCreditTransfer = "Danish Domestic Credit Transfer",
    instantDanishDomesticCreditTransfer = "Instant Danish Domestic Credit Transfer Straks",
    instantDanishDomesticCreditTransferIntradag = "Instant Danish Domestic Credit Transfer Intradag",
    polishDomesticCreditTransfer = "Polish Domestic Credit Transfer",
    instantPolishDomesticCreditTransfer = "Instant Polish Domestic Credit Transfer",
    vrpSweeping = "VRP Sweeping",
    vrpCommercial = "VRP Commercial",
    pisMobileAutoSign = "PIS Mobile Auto Sign",
    paypal = "PayPal"
}

export const pisCapabilityLabelEnumPipe = makeTransformEnumPipeSignature(
    PISCapability,
    PISCapabilityLabel
)