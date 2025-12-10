import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { TinkCredentialAPIService } from '../abstract/credential.api.service'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkCredentialMockAPIService', options: { skipMethodDebugger: true } })
export class TinkCredentialMockAPIService implements TinkCredentialAPIService {
    getCredential(_credentialId: string): Observable<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listCredentials(
        _tinkUserId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>>>,
        _filters: Nullable<Partial<Model.Filters.CredentialFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteCredential(_credentialId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshCredentials(_tinkUserId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshCredential(_credentialId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    forceRefreshCredential(_credentialId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
