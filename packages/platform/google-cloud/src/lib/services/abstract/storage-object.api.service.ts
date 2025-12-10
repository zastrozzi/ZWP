import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'
import { HttpEvent } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export abstract class StorageObjectAPIService {
    abstract uploadObject(
        bucketId: string,
        request: Model.Requests.UploadStorageObjectRequest
    ): Observable<HttpEvent<Model.Responses.StorageObjectResponse>>

    abstract getObject(
        objectId: string
    ): Observable<Model.Responses.StorageObjectResponse>

    abstract listObjects(
        bucketId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageObjectResponse>>>,
        filters: Nullable<Partial<Model.Filters.StorageObjectFilters>>
    ): Observable<PaginatedResponse<Model.Responses.StorageObjectResponse>>

    abstract updateObject(
        objectId: string,
        request: Model.Requests.UpdateStorageObjectRequest
    ): Observable<Model.Responses.StorageObjectResponse>

    abstract refreshObjects(
        bucketId: string,
        limit: Nullable<number>
    ): Observable<PaginatedResponse<Model.Responses.StorageObjectResponse>>

    abstract deleteObject(objectId: string): Observable<void>

    abstract deleteManyObjects(
        request: Model.Requests.DeleteManyStorageObjectsRequest
    ): Observable<void>
}

export const STORAGE_OBJECT_API_SERVICE = new InjectionToken<StorageObjectAPIService>(
    'platform.google-cloud.storage-object.api.service'
)