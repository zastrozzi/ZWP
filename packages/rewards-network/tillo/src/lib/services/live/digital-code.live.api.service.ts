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
import { TilloDigitalCodeAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { TILLO_API_BASE_URL, TILLO_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TilloDigitalCodeLiveAPIService', options: { skipMethodDebugger: true } })
export class TilloDigitalCodeLiveAPIService extends PlatformAuth.AuthedAPIService implements TilloDigitalCodeAPIService {
    private config = inject(TILLO_API_CONFIG)
    private baseUrl = inject(TILLO_API_BASE_URL)
    private digitalCodeFacade = inject(Facades.TilloDigitalCodeFacade)
    private digitalCodeBrandFacade = inject(Facades.TilloDigitalCodeBrandFacade)

    getDigitalCode(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.digitalCodeRoutes(this.baseUrl).getDigitalCodes(digitalCodeId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    listDigitalCodes(
        storeCardId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.DigitalGiftCodeResponse>>>,
        filters: Nullable<Partial<Model.Filters.DigitalCodeFilters>>
    ): Observable<PaginatedResponse<Model.DigitalGiftCodeResponse>> {
        let path: string
        if (storeCardId) {
            path = APIRoutes.storeCardRoutes(this.baseUrl).digitalCodeRoutesForStoreCard(storeCardId).listDigitalCodesForStoreCard()
        } else {
            path = APIRoutes.digitalCodeRoutes(this.baseUrl).listDigitalCodes()
        }
        let params = serialisePaginatedQueryParams(pagination, this.digitalCodeFacade.digitalCodeRemotePagination$)
        if (filters) {
            if (filters.dbCreatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
            }
            if (filters.dbUpdatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
            }
            if (filters.dbDeletedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt))
            }
        }

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

    deleteDigitalCode(digitalCodeId: string): Observable<void> {
        const path = APIRoutes.digitalCodeRoutes(this.baseUrl).deleteDigitalCode(digitalCodeId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.DELETE,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    checkDigitalCodeStatus(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.digitalCodeRoutes(this.baseUrl).checkDigitalCodeStatus(digitalCodeId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    checkDigitalCodeBalance(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.digitalCodeRoutes(this.baseUrl).checkDigitalCodeBalance(digitalCodeId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    cancelDigitalCode(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.digitalCodeRoutes(this.baseUrl).cancelDigitalCode(digitalCodeId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    cancelDigitalCodeURL(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.digitalCodeRoutes(this.baseUrl).cancelDigitalCodeUrl(digitalCodeId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    topupDigitalCode(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.digitalCodeRoutes(this.baseUrl).topupDigitalCode(digitalCodeId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.PUT,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    checkStatusForReference(referenceId: string): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.digitalCodeRoutes(this.baseUrl).digitalCodeRoutesForReference().checkStatusFromReference(referenceId)
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.GET,
            path,
            null,
            this.auth.addDeviceIdHeader()
        )
    }

    orderDigitalCode(
        brandId: string,
        request: Model.OrderCodeRequest
    ): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl).digitalCodeRoutesforBrand(brandId).orderDigitalCode()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    issueDigitalCode(
        brandId: string,
        request: Model.IssueCodeRequest
    ): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl).digitalCodeRoutesforBrand(brandId).issueDigitalCode()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    issueDigitalCodeWithPersonlisation(
        brandId: string,
        request: Model.IssueCodeWithPersonalisationRequest
    ): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl)
            .digitalCodeRoutesforBrand(brandId)
            .issueDigitalCodeWithPersonlisation()
        return this.http.authedRequest(
            this.getAccessToken(),
            this.auth.authHeader,
            HTTPMethod.POST,
            path,
            request,
            this.auth.addDeviceIdHeader()
        )
    }

    issueDigitalCodeTilloFulfilment(
        brandId: string,
        request: Model.IssueCodeTilloFulfilmentRequest
    ): Observable<Model.DigitalGiftCodeResponse> {
        const path = APIRoutes.brandRoutes(this.baseUrl)
            .digitalCodeRoutesforBrand(brandId)
            .issueDigitalCodeTilloFulfilment()
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
