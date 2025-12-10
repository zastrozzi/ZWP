import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { AssetLocalActions, AssetRemoteActions } from '../actions'
import { debounceTime, filter, map, switchMap } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AssetEffects', options: { skipMethodDebugger: true } })
export class AssetEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private assetAPI = inject(Services.ASSET_API_SERVICE)
    private merchantFacade = inject(Facades.MerchantFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...AssetRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(AssetRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...AssetRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(AssetRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...AssetRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(AssetRemoteActions.identifiers)({ error: action.error }))
    ))

    createAsset$ = createRemoteEffect(
        this.actions$,
        AssetRemoteActions.create,
        (action) => this.assetAPI.createAsset(action.merchantId, action.request)
    )

    getAsset$ = createRemoteEffect(
        this.actions$,
        AssetRemoteActions.get,
        (action) => this.assetAPI.getAsset(action.assetId)
    )

    selectAsset$ = createEffect(() => this.actions$.pipe(
        ofType(AssetLocalActions.selectAsset),
        map((action) => AssetRemoteActions.get.request({ assetId: action.assetId }))
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            AssetLocalActions.updateAssetFilters, 
            AssetLocalActions.resetAssetFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => AssetRemoteActions.list.request({ merchantId: 'auto', pagination: null }))
    ))

    listAssets$ = createRemoteEffect(
        this.actions$,
        AssetRemoteActions.list,
        (action) =>
            action.merchantId === 'auto' ? this.merchantFacade.selectedMerchantId$.pipe(
                switchMap((merchantId) => this.assetAPI.listAssets(merchantId, action.pagination))
            ) : this.assetAPI.listAssets(action.merchantId, action.pagination)          
    )

    updateAsset$ = createRemoteEffect(
        this.actions$,
        AssetRemoteActions.update,
        (action) => this.assetAPI.updateAsset(action.assetId, action.update)
    )

    deleteAsset$ = createRemoteEffect(
        this.actions$,
        AssetRemoteActions.delete,
        (action) => this.assetAPI.deleteAsset(action.assetId),
        (action) => ({ assetId: action.assetId })

    )

    ngrxOnInitEffects() {
        return AssetLocalActions.initialiseAssetState()
    }
}