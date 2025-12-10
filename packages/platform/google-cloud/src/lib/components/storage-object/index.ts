import { CreateStorageObjectWindowComponent } from './create-storage-object.window.component'
import { StorageObjectDetailRightPanelComponent } from './storage-object.detail.right-panel.component'
import { StorageObjectPaginatedListComponent } from './storage-object.paginated-list.component'

export * from './create-storage-object.window.component'
export * from './storage-object.detail.right-panel.component'
export * from './storage-object.paginated-list.component'

export const STORAGE_OBJECT_COMPONENTS = {
    CreateStorageObjectWindowComponent,
    StorageObjectDetailRightPanelComponent,
    StorageObjectPaginatedListComponent,

    ALL: [
        CreateStorageObjectWindowComponent,
        StorageObjectDetailRightPanelComponent,
        StorageObjectPaginatedListComponent
    ]
}