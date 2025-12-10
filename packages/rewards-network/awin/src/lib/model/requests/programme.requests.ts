import { SectorStatus } from "../enums"

export interface CreateSectorRequest {
    name: string,
    status: SectorStatus,
    displayImageUrl?: string
}

export interface UpdateSectorRequest {
    name: string
    displayImageUrl?: string
}