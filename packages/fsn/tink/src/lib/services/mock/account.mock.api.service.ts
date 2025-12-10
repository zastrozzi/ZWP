import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { TinkAccountAPIService } from '../abstract/account.api.service'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkAccountMockAPIService', options: { skipMethodDebugger: true } })
export class TinkAccountMockAPIService implements TinkAccountAPIService {
    getAccount(_accountId: string): Observable<Model.ServerAPIModel.Account.TinkV2AccountResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listAccounts(
        _tinkUserId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Account.TinkV2AccountResponse>>>,
        _filters: Nullable<Partial<Model.Filters.AccountFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Account.TinkV2AccountResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteAccount(_accountId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshAccounts(_tinkUserId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshAccount(_accountId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshAccountBalance(_accountId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
