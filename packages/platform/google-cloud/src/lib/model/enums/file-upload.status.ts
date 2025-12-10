import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum FileUploadStatus {
    uploading = 'uploading',
    processing = 'processing',
    paused = 'paused',
    completed = 'completed',
    cancelled = 'cancelled',
    failed = 'failed'
}

export enum FileUploadStatusLabel {
    uploading = 'Uploading',
    processing = 'Processing',
    paused = 'Paused',
    completed = 'Completed',
    cancelled = 'Cancelled',
    failed = 'Failed'
}

export const fileUploadStatusLabelPipe = makeTransformEnumPipeSignature(FileUploadStatus, FileUploadStatusLabel)