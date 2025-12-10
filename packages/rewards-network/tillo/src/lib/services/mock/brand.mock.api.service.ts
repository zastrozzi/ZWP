import { Injectable } from '@angular/core'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { TilloBrandAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TilloBrandMockAPIService', options: { skipMethodDebugger: true } })
export class TilloBrandMockAPIService implements TilloBrandAPIService {
    listBrands(
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>>,
        _filters: Nullable<Partial<Model.Filters.BrandFilters>>
    ): Observable<PaginatedResponse<Model.BrandResponse>> {
        return throwError(() => new Error('Method not implemented.'))
    }
    getBrand(_brandId: string): Observable<Model.BrandResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }
    refreshBrands(): Observable<Model.BrandResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }
    deleteBrand(_brandId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented.'))
    }
    restoreBrand(_brandId: string): Observable<Model.BrandResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }
    
}
