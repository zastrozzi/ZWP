import { Injectable } from '@angular/core'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { TilloTransactionSpreadAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'TilloTransactionSpreadMockAPIService',
    options: { skipMethodDebugger: true },
})
export class TilloTransactionSpreadMockAPIService implements TilloTransactionSpreadAPIService {
    getTransactionSpread(_transactionSpreadId: string): Observable<Model.TransactionSpreadResponse> {
        throw new Error('Method not implemented.')
    }

    updateTransactionSpread(
        _transactionSpreadId: string,
        _request: Model.UpdateTransactionSpreadRequest
    ): Observable<Model.TransactionSpreadResponse> {
        throw new Error('Method not implemented.')
    }

    deleteTransactionSpread(_transactionSpreadId: string): Observable<Model.TransactionSpreadResponse> {
        throw new Error('Method not implemented.')
    }

    listTransactionSpreads(
        _brandId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.TransactionSpreadResponse>>>,
        _filters: Nullable<Partial<Model.Filters.TransactionSpreadFilters>>
    ): Observable<PaginatedResponse<Model.TransactionSpreadResponse>> {
        throw new Error('Method not implemented.')
    }

    createTransactionSpreadForBrand(
        _brandId: string,
        _parentrequest: Model.CreateTransactionSpreadRequest
    ): Observable<Model.TransactionSpreadResponse> {
        throw new Error('Method not implemented.')
    }

    setActiveTransactionSpreadForBrand(
        _brandId: string,
        _transactionSpreadId: string
    ): Observable<Model.TransactionSpreadResponse> {
        throw new Error('Method not implemented.')
    }
}
