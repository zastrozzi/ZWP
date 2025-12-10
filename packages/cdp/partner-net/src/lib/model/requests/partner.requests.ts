import { PartnerStatus } from '../enums'

export interface CreatePartnerRequest {
    name: string
    metadata?: { [key: string]: string }
    logoUrl?: string
    status: PartnerStatus
}

export interface UpdatePartnerRequest {
    name?: string
    metadata?: { [key: string]: string }
    logoUrl?: string
    status?: PartnerStatus
}