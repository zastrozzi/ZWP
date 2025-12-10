import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum BrandStatusCode {
    ENABLED = "ENABLED",
    DISABLED = "DISABLED",
    PAUSED = "PAUSED"
}

export enum BrandStatusLabel {
    ENABLED = 'Enabled',
    DISABLED = 'Disabled',
    PAUSED = 'Paused'
}

export const brandStatusLabelPipeSignature = makeTransformEnumPipeSignature(
    BrandStatusCode,
    BrandStatusLabel
)