export interface ZWPDeleteConfirmationData {
    title: string
    message: string
    confirmButtonLabel: string
    confirmPermanentButtonLabel: string
    cancelButtonLabel: string
    hasPermanentDelete: boolean
}

export const defaultZWPDeleteConfirmationData: ZWPDeleteConfirmationData = {
    title: 'Delete this item',
    message: 'Are you sure you want to delete this item?',
    confirmButtonLabel: 'Delete',
    confirmPermanentButtonLabel: 'Delete Permanently',
    cancelButtonLabel: 'Cancel',
    hasPermanentDelete: false
}

export enum ZWPDeleteConfirmationResult {
    CONFIRM = 'CONFIRM',
    CONFIRM_PERMANENT = 'CONFIRM_PERMANENT',
    CANCEL = 'CANCEL'
}