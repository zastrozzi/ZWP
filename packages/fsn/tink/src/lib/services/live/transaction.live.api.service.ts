import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { Model } from '../../model'
import {
    DateQueryFilter,
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialisePaginatedQueryParams,
} from '@zwp/platform.common'
import { TinkTransactionAPIService } from '../abstract/transaction.api.service'
import { APIRoutes } from '../../api-routes'
import { TINK_API_CONFIG, TINK_API_BASE_URL } from '../../config'
import { PlatformAuth } from '@zwp/platform.auth'
import { State } from '../../+state'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkTransactionLiveAPIService', options: { skipMethodDebugger: true } })
export class TinkTransactionLiveAPIService extends PlatformAuth.AuthedAPIService implements TinkTransactionAPIService {
    private config = inject(TINK_API_CONFIG)
    private baseUrl = inject(TINK_API_BASE_URL)
    private transactionFacade = inject(State.Facades.TinkTransactionFacade)

    getTransaction(transactionId: string): Observable<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse> {
        const path = APIRoutes.transactionRoutes(this.baseUrl).getTransaction(transactionId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listTransactions(
        accountId: Nullable<string> = null, 
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>>> = null,
        filters: Nullable<Partial<Model.Filters.TransactionFilters>> = null
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>> {
        let path
        if (isNull(accountId)) {
            path = APIRoutes.transactionRoutes(this.baseUrl).listTransactions()
        } else {
            path = APIRoutes.accountRoutes(this.baseUrl).transactionRoutesForAccount(accountId).listTransactions()
        }
        const params = serialisePaginatedQueryParams(
            pagination,
            this.transactionFacade.transactionRemotePagination$
        )
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    deleteTransaction(transactionId: string): Observable<void> {
        const path = APIRoutes.transactionRoutes(this.baseUrl).deleteTransaction(transactionId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshTransactions(
        accountId: string, 
        bookedDate: Nullable<DateQueryFilter> = null, 
        limit: Nullable<number> = null
    ): Observable<void> {
        const path = APIRoutes.accountRoutes(this.baseUrl).transactionRoutesForAccount(accountId).refreshTransactions()
        
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }
}