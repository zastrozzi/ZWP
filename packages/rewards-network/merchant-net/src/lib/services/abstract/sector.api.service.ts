import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class SectorAPIService {
    abstract createSector(
        sectorId: Nullable<string>,
        request: Model.CreateSectorRequest
    ): Observable<Model.SectorResponse>

    abstract getSector(sectorId: string): Observable<Model.SectorResponse>

    abstract listSectors(
        parent: {
            sectorId: Nullable<string>,
            brandId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SectorResponse>>>,
        filters: Nullable<Partial<Model.Filters.SectorFilters>>
    ): Observable<PaginatedResponse<Model.SectorResponse>>

    abstract listSubsectors(
        sectorId: string,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SectorResponse>>>,
        filters: Nullable<Partial<Model.Filters.SectorFilters>>
    ): Observable<PaginatedResponse<Model.SectorResponse>>

    abstract updateSector(
        sectorId: string,
        request: Model.UpdateSectorRequest
    ): Observable<Model.SectorResponse>

    abstract deleteSector(sectorId: string): Observable<void>
}

export const SECTOR_API_SERVICE = new InjectionToken<SectorAPIService>(
    'rewards-network.merchant-net.sector.api.service'
)
