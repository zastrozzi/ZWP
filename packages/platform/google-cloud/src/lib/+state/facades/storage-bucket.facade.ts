import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { StorageBucketLocalActions, StorageBucketRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'GoogleCloudStorageBucketFacade', options: { skipMethodDebugger: true } })
export class GoogleCloudStorageBucketFacade {
    private store = inject(Store)

    storageBucketFilters$ = this.store.pipe(select(Selectors.StorageBucketSelectors.selectStorageBucketFilters))
    storageBucketRemotePagination$ = this.store.pipe(select(Selectors.StorageBucketSelectors.selectStorageBucketRemotePagination))
    storageBucketRemoteState$ = this.store.pipe(select(Selectors.StorageBucketSelectors.selectStorageBucketRemoteState))

    storageBuckets$ = this.store.pipe(select(Selectors.StorageBucketSelectors.selectAllStorageBuckets))
    paginatedFilteredStorageBuckets$ = this.store.pipe(select(Selectors.StorageBucketSelectors.selectPaginatedFilteredStorageBuckets))
    
    selectedStorageBucket$ = this.store.pipe(select(Selectors.StorageBucketSelectors.selectedStorageBucket))
    selectedStorageBucketId$ = this.store.pipe(select(Selectors.StorageBucketSelectors.selectSelectedStorageBucketId))

    storageBucketById$ = (id: string) => this.store.pipe(select(Selectors.StorageBucketSelectors.selectStorageBucketById(id)))
    
    createStorageBucket(request: Model.Requests.CreateStorageBucketRequest) {
        return this.store.dispatch(StorageBucketRemoteActions.createStorageBucket.request({ request }))
    }

    getStorageBucket(bucketId: string) {
        return this.store.dispatch(StorageBucketRemoteActions.getStorageBucket.request({ bucketId }))
    }

    listStorageBuckets(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageBucketResponse>>> = null
    ) {
        return this.store.dispatch(StorageBucketRemoteActions.listStorageBuckets.request({ pagination }))
    }

    updateStorageBucket(bucketId: string, update: Model.Requests.UpdateStorageBucketRequest) {
        return this.store.dispatch(StorageBucketRemoteActions.updateStorageBucket.request({ bucketId, update }))
    }

    refreshStorageBuckets(limit: Nullable<number> = null) {
        return this.store.dispatch(StorageBucketRemoteActions.refreshStorageBuckets.request({ limit }))
    }

    deleteStorageBucket(bucketId: string) {
        return this.store.dispatch(StorageBucketRemoteActions.deleteStorageBucket.request({ bucketId }))
    }

    selectStorageBucket(bucketId: string) {
        return this.store.dispatch(StorageBucketLocalActions.selectStorageBucket({ bucketId }))
    }

    deselectStorageBucket() {
        return this.store.dispatch(StorageBucketLocalActions.deselectStorageBucket())
    }

    updateStorageBucketFilters(filters: Partial<Model.Filters.StorageBucketFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(StorageBucketLocalActions.updateStorageBucketFilters({ filters, triggerRemoteFetch }))
    }

    resetStorageBucketFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(StorageBucketLocalActions.resetStorageBucketFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(StorageBucketLocalActions.resetPagination())
    }
}
