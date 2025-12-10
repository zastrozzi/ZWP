import { Injectable, InjectionToken, inject } from '@angular/core'
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
import { EIM32712APIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { UKGOV_HMRC_API_BASE_URL, UKGOV_HMRC_API_CONFIG } from '../../config'
import { EIM32712OccupationFacade } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'EIM32712LiveAPIService',
    options: { skipMethodDebugger: true },
})
export class EIM32712LiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements EIM32712APIService
{
    private config = inject(UKGOV_HMRC_API_CONFIG)
    private baseUrl = inject(UKGOV_HMRC_API_BASE_URL)
    private occupationFacade = inject(EIM32712OccupationFacade)

    createEIM32712Occupation(
        request: Model.CreateEIM32712OccupationRequest
    ): Observable<Model.EIM32712OccupationResponse> {
        const path = APIRoutes.eim32712Routes(this.baseUrl).occupationRoutes.createOccupation
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    getEIM32712Occupation(
        occupationId: string
    ): Observable<Model.EIM32712OccupationResponse> {
        const path = APIRoutes.eim32712Routes(this.baseUrl)
            .occupationRoutes.getOccupation(occupationId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listEIM32712Occupations(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EIM32712OccupationResponse>>>
    ): Observable<PaginatedResponse<Model.EIM32712OccupationResponse>> {
        const path = APIRoutes.eim32712Routes(this.baseUrl)
            .occupationRoutes.listOccupations
        let params = serialisePaginatedQueryParams(
            pagination,
            this.occupationFacade.occupationRemotePagination$
        )
        this.occupationFacade.occupationFilters$.pipe(
            take(1),
            map((filters) => {
                if (filters.dbCreatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt)) }
                if (filters.dbUpdatedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt)) }
                if (filters.dbDeletedAt) { params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt)) }
                if (filters.industry) { params = upsertHTTPParams(params, serialiseEnumQueryFilter('industry', filters.industry)) }
                if (filters.deduction) { params = upsertHTTPParams(params, serialiseNumberQueryFilter('deduction', filters.deduction, 100)) }
                if (filters.name) { params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name)) }
            })
        ).subscribe().unsubscribe()

        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader(),
            params
        )
    }

    updateEIM32712Occupation(
        occupationId: string,
        request: Model.UpdateEIM32712OccupationRequest
    ): Observable<Model.EIM32712OccupationResponse> {
        const path = APIRoutes.eim32712Routes(this.baseUrl)
            .occupationRoutes.updateOccupation(occupationId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    deleteEIM32712Occupation(occupationId: string): Observable<void> {
        const path = APIRoutes.eim32712Routes(this.baseUrl)
            .occupationRoutes.deleteOccupation(occupationId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }
}
