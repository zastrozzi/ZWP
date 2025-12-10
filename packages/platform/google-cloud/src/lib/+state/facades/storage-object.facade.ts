import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { StorageObjectLocalActions, StorageObjectRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'GoogleCloudStorageObjectFacade', options: { skipMethodDebugger: true } })
export class GoogleCloudStorageObjectFacade {
    private store = inject(Store)

    storageObjectFilters$ = this.store.pipe(select(Selectors.StorageObjectSelectors.selectStorageObjectFilters))
    storageObjectRemotePagination$ = this.store.pipe(
        select(Selectors.StorageObjectSelectors.selectStorageObjectRemotePagination)
    )
    storageObjectRemoteState$ = this.store.pipe(select(Selectors.StorageObjectSelectors.selectStorageObjectRemoteState))

    storageObjects$ = this.store.pipe(select(Selectors.StorageObjectSelectors.selectAllStorageObjects))
    paginatedFilteredStorageObjects$ = this.store.pipe(
        select(Selectors.StorageObjectSelectors.selectPaginatedFilteredStorageObjects)
    )

    storageObjectsForSelectedStorageBucket$ = this.store.pipe(
        select(Selectors.StorageObjectSelectors.selectStorageObjectsForSelectedStorageBucket)
    )

    paginatedFilteredStorageObjectsForSelectedStorageBucket$ = this.store.pipe(
        select(Selectors.StorageObjectSelectors.selectPaginatedFilteredStorageObjectsForSelectedStorageBucket)
    )

    selectedStorageObject$ = this.store.pipe(select(Selectors.StorageObjectSelectors.selectedStorageObject))
    selectedStorageObjectId$ = this.store.pipe(select(Selectors.StorageObjectSelectors.selectSelectedStorageObjectId))

    storageObjectById$ = (id: string) =>
        this.store.pipe(select(Selectors.StorageObjectSelectors.selectStorageObjectById(id)))
    
    storageObjectsForStorageBucket$ = (storageBucketId: string) =>
        this.store.pipe(select(Selectors.StorageObjectSelectors.selectStorageObjectsForStorageBucket(storageBucketId)))

    uploadStorageObject(bucketId: string, request: Model.Requests.UploadStorageObjectRequest) {
        return this.store.dispatch(StorageObjectRemoteActions.uploadStorageObject.request({ bucketId, request }))
    }

    getStorageObject(objectId: string) {
        return this.store.dispatch(StorageObjectRemoteActions.getStorageObject.request({ objectId }))
    }

    listStorageObjects(
        bucketId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.Responses.StorageObjectResponse>>> = null
    ) {
        return this.store.dispatch(StorageObjectRemoteActions.listStorageObjects.request({ bucketId, pagination }))
    }

    updateStorageObject(objectId: string, update: Model.Requests.UpdateStorageObjectRequest) {
        return this.store.dispatch(StorageObjectRemoteActions.updateStorageObject.request({ objectId, update }))
    }

    refreshStorageObjects(bucketId: string, limit: Nullable<number> = null) {
        return this.store.dispatch(StorageObjectRemoteActions.refreshStorageObjects.request({ bucketId, limit }))
    }

    deleteStorageObject(objectId: string) {
        return this.store.dispatch(StorageObjectRemoteActions.deleteStorageObject.request({ objectId }))
    }

    deleteManyStorageObjects(request: Model.Requests.DeleteManyStorageObjectsRequest) {
        return this.store.dispatch(StorageObjectRemoteActions.deleteManyStorageObjects.request({ request }))
    }

    selectStorageObject(objectId: string) {
        return this.store.dispatch(StorageObjectLocalActions.selectStorageObject({ objectId }))
    }

    deselectStorageObject() {
        return this.store.dispatch(StorageObjectLocalActions.deselectStorageObject())
    }

    updateStorageObjectFilters(
        filters: Partial<Model.Filters.StorageObjectFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            StorageObjectLocalActions.updateStorageObjectFilters({ filters, triggerRemoteFetch })
        )
    }

    resetStorageObjectFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(StorageObjectLocalActions.resetStorageObjectFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(StorageObjectLocalActions.resetPagination())
    }
}
