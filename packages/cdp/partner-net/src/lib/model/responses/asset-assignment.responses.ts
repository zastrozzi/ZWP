import { AssetStatus } from '../enums'

export interface SubgroupAssetAssignmentResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    role: string
    status: AssetStatus
    subgroupId: string
    assetId: string
}

export interface PartnerAssetAssignmentResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    role: string
    status: AssetStatus
    partnerId: string
    assetId: string
}
