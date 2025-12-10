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
import { TilloFloatAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { TILLO_API_BASE_URL, TILLO_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TilloFloatLiveAPIService', options: { skipMethodDebugger: true } })
export class TilloFloatLiveAPIService extends PlatformAuth.AuthedAPIService implements TilloFloatAPIService {
    private config = inject(TILLO_API_CONFIG)
    private baseUrl = inject(TILLO_API_BASE_URL)
    private floatFacade = inject(Facades.TilloFloatFacade)

    getFloat(floatId: string): Observable<Model.FloatResponse> {
        const path = APIRoutes.floatRoutes(this.baseUrl).getFloat(floatId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    refreshFloats(): Observable<Model.FloatResponse> {
        const path = APIRoutes.floatRoutes(this.baseUrl).refreshFloats()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listFloats(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.FloatResponse>>>
    ): Observable<PaginatedResponse<Model.FloatResponse>> {
        const path = APIRoutes.floatRoutes(this.baseUrl).listFloats()
        let params = serialisePaginatedQueryParams(pagination, this.floatFacade.floatRemotePagination$)

        this.floatFacade.floatFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) {
                    params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
                }
                if (filters.dbUpdatedAt) {
                    params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
                }
                if (filters.dbDeletedAt) {
                    params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt))
                }
            })
        )
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteFloat(floatId: string): Observable<void> {
        const path = APIRoutes.floatRoutes(this.baseUrl).deleteFloat(floatId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    assignFloatToBrand(floatId: string, brandId: string): Observable<Model.FloatResponse> {
        const path = APIRoutes.floatRoutes(this.baseUrl).assignFloatToBrand(floatId).assignFloatToBrand(brandId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }
}
