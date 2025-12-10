import { PartnerStatus } from '../enums'

export interface CreatePartnerSubgroupRequest {
    name: string
    status: PartnerStatus
}

export interface UpdatePartnerSubgroupRequest {
    name?: string
    status?: PartnerStatus
}
