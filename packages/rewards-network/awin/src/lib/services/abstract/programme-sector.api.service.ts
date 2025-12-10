import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class ProgrammeSectorAPIService {
    abstract getProgrammeSector(programmeSectorID:string): Observable<Model.ProgrammeSectorResponse>
    abstract listProgrammeSectors(
        programmeSectorID:Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ProgrammeSectorResponse>>>
    ): Observable<PaginatedResponse<Model.ProgrammeSectorResponse>>
    abstract deleteProgrammeSector(programmeSectorID:string): Observable<void>
}

export const ACCOUNT_API_SERVICE = new InjectionToken<ProgrammeSectorAPIService>(
    'rewards-network.affiliate-window.programme-sector.api.service'
)