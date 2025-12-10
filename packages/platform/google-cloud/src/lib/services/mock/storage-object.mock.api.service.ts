import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { StorageObjectAPIService } from '../abstract'
import { HttpEvent } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'StorageObjectMockAPIService',
    options: { skipMethodDebugger: true },
})
export class StorageObjectMockAPIService implements StorageObjectAPIService {
    uploadObject(
        _bucketId: string,
        _request: Model.Requests.UploadStorageObjectRequest
    ): Observable<HttpEvent<Model.Responses.StorageObjectResponse>> {
        return throwError(() => new Error('Not implemented'))
    }

    getObject(_objectId: string): Observable<Model.Responses.StorageObjectResponse> {
        return throwError(() => new Error('Not implemented'))
    }

    listObjects(
        _bucketId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageObjectResponse>>>,
        _filters: Nullable<Partial<Model.Filters.StorageObjectFilters>>
    ): Observable<PaginatedResponse<Model.Responses.StorageObjectResponse>> {
        return throwError(() => new Error('Not implemented'))
    }
    updateObject(
        _objectId: string,
        _request: Model.Requests.UpdateStorageObjectRequest
    ): Observable<Model.Responses.StorageObjectResponse> {
        return throwError(() => new Error('Not implemented'))
    }
    refreshObjects(
        _bucketId: string,
        _limit: Nullable<number>
    ): Observable<PaginatedResponse<Model.Responses.StorageObjectResponse>> {
        return throwError(() => new Error('Not implemented'))
    }
    deleteObject(_objectId: string): Observable<void> {
        return throwError(() => new Error('Not implemented'))
    }
    deleteManyObjects(
        _request: Model.Requests.DeleteManyStorageObjectsRequest
    ): Observable<void> {
        return throwError(() => new Error('Not implemented'))
    }
}