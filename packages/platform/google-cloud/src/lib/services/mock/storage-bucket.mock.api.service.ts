import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { StorageBucketAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'StorageBucketMockAPIService',
    options: { skipMethodDebugger: true },
})
export class StorageBucketMockAPIService implements StorageBucketAPIService {
    
    createBucket(
        _request: Model.Requests.CreateStorageBucketRequest
    ): Observable<Model.Responses.StorageBucketResponse> {
        return throwError(() => new Error('Not implemented'))
    }

    getBucket(_bucketId: string): Observable<Model.Responses.StorageBucketResponse> {
        return throwError(() => new Error('Not implemented'))
    }

    listBuckets(
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageBucketResponse>>>,
        _filters: Nullable<Partial<Model.Filters.StorageBucketFilters>>
    ): Observable<PaginatedResponse<Model.Responses.StorageBucketResponse>> {
        return throwError(() => new Error('Not implemented'))
    }

    updateBucket(
        _bucketId: string,
        _request: Model.Requests.UpdateStorageBucketRequest
    ): Observable<Model.Responses.StorageBucketResponse> {
        return throwError(() => new Error('Not implemented'))
    }

    refreshBuckets(
        _limit: Nullable<number>
    ): Observable<PaginatedResponse<Model.Responses.StorageBucketResponse>> {
        return throwError(() => new Error('Not implemented'))
    }

    deleteBucket(_bucketId: string): Observable<void> {
        return throwError(() => new Error('Not implemented'))
    }
}