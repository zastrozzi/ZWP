import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class StorageBucketAPIService {
    abstract createBucket(
        request: Model.Requests.CreateStorageBucketRequest
    ): Observable<Model.Responses.StorageBucketResponse>

    abstract getBucket(
        bucketId: string
    ): Observable<Model.Responses.StorageBucketResponse>

    abstract listBuckets(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageBucketResponse>>>,
        filters: Nullable<Partial<Model.Filters.StorageBucketFilters>>
    ): Observable<PaginatedResponse<Model.Responses.StorageBucketResponse>>

    abstract updateBucket(
        bucketId: string,
        request: Model.Requests.UpdateStorageBucketRequest
    ): Observable<Model.Responses.StorageBucketResponse>

    abstract refreshBuckets(
        limit: Nullable<number>
    ): Observable<PaginatedResponse<Model.Responses.StorageBucketResponse>>

    abstract deleteBucket(bucketId: string): Observable<void>
}

export const STORAGE_BUCKET_API_SERVICE = new InjectionToken<StorageBucketAPIService>(
    'platform.google-cloud.storage-bucket.api.service'
)