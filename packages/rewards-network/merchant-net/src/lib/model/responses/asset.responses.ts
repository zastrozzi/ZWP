import { FileExtension } from '@zwp/platform.common'
import { AssetStatus } from '../enums'

export interface AssetResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date
    status: AssetStatus
    assetName: string
    assetUrl?: string
    assetType: FileExtension
    merchantId: string
}