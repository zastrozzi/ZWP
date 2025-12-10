import { Injectable, InjectionToken } from '@angular/core'
import { Observable } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse, ZWPISO3166Alpha2 } from '@zwp/platform.common'
import { Model } from '../../model'

@Injectable({ providedIn: 'root' })
export abstract class TinkProviderAPIService {
    abstract getProvider(providerId: string): Observable<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>

    abstract listProviders(
        tinkUserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>>>,
        filters: Nullable<Partial<Model.Filters.ProviderFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>>

    abstract deleteProvider(providerId: string): Observable<void>

    abstract refreshProviders(market: Nullable<ZWPISO3166Alpha2>): Observable<void>
}

export const TINK_PROVIDER_API_SERVICE = new InjectionToken<TinkProviderAPIService>('fsn.tink.provider.api.service')
