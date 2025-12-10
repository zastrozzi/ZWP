import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'
import { Model } from '../model'

export const cmsChildRoutes: Routes = [
    {
        path: 'kgc/storage-buckets',
        component: INTERNAL_COMPONENTS.STORAGE_BUCKET_COMPONENTS.StorageBucketPaginatedListComponent,
        data: {
            navTitle: 'Cloud Storage Buckets',
            navIcon: 'perm_media',
            leftNavPanelShown: true
        }
    },
    {
        path: 'kgc/storage-buckets/:bucketId',
        component: INTERNAL_COMPONENTS.STORAGE_BUCKET_COMPONENTS.StorageBucketDetailRouteComponent,
        data: {
            navTitle: 'Cloud Storage Bucket Details',
            navIcon: 'perm_media',
            leftNavPanelShown: false
        },
        children: [
            {
                path: '',
                redirectTo: 'storage-objects',
                pathMatch: 'full',
                data: { tabbedNavShown: false }
            },
            {
                path: 'storage-objects',
                component: INTERNAL_COMPONENTS.STORAGE_OBJECT_COMPONENTS.StorageObjectPaginatedListComponent,
                data: {
                    navTitle: 'Cloud Storage Objects',
                    navIcon: 'photo_library',
                    tabbedNavShown: true,
                    storageObjectListContext: Model.Enums.StorageObjectPaginatedListComponentContext.STORAGE_BUCKET_DETAIL
                }
            }
        ]
    },
    {
        path: 'kgc/storage-objects',
        component: INTERNAL_COMPONENTS.STORAGE_OBJECT_COMPONENTS.StorageObjectPaginatedListComponent,
        data: {
            navTitle: 'Cloud Storage Objects',
            navIcon: 'photo_library',
            leftNavPanelShown: true,
            storageObjectListContext: Model.Enums.StorageObjectPaginatedListComponentContext.STORAGE_OBJECT_LIST
        }
    }
]