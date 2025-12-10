import { makeTransformEnumPipeSignature } from "@zwp/platform.common";

export enum StoreCardStatus {
    active = 'active',
    archived = 'archived',
    blocked = 'blocked'
}

export enum StoreCardStatusLabel {
    active = 'Active',
    archived = 'Archived',
    blocked = 'Blocked'
}

export const storeCardLabelPipeSignature = makeTransformEnumPipeSignature(
    StoreCardStatus,
    StoreCardStatusLabel
)