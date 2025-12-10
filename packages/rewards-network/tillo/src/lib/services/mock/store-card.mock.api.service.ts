import { Injectable } from '@angular/core'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { TilloStoreCardAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TilloStoreCardMockAPIService', options: { skipMethodDebugger: true } })
export class TilloStoreCardMockAPIService implements TilloStoreCardAPIService {
    listStoreCards(
        _parent: { 
            brandId: Nullable<string>,
            enduserId: Nullable<string> 
        },
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.StoreCardResponse>>>,
        _filters: Nullable<Partial<Model.Filters.StoreCardFilters>>
    ): Observable<PaginatedResponse<Model.StoreCardResponse>> {
        throw new Error('Method not implemented.')
    }

    getStoreCard(_storeCardId: string): Observable<Model.StoreCardResponse> {
        throw new Error('Method not implemented.')
    }

    updateStoreCard(_storeCardId: string, _request: Model.UpdateStoreCardRequest): Observable<Model.StoreCardResponse> {
        throw new Error('Method not implemented.')
    }

    deleteStoreCard(_storeCardId: string): Observable<Model.StoreCardResponse> {
        throw new Error('Method not implemented.')
    }
    createStoreCardForEnduser(
        _enduserId: string,
        _request: Model.CreateStoreCardRequest
    ): Observable<Model.StoreCardResponse> {
        throw new Error('Method not implemented.')
    }
}
