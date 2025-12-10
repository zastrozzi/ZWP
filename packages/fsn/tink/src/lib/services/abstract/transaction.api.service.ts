import { Injectable, InjectionToken } from '@angular/core'
import { Observable } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse, DateQueryFilter } from '@zwp/platform.common'
import { Model } from '../../model'

@Injectable({ providedIn: 'root' })
export abstract class TinkTransactionAPIService {
    abstract getTransaction(
        transactionId: string
    ): Observable<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>

    abstract listTransactions(
        accountId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>>>,
        filters: Nullable<Partial<Model.Filters.TransactionFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>>

    abstract deleteTransaction(transactionId: string): Observable<void>

    abstract refreshTransactions(
        accountId: string,
        bookedDate: Nullable<DateQueryFilter>,
        limit: Nullable<number>
    ): Observable<void>
}

export const TINK_TRANSACTION_API_SERVICE = new InjectionToken<TinkTransactionAPIService>(
    'fsn.tink.transaction.api.service'
)
