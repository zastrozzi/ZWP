import { CreateStorageBucketWindowComponent } from './create-storage-bucket.window.component'
import { StorageBucketDetailRightPanelComponent } from './storage-bucket.detail.right-panel.component'
import { StorageBucketDetailRouteComponent } from './storage-bucket.detail-route.component'
import { StorageBucketPaginatedListComponent } from './storage-bucket.paginated-list.component'

export * from './create-storage-bucket.window.component'
export * from './storage-bucket.detail.right-panel.component'
export * from './storage-bucket.detail-route.component'
export * from './storage-bucket.paginated-list.component'

export const STORAGE_BUCKET_COMPONENTS = {
    CreateStorageBucketWindowComponent,
    StorageBucketDetailRightPanelComponent,
    StorageBucketDetailRouteComponent,
    StorageBucketPaginatedListComponent,

    ALL: [
        CreateStorageBucketWindowComponent,
        StorageBucketDetailRightPanelComponent,
        StorageBucketDetailRouteComponent,
        StorageBucketPaginatedListComponent
    ]
}