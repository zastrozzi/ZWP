import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { EIM32712APIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'EIM32712MockAPIService', options: { skipMethodDebugger: true } })
export class EIM32712MockAPIService implements EIM32712APIService {
    createEIM32712Occupation(request: Model.CreateEIM32712OccupationRequest): Observable<Model.EIM32712OccupationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getEIM32712Occupation(occupationId: string): Observable<Model.EIM32712OccupationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listEIM32712Occupations(pagination: Nullable<Partial<PaginatedQueryParams<Model.EIM32712OccupationResponse>>>): Observable<PaginatedResponse<Model.EIM32712OccupationResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateEIM32712Occupation(occupationId: string, request: Model.UpdateEIM32712OccupationRequest): Observable<Model.EIM32712OccupationResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteEIM32712Occupation(occupationId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

}