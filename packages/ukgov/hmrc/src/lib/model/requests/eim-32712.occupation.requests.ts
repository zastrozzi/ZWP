import { EIM32712Industry } from '../enums'

export interface CreateEIM32712OccupationRequest {
    industry: EIM32712Industry
    name: string
    deduction: number
}

export interface UpdateEIM32712OccupationRequest {
    industry?: EIM32712Industry
    name?: string
    deduction?: number
}