import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { TinkTransactionAPIService } from '../abstract/transaction.api.service'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse, DateQueryFilter } from '@zwp/platform.common'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkTransactionMockAPIService', options: { skipMethodDebugger: true } })
export class TinkTransactionMockAPIService implements TinkTransactionAPIService {
    getTransaction(_transactionId: string): Observable<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listTransactions(
        _accountId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>>>,
        _filters: Nullable<Partial<Model.Filters.TransactionFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteTransaction(_transactionId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshTransactions(
        _accountId: string,
        _bookedDate: Nullable<DateQueryFilter>,
        _limit: Nullable<number>
    ): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}
