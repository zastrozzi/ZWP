import { Injectable, InjectionToken } from '@angular/core'
import { Observable } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Model } from '../../model'

@Injectable({ providedIn: 'root' })
export abstract class TinkProviderConsentAPIService {
    abstract getProviderConsent(
        providerConsentId: string
    ): Observable<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>

    abstract listProviderConsents(
        tinkUserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>>>,
        filters: Nullable<Partial<Model.Filters.ProviderConsentFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>>

    abstract deleteProviderConsent(providerConsentId: string): Observable<void>

    abstract refreshProviderConsent(providerConsentId: string): Observable<void>

    abstract refreshProviderConsents(tinkUserId: string): Observable<void>

    abstract extendProviderConsent(
        providerConsentId: string
    ): Observable<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>
}

export const TINK_PROVIDER_CONSENT_API_SERVICE = new InjectionToken<TinkProviderConsentAPIService>(
    'fsn.tink.provider-consent.api.service'
)
