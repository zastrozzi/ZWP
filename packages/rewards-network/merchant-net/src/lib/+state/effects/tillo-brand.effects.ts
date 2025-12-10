import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { Services } from '../../services'
import { BrandTilloBrandLocalActions, BrandTilloBrandRemoteActions } from '../actions'
import { debounceTime, filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'MerchantNetTilloBrandEffects', options: { skipMethodDebugger: true } })
export class MerchantNetTilloBrandEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private merchantNetTilloBrandAPIService = inject(Services.MERCHANT_NET_TILLO_BRAND_API_SERVICE)
    private merchantNetTilloBrandFacade = inject(Facades.MerchantNetTilloBrandFacade)
    private tilloBrandFacade = inject(RewardsNetworkTillo.State.Facades.TilloBrandFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...BrandTilloBrandRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(BrandTilloBrandRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...BrandTilloBrandRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(BrandTilloBrandRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...BrandTilloBrandRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(BrandTilloBrandRemoteActions.identifiers)({ error: action.error }))
    ))

    onboardTilloBrand$ = createRemoteEffect(this.actions$, BrandTilloBrandRemoteActions.onboardTilloBrand, (action) => 
        this.merchantNetTilloBrandAPIService.onboardTilloBrand(
            action.tilloBrandId,
            action.parent
        )
    )

    getBrandTilloBrand$ = createRemoteEffect(this.actions$, BrandTilloBrandRemoteActions.getBrandTilloBrand, (action) => 
        this.merchantNetTilloBrandAPIService.getBrandTilloBrand(action.brandTilloBrandId)
    )

    listBrandTilloBrands$ = createRemoteEffect(this.actions$, BrandTilloBrandRemoteActions.listBrandTilloBrands, (action) => 
        of(action).pipe(
            withLatestFrom(this.merchantNetTilloBrandFacade.brandTilloBrandFilters$),
            switchMap(([action, filters]) =>
                this.merchantNetTilloBrandAPIService.listBrandTilloBrands(
                    action.parent,
                    action.pagination,
                    filters
                )
            )
        )
    )

    deleteBrandTilloBrand$ = createRemoteEffect(
        this.actions$, 
        BrandTilloBrandRemoteActions.deleteBrandTilloBrand, 
        (action) => this.merchantNetTilloBrandAPIService.deleteBrandTilloBrand(action.brandTilloBrandId, action.force),
        (action) => ({ brandTilloBrandId: action.brandTilloBrandId })
    )

    listTilloBrands$ = createRemoteEffect(
        this.actions$,
        BrandTilloBrandRemoteActions.listTilloBrands,
        (action) => of(action).pipe(
            withLatestFrom(this.tilloBrandFacade.brandFilters$),
            switchMap(([action, filters]) =>
                this.merchantNetTilloBrandAPIService.listTilloBrands(
                    action.parent,
                    action.pagination,
                    filters
                )
            )
        )
    )


    // Local Action Effects
    // updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
    //     ofType(
    //         BrandTilloBrandLocalActions.updateBrandTilloBrandFilters,
    //         BrandTilloBrandLocalActions.resetBrandTilloBrandFilters
    //     ),
    //     filter((action) => action.triggerRemoteFetch),
    //     debounceTime(200),
    //     map(() => BrandTilloBrandRemoteActions.listBrandTilloBrands.request({ parent: { brandId: null, merchantId: null }, pagination: null }))
    // ))

    ngrxOnInitEffects() {
        return BrandTilloBrandLocalActions.initialiseBrandTilloBrandState()
    }
}