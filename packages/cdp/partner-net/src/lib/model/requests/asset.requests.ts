import { FileExtension } from '@zwp/platform.common'
import { AssetStatus } from '../enums'

export interface CreateAssetRequest {
    name: string
    url?: string
    type: FileExtension
    status: AssetStatus
}

export interface UpdateAssetRequest {
    name?: string
    url?: string
    type?: FileExtension
    status?: AssetStatus
}
