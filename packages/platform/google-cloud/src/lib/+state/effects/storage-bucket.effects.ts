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
import { StorageBucketLocalActions, StorageBucketRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'GoogleCloudStorageBucketEffects', options: { skipMethodDebugger: true } })
export class GoogleCloudStorageBucketEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private storageBucketAPI = inject(Services.STORAGE_BUCKET_API_SERVICE)
    private storageBucketFacade = inject(Facades.GoogleCloudStorageBucketFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...StorageBucketRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(StorageBucketRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...StorageBucketRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(StorageBucketRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...StorageBucketRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(StorageBucketRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects
    updateOrResetFilters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StorageBucketLocalActions.updateStorageBucketFilters, StorageBucketLocalActions.resetStorageBucketFilters),
            filter((action) => action.triggerRemoteFetch),
            debounceTime(200),
            map(() => StorageBucketRemoteActions.listStorageBuckets.request({ pagination: null }))
        )
    )

    selectStorageBucket$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StorageBucketLocalActions.selectStorageBucket),
            map((action) => StorageBucketRemoteActions.getStorageBucket.request({ bucketId: action.bucketId }))
        )
    )

    // Remote Action CRUD Effects
    createStorageBucket$ = createRemoteEffect(this.actions$, StorageBucketRemoteActions.createStorageBucket, (action) =>
        this.storageBucketAPI.createBucket(action.request)
    )

    getStorageBucket$ = createRemoteEffect(this.actions$, StorageBucketRemoteActions.getStorageBucket, (action) =>
        this.storageBucketAPI.getBucket(action.bucketId)
    )

    listStorageBuckets$ = createRemoteEffect(this.actions$, StorageBucketRemoteActions.listStorageBuckets, (action) =>
        of(action).pipe(
            withLatestFrom(this.storageBucketFacade.storageBucketFilters$),
            switchMap(([requestAction, bucketFilters]) =>
                this.storageBucketAPI.listBuckets(
                    requestAction.pagination,
                    bucketFilters
                )
            )
        )
    )

    updateStorageBucket$ = createRemoteEffect(this.actions$, StorageBucketRemoteActions.updateStorageBucket, (action) =>
        this.storageBucketAPI.updateBucket(action.bucketId, action.update)
    )

    refreshStorageBuckets$ = createRemoteEffect(this.actions$, StorageBucketRemoteActions.refreshStorageBuckets, (action) =>
        this.storageBucketAPI.refreshBuckets(action.limit)
    )

    deleteStorageBucket$ = createRemoteEffect(this.actions$, StorageBucketRemoteActions.deleteStorageBucket, (action) =>
        this.storageBucketAPI.deleteBucket(action.bucketId)
    )

    // OnInitEffects
    ngrxOnInitEffects() {
        return StorageBucketLocalActions.initialiseStorageBucketState()
    }
}
