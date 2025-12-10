import { Enums } from '../enums'

export interface FileUpload {
    id: string
    uploadStarted: Date
    name: string
    size: number
    status: Enums.FileUploadStatus
    progress: number
    error?: string
}