import { Injectable, InjectionToken } from '@angular/core'
import { Observable } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Model } from '../../model'

@Injectable({ providedIn: 'root' })
export abstract class TinkCredentialAPIService {
    abstract getCredential(credentialId: string): Observable<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>

    abstract listCredentials(
        tinkUserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>>>,
        filters: Nullable<Partial<Model.Filters.CredentialFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Credentials.TinkV1CredentialsResponse>>

    abstract deleteCredential(credentialId: string): Observable<void>

    abstract refreshCredentials(tinkUserId: string): Observable<void>

    abstract refreshCredential(credentialId: string): Observable<void>

    abstract forceRefreshCredential(credentialId: string): Observable<void>
}

export const TINK_CREDENTIAL_API_SERVICE = new InjectionToken<TinkCredentialAPIService>(
    'fsn.tink.credential.api.service'
)
