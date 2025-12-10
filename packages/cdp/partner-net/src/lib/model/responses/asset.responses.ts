import { FileExtension } from '@zwp/platform.common'
import { AssetStatus } from '../enums'

export interface AssetResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    name: string
    url?: string
    type: FileExtension
    status: AssetStatus
}
