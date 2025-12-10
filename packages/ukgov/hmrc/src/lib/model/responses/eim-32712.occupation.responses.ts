import { EIM32712Industry } from '../enums'

export interface EIM32712OccupationResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date
    industry: EIM32712Industry
    name: string
    deduction: number
}