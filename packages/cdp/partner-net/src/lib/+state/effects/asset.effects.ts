import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateRequest, remoteStateUpdateSuccess, remoteStateUpdateFailure } from '@zwp/platform.common'
import { Services } from '../../services'
import { AssetLocalActions, AssetRemoteActions } from '../actions'
import { of, switchMap, withLatestFrom, debounceTime, map, filter } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetAssetEffects', options: { skipMethodDebugger: true } })
export class PartnerNetAssetEffects implements OnInitEffects {
  private actions$ = inject(Actions)
  private assetAPI = inject(Services.ASSET_API_SERVICE)
  private assetFacade = inject(Facades.PartnerNetAssetFacade)
  private routerFacade = inject(ZWPRouterFacade)

  // Remote State Updates
  updateRemoteStateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...AssetRemoteActions.requestActions),
      map(() => remoteStateUpdateRequest(AssetRemoteActions.identifiers)())
    )
  )

  updateRemoteStateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...AssetRemoteActions.successActions),
      map(() => remoteStateUpdateSuccess(AssetRemoteActions.identifiers)())
    )
  )

  updateRemoteStateFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...AssetRemoteActions.failureActions),
      map(action => remoteStateUpdateFailure(AssetRemoteActions.identifiers)({ error: action.error }))
    )
  )

  // Local Action Effects - e.g. update or reset asset filters trigger a list request
  updateOrResetFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AssetLocalActions.updateAssetFilters,
        AssetLocalActions.resetAssetFilters
      ),
      filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => AssetRemoteActions.list.request({ pagination: null }))
    )
  )

  // Remote Action CRUD Effects
  createAsset$ = createRemoteEffect(
    this.actions$,
    AssetRemoteActions.create,
    action => this.assetAPI.createAsset(action.request)
  )

  getAsset$ = createRemoteEffect(
    this.actions$,
    AssetRemoteActions.get,
    action => this.assetAPI.getAsset(action.assetId)
  )

  listAssets$ = createRemoteEffect(
    this.actions$,
    AssetRemoteActions.list,
    action => of(action).pipe(
      withLatestFrom(this.assetFacade.assetFilters$),
      switchMap(([requestAction, filters]) =>
        this.assetAPI.listAssets(requestAction.parentId, requestAction.parentType, requestAction.pagination, filters)
      )
    )
  )

  updateAsset$ = createRemoteEffect(
    this.actions$,
    AssetRemoteActions.update,
    action => this.assetAPI.updateAsset(action.assetId, action.update)
  )

  deleteAsset$ = createRemoteEffect(
    this.actions$,
    AssetRemoteActions.delete,
    action => this.assetAPI.deleteAsset(action.assetId, action.force)
  )

  ngrxOnInitEffects() {
    return AssetLocalActions.initialiseAssetState()
  }
}