import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    createHTTPParams,
    HTTPMethod,
    isNull,
    isUndefined,
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
import { StorageObjectAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { GOOGLE_CLOUD_API_BASE_URL, GOOGLE_CLOUD_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'
import { HttpEvent } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'StorageObjectLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class StorageObjectLiveAPIService extends PlatformAuth.AuthedAPIService implements StorageObjectAPIService {
    private config = inject(GOOGLE_CLOUD_API_CONFIG)
    private baseUrl = inject(GOOGLE_CLOUD_API_BASE_URL)
    private storageObjectFacade = inject(Facades.GoogleCloudStorageObjectFacade)

    uploadObject(
        bucketId: string,
        request: Model.Requests.UploadStorageObjectRequest
    ): Observable<HttpEvent<Model.Responses.StorageObjectResponse>> {
        const path = APIRoutes.storageBucketRoutes(this.baseUrl)
            .storageObjectRoutesForStorageBucket(bucketId)
            .uploadStorageObject()
        const formData = new FormData()
        formData.append('name', request.name)
        if (!isUndefined(request.predefinedAcl)) {
            formData.append('predefinedAcl', request.predefinedAcl)
        }
        formData.append('file', request.file)
        const additionalHeaders = this.auth.addDeviceIdHeader()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: formData,
            additionalHeaders: additionalHeaders,
            reportProgress: true,
            observeEvents: true
        })
    }

    getObject(objectId: string): Observable<Model.Responses.StorageObjectResponse> {
        const path = APIRoutes.storageObjectRoutes(this.baseUrl).getStorageObject(objectId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listObjects(
        bucketId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageObjectResponse>>>,
        filters: Nullable<Partial<Model.Filters.StorageObjectFilters>>
    ): Observable<PaginatedResponse<Model.Responses.StorageObjectResponse>> {
        let path: string
        if (isNull(bucketId)) {
            path = APIRoutes.storageObjectRoutes(this.baseUrl).listStorageObjects()
        } else {
            path = APIRoutes.storageBucketRoutes(this.baseUrl)
                .storageObjectRoutesForStorageBucket(bucketId)
                .listStorageObjects()
        }
        let params = serialisePaginatedQueryParams(pagination, this.storageObjectFacade.storageObjectRemotePagination$)

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

    updateObject(
        objectId: string,
        request: Model.Requests.UpdateStorageObjectRequest
    ): Observable<Model.Responses.StorageObjectResponse> {
        const path = APIRoutes.storageObjectRoutes(this.baseUrl).updateStorageObject(objectId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    refreshObjects(
        bucketId: string,
        limit: Nullable<number>
    ): Observable<PaginatedResponse<Model.Responses.StorageObjectResponse>> {
        const path = APIRoutes.storageBucketRoutes(this.baseUrl)
            .storageObjectRoutesForStorageBucket(bucketId)
            .refreshStorageObjects()
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

    deleteObject(objectId: string): Observable<void> {
        const path = APIRoutes.storageObjectRoutes(this.baseUrl).deleteStorageObject(objectId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteManyObjects(
        request: Model.Requests.DeleteManyStorageObjectsRequest
    ): Observable<void> {
        const path = APIRoutes.storageObjectRoutes(this.baseUrl).deleteManyStorageObjects()
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }
}