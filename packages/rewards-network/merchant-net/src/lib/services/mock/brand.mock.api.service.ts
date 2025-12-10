import { Injectable } from '@angular/core'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { BrandAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'BrandMockAPIService', options: { skipMethodDebugger: true } })
export class BrandMockAPIService implements BrandAPIService {
    createBrand(_merchantId: string, _request: Model.CreateBrandRequest): Observable<Model.BrandResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getBrand(_brandId: string): Observable<Model.BrandResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listBrands(
        _merchantId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>>,
        _filters: Nullable<Partial<Model.Filters.BrandFilters>>
    ): Observable<PaginatedResponse<Model.BrandResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateBrand(_brandId: string, _request: Model.UpdateBrandRequest): Observable<Model.BrandResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteBrand(_brandId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
