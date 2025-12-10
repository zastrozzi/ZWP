import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class TinkAccountConsentAPIService {
    abstract getAccountConsent(
        accountConsentId: string
    ): Observable<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>

    abstract listAccountConsents(
        tinkUserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>>>,
        filters: Nullable<Partial<Model.Filters.AccountConsentFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>>

    abstract deleteAccountConsent(accountConsentId: string): Observable<void>
}

export const TINK_ACCOUNT_CONSENT_API_SERVICE = new InjectionToken<TinkAccountConsentAPIService>(
    'fsn.tink.account-consent.api.service'
)
