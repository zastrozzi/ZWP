import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { TinkProviderConsentAPIService } from '../abstract/provider-consent.api.service'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkProviderConsentMockAPIService', options: { skipMethodDebugger: true } })
export class TinkProviderConsentMockAPIService implements TinkProviderConsentAPIService {
    getProviderConsent(
        _providerConsentId: string
    ): Observable<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listProviderConsents(
        _tinkUserId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>>>,
        _filters: Nullable<Partial<Model.Filters.ProviderConsentFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteProviderConsent(_providerConsentId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshProviderConsent(_providerConsentId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshProviderConsents(_tinkUserId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    extendProviderConsent(
        _providerConsentId: string
    ): Observable<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse> {
        return throwError(() => new Error('Method not implemented'))
    }
}
