import { Injectable, InjectionToken } from '@angular/core'
import { Observable } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Model } from '../../model'

@Injectable({ providedIn: 'root' })
export abstract class TinkAccountAPIService {
    abstract getAccount(accountId: string): Observable<Model.ServerAPIModel.Account.TinkV2AccountResponse>

    abstract listAccounts(
        tinkUserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Account.TinkV2AccountResponse>>>,
        filters: Nullable<Partial<Model.Filters.AccountFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Account.TinkV2AccountResponse>>

    abstract deleteAccount(accountId: string): Observable<void>

    abstract refreshAccounts(tinkUserId: string): Observable<void>

    abstract refreshAccount(accountId: string): Observable<void>

    abstract refreshAccountBalance(accountId: string): Observable<void>
}

export const TINK_ACCOUNT_API_SERVICE = new InjectionToken<TinkAccountAPIService>('fsn.tink.account.api.service')
