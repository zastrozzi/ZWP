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
    abstract getSector(SectorID:string): Observable<Model.SectorResponse>
    abstract listSectors(
        parentType: Nullable<string>,
        parentID:Nullable<string>,
    ): Observable<PaginatedResponse<Model.SectorResponse>>
    abstract createSector(): Observable<Model.SectorResponse>
    abstract deleteSector(parentID:Nullable<string>, parentType:Nullable<string>, programmeID:string): Observable<void>
}

export const SECTOR_API_SERVICE = new InjectionToken<SectorAPIService>(
    'rewards-network.affiliate-window.sector.api.service'
)