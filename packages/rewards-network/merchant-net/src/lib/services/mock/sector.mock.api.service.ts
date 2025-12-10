import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { SectorAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'SectorMockAPIService', options: { skipMethodDebugger: true } })
export class SectorMockAPIService implements SectorAPIService {
    createSector(_sectorId: Nullable<string>, _request: Model.CreateSectorRequest): Observable<Model.SectorResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getSector(_sectorId: string): Observable<Model.SectorResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listSectors(
        _parent: {
            sectorId: Nullable<string>,
            brandId: Nullable<string>
        },
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.SectorResponse>>>,
        _filters: Nullable<Partial<Model.Filters.SectorFilters>>
    ): Observable<PaginatedResponse<Model.SectorResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    listSubsectors(
        _sectorId: string,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.SectorResponse>>>,
        _filters: Nullable<Partial<Model.Filters.SectorFilters>>
    ): Observable<PaginatedResponse<Model.SectorResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateSector(_sectorId: string, _request: Model.UpdateSectorRequest): Observable<Model.SectorResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteSector(_sectorId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}