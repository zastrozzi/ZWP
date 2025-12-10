import { AssetStatus } from '../enums'

export interface CreateAssetAssignmentRequest {
    role: string
    status: AssetStatus
}

export interface UpdateAssetAssignmentRequest {
    role?: string
    status?: AssetStatus
}
