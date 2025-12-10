import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class TilloTransactionSpreadAPIService {
    abstract getTransactionSpread(transactionSpreadId: string): Observable<Model.TransactionSpreadResponse>
    abstract updateTransactionSpread(
        transactionSpreadId: string,
        request: Model.UpdateTransactionSpreadRequest
    ): Observable<Model.TransactionSpreadResponse>
    abstract deleteTransactionSpread(transactionSpreadId: string): Observable<Model.TransactionSpreadResponse>
    abstract listTransactionSpreads(
        brandId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.TransactionSpreadResponse>>>,
        filters: Nullable<Partial<Model.Filters.TransactionSpreadFilters>>
    ): Observable<PaginatedResponse<Model.TransactionSpreadResponse>>
    abstract createTransactionSpreadForBrand(
        brandId: string,
        request: Model.CreateTransactionSpreadRequest
    ): Observable<Model.TransactionSpreadResponse>
    abstract setActiveTransactionSpreadForBrand(
        brandId: string,
        transactionSpreadId: string
    ): Observable<Model.TransactionSpreadResponse>
}

export const TRANSACTION_SPREAD_API_SERVICE = new InjectionToken<TilloTransactionSpreadAPIService>(
    'rewards-network.tillo.transaction-spread.api.service'
)
