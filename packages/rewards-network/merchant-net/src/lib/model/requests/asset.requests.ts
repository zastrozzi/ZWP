import { FileExtension } from '@zwp/platform.common'
import { AssetStatus } from '../enums'

export interface CreateAssetRequest {
    assetName: string
    assetUrl?: string
    assetType: FileExtension
}

export interface UpdateAssetRequest {
    status?: AssetStatus
    assetName?: string
    assetUrl?: string
    assetType?: FileExtension
}