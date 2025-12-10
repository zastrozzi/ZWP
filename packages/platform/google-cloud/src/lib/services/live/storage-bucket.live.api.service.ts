import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    createHTTPParams,
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialiseDateQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParam,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'
import { StorageBucketAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { GOOGLE_CLOUD_API_BASE_URL, GOOGLE_CLOUD_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'StorageBucketLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class StorageBucketLiveAPIService extends PlatformAuth.AuthedAPIService implements StorageBucketAPIService {
    private config = inject(GOOGLE_CLOUD_API_CONFIG)
    private baseUrl = inject(GOOGLE_CLOUD_API_BASE_URL)
    private storageBucketFacade = inject(Facades.GoogleCloudStorageBucketFacade)

    createBucket(
        request: Model.Requests.CreateStorageBucketRequest
    ): Observable<Model.Responses.StorageBucketResponse> {
        const path = APIRoutes.storageBucketRoutes(this.baseUrl).createStorageBucket()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getBucket(bucketId: string): Observable<Model.Responses.StorageBucketResponse> {
        const path = APIRoutes.storageBucketRoutes(this.baseUrl).getStorageBucket(bucketId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listBuckets(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageBucketResponse>>>,
        filters: Nullable<Partial<Model.Filters.StorageBucketFilters>>
    ): Observable<PaginatedResponse<Model.Responses.StorageBucketResponse>> {
        const path = APIRoutes.storageBucketRoutes(this.baseUrl).listStorageBuckets()
        let params = serialisePaginatedQueryParams(pagination, this.storageBucketFacade.storageBucketRemotePagination$)

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
            if (filters.name) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name))
            }
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

    updateBucket(
        bucketId: string,
        request: Model.Requests.UpdateStorageBucketRequest
    ): Observable<Model.Responses.StorageBucketResponse> {
        const path = APIRoutes.storageBucketRoutes(this.baseUrl).updateStorageBucket(bucketId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshBuckets(limit: Nullable<number>): Observable<PaginatedResponse<Model.Responses.StorageBucketResponse>> {
        const path = APIRoutes.storageBucketRoutes(this.baseUrl).refreshStorageBuckets()
        let params = createHTTPParams()
        if (!isNull(limit)) {
            params = upsertHTTPParam(params, 'limit', limit)
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

    deleteBucket(bucketId: string): Observable<void> {
        const path = APIRoutes.storageBucketRoutes(this.baseUrl).deleteStorageBucket(bucketId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }
}