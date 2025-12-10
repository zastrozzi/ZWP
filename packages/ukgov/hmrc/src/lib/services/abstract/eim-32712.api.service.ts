import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class EIM32712APIService {
    abstract createEIM32712Occupation(request: Model.CreateEIM32712OccupationRequest): Observable<Model.EIM32712OccupationResponse>
    abstract getEIM32712Occupation(occupationId: string): Observable<Model.EIM32712OccupationResponse>
    abstract listEIM32712Occupations(pagination: Nullable<Partial<PaginatedQueryParams<Model.EIM32712OccupationResponse>>>): Observable<PaginatedResponse<Model.EIM32712OccupationResponse>>
    abstract updateEIM32712Occupation(occupationId: string, request: Model.UpdateEIM32712OccupationRequest): Observable<Model.EIM32712OccupationResponse>
    abstract deleteEIM32712Occupation(occupationId: string): Observable<void>
}

export const EIM32712_API_SERVICE = new InjectionToken<EIM32712APIService>('hmrc.eim32712.api.service')