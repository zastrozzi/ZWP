import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum ProviderStatus {
    enabled = "ENABLED",
    temporaryDisabled = "TEMPORARY_DISABLED",
    disabled = "DISABLED"
}

export enum ProviderStatusLabel {
    enabled = "Enabled",
    temporaryDisabled = "Temporary Disabled",
    disabled = "Disabled"
}

export const providerStatusLabelEnumPipe = makeTransformEnumPipeSignature(
    ProviderStatus,
    ProviderStatusLabel
)

