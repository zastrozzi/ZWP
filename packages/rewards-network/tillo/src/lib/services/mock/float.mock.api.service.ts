import { Injectable } from '@angular/core'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { TilloFloatAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TilloFloatMockAPIService', options: { skipMethodDebugger: true } })
export class TilloFloatMockAPIService implements TilloFloatAPIService {
    getFloat(_floatId: string): Observable<Model.FloatResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    refreshFloats(): Observable<Model.FloatResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    listFloats(
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.FloatResponse>>>,
        _filters: Nullable<Partial<Model.Filters.FloatFilters>>
    ): Observable<PaginatedResponse<Model.FloatResponse>> {
        return throwError(() => new Error('Method not implemented.'))
    }

    deleteFloat(_floatId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented.'))
    }

    assignFloatToBrand(_floatId: Nullable<string>, _brandId: Nullable<string>): Observable<Model.FloatResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }
}
