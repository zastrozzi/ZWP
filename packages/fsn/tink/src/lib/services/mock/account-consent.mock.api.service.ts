import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { TinkAccountConsentAPIService } from '../abstract/account-consent.api.service'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkAccountConsentMockAPIService', options: { skipMethodDebugger: true } })
export class TinkAccountConsentMockAPIService implements TinkAccountConsentAPIService {
    getAccountConsent(
        _accountConsentId: string
    ): Observable<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listAccountConsents(
        _tinkUserId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>>>,
        _filters: Nullable<Partial<Model.Filters.AccountConsentFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteAccountConsent(_accountConsentId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
