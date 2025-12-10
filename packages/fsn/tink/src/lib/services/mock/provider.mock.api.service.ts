import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { TinkProviderAPIService } from '../abstract/provider.api.service'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse, ZWPISO3166Alpha2 } from '@zwp/platform.common'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkProviderMockAPIService', options: { skipMethodDebugger: true } })
export class TinkProviderMockAPIService implements TinkProviderAPIService {
    getProvider(_providerId: string): Observable<Model.ServerAPIModel.Provider.TinkV1ProviderResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listProviders(
        _tinkUserId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>>>,
        _filters: Nullable<Partial<Model.Filters.ProviderFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteProvider(_providerId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshProviders(_market: Nullable<ZWPISO3166Alpha2>): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
