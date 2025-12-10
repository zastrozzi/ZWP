import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createHTTPParams,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialiseNumberQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take, throwError } from 'rxjs'
import { TilloStoreCardAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { TILLO_API_BASE_URL, TILLO_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TilloStoreCardLiveAPIService', options: { skipMethodDebugger: true } })
export class TilloStoreCardLiveAPIService extends PlatformAuth.AuthedAPIService implements TilloStoreCardAPIService {

    private baseUrl = inject(TILLO_API_BASE_URL)
    private storeCardFacade = inject(Facades.TilloStoreCardFacade)

    listStoreCards(
        parent: {
            brandId: Nullable<string>
            enduserId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.StoreCardResponse>>>,
        filters: Nullable<Partial<Model.Filters.StoreCardFilters>>
    ): Observable<PaginatedResponse<Model.StoreCardResponse>> {

        let path: string
        if ( parent.brandId ) {
            path = APIRoutes.brandRoutes(this.baseUrl).storeCardRoutesForBrand(parent.brandId).listStoreCardsForBrand()
        } else if ( parent.enduserId ) {
            path = APIRoutes.endUserRoutesForStoreCard(this.baseUrl).routesForEnduser(parent.enduserId).listStoreCardsForEnduser()
        } else {
            path = APIRoutes.storeCardRoutes(this.baseUrl).listStoreCards()
        }

        let params = serialisePaginatedQueryParams(pagination, this.storeCardFacade.storeCardRemotePagination$)

        if (filters) {
            if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
            if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
            if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
            if (filters.status) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('status', filters.status)) }
        }
        
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

    getStoreCard(storeCardId: string): Observable<Model.StoreCardResponse> {
        const path = APIRoutes.storeCardRoutes(this.baseUrl).getStoreCard(storeCardId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )    
    }

    updateStoreCard(storeCardId: string, request: Model.UpdateStoreCardRequest): Observable<Model.StoreCardResponse> {
        const path = APIRoutes.storeCardRoutes(this.baseUrl).updateStoreCard(storeCardId)
        
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )    
    }

    deleteStoreCard(storeCardId: string): Observable<Model.StoreCardResponse> {
        const path = APIRoutes.storeCardRoutes(this.baseUrl).deleteStoreCard(storeCardId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )    
    }

    createStoreCardForEnduser(enduserId: string, request: Model.CreateStoreCardRequest ): Observable<Model.StoreCardResponse> {
        const path = APIRoutes.endUserRoutesForStoreCard(this.baseUrl).routesForEnduser(enduserId).createStoreCardForEnduser()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }    



}

