import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import {
    ZWPDebuggableInjectable,
    ZWPRouterFacade,
    createRemoteEffect,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
} from '@zwp/platform.common'
import { Services } from '../../services'
import { StorageObjectLocalActions, StorageObjectRemoteActions, FileUploadLocalActions } from '../actions'
import { debounceTime, filter, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'
import { v4 } from 'uuid'
import { HttpEventType } from '@angular/common/http'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'GoogleCloudStorageObjectEffects', options: { skipMethodDebugger: true } })
export class GoogleCloudStorageObjectEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private storageObjectAPI = inject(Services.STORAGE_OBJECT_API_SERVICE)
    private storageObjectFacade = inject(Facades.GoogleCloudStorageObjectFacade)
    private storageBucketFacade = inject(Facades.GoogleCloudStorageBucketFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...StorageObjectRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(StorageObjectRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...StorageObjectRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(StorageObjectRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...StorageObjectRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(StorageObjectRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects
    updateOrResetFilters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StorageObjectLocalActions.updateStorageObjectFilters, StorageObjectLocalActions.resetStorageObjectFilters),
            filter((action) => action.triggerRemoteFetch),
            withLatestFrom(this.storageBucketFacade.selectedStorageBucketId$),
            debounceTime(200),
            map(([_, bucketId]) => StorageObjectRemoteActions.listStorageObjects.request({ bucketId: bucketId, pagination: null }))
        )
    )

    selectStorageObject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StorageObjectLocalActions.selectStorageObject),
            map((action) => StorageObjectRemoteActions.getStorageObject.request({ objectId: action.objectId }))
        )
    )

    // Remote Action CRUD Effects
    // _uploadStorageObject$ = createRemoteEffect(this.actions$, StorageObjectRemoteActions.uploadStorageObject, (action) =>
    //     this.storageObjectAPI.uploadObject(action.bucketId, action.request).pipe(
    //         tap(httpEvent => {
    //             console.log(httpEvent.type, "uploadStorageObject")
    //         })
    //     )
    // )

    uploadStorageObject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StorageObjectRemoteActions.uploadStorageObject.request),
            map(action => ({ uploadAction: action, uploadId: v4()})),
            mergeMap(({ uploadAction, uploadId }) =>
                this.storageObjectAPI.uploadObject(uploadAction.bucketId, uploadAction.request).pipe(
                    map((httpEvent) => {
                        switch (httpEvent.type) {
                            case HttpEventType.Sent: {
                                return FileUploadLocalActions.createFileUpload({
                                    fileUpload: { 
                                        id: uploadId, 
                                        name: uploadAction.request.name, 
                                        uploadStarted: new Date(),
                                        size: uploadAction.request.file.size,
                                        status: Model.Enums.FileUploadStatus.uploading,
                                        progress: 0
                                    }
                                })
                            }
                            case HttpEventType.UploadProgress: {
                                const progress = Math.round((100 * httpEvent.loaded) / (httpEvent.total ?? 1))
                                const status = progress === 100 ? Model.Enums.FileUploadStatus.processing : Model.Enums.FileUploadStatus.uploading
                                return FileUploadLocalActions.updateFileUpload({ 
                                    fileUploadId: uploadId,
                                    changes: { 
                                        progress: progress,
                                        status: status
                                    } 
                                })
                            }
                            case HttpEventType.ResponseHeader: {
                                if (httpEvent.status === 201) {
                                    return FileUploadLocalActions.updateFileUpload({
                                        fileUploadId: uploadId,
                                        changes: { status: Model.Enums.FileUploadStatus.completed }
                                    })
                                } else {
                                    return FileUploadLocalActions.updateFileUpload({
                                        fileUploadId: uploadId,
                                        changes: { status: Model.Enums.FileUploadStatus.failed, error: httpEvent.statusText }
                                    })
                                }
                            }
                            case HttpEventType.Response: {
                                if (httpEvent.status === 201) {
                                    return StorageObjectRemoteActions.uploadStorageObject.success({ 
                                        response: httpEvent['body']
                                    } as any)
                                } else {
                                    return StorageObjectRemoteActions.uploadStorageObject.failure({ error: httpEvent['body'] })
                                }
                            }
                            default: {
                                return FileUploadLocalActions.noopAction()
                            }
                        }
                    })
                )
            )
        )
    )

    getStorageObject$ = createRemoteEffect(this.actions$, StorageObjectRemoteActions.getStorageObject, (action) =>
        this.storageObjectAPI.getObject(action.objectId)
    )

    listStorageObjects$ = createRemoteEffect(this.actions$, StorageObjectRemoteActions.listStorageObjects, (action) =>
        of(action).pipe(
            withLatestFrom(this.storageObjectFacade.storageObjectFilters$),
            switchMap(([requestAction, objectFilters]) =>
                this.storageObjectAPI.listObjects(
                    requestAction.bucketId,
                    requestAction.pagination,
                    objectFilters
                )
            )
        )
    )

    updateStorageObject$ = createRemoteEffect(this.actions$, StorageObjectRemoteActions.updateStorageObject, (action) =>
        this.storageObjectAPI.updateObject(action.objectId, action.update)
    )

    refreshStorageObjects$ = createRemoteEffect(this.actions$, StorageObjectRemoteActions.refreshStorageObjects, (action) =>
        this.storageObjectAPI.refreshObjects(action.bucketId, action.limit)
    )

    deleteStorageObject$ = createRemoteEffect(this.actions$, StorageObjectRemoteActions.deleteStorageObject, (action) =>
        this.storageObjectAPI.deleteObject(action.objectId),
        (action) => ({ objectId: action.objectId })
    )

    deleteManyStorageObjects$ = createRemoteEffect(this.actions$, StorageObjectRemoteActions.deleteManyStorageObjects, (action) =>
        this.storageObjectAPI.deleteManyObjects(action.request),
        (action) => ({ objectIds: action.request.objectIds })
    )

    // OnInitEffects
    ngrxOnInitEffects() {
        return StorageObjectLocalActions.initialiseStorageObjectState()
    }
}
