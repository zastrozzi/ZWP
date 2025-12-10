import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class AccountAPIService {
    abstract refreshAccounts(
        parentType: Nullable<string>,
        accountID:string
    ):Observable<void>
    abstract getAccount(accountID:string): Observable<Model.AccountResponse>
    abstract listAccounts(
        parentType:Nullable<string>,
        parentID: Nullable<string>,
    ): Observable<PaginatedResponse<Model.AccountResponse>>
    abstract deleteAccount(accountID:string): Observable<void>
}

export const ACCOUNT_API_SERVICE = new InjectionToken<AccountAPIService>(
    'rewards-network.affiliate-window.account.api.service'
)