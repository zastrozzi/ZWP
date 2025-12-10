import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { BrandLocalActions, BrandRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'
import { Model } from '../../model'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'BrandEffects', options: { skipMethodDebugger: true } })
export class BrandEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private brandAPI = inject(Services.BRAND_API_SERVICE)
    private brandFacade = inject(Facades.BrandFacade)
    private merchantFacade = inject(Facades.MerchantFacade)
    private routerFacade = inject(ZWPRouterFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...BrandRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(BrandRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...BrandRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(BrandRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...BrandRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(BrandRemoteActions.identifiers)({ error: action.error }))
    ))

    createBrand$ = createRemoteEffect(
        this.actions$,
        BrandRemoteActions.create,
        (action) => this.brandAPI.createBrand(action.merchantId, action.request)
    )

    getBrand$ = createRemoteEffect(
        this.actions$,
        BrandRemoteActions.get,
        (action) => this.brandAPI.getBrand(action.brandId)
    )

    selectBrand$ = createEffect(() => this.actions$.pipe(
        ofType(BrandLocalActions.selectBrand),
        map((action) => BrandRemoteActions.get.request({ brandId: action.brandId }))
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            BrandLocalActions.updateBrandFilters, 
            BrandLocalActions.resetBrandFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        withLatestFrom(this.merchantFacade.selectedMerchantId$),
        debounceTime(200),
        map(([_, merchantId]) => BrandRemoteActions.list.request({ merchantId: merchantId, pagination: null }))
    ))

    updateOrResetFiltersForPaginatedListComponent$ = createEffect(() =>
            this.actions$.pipe(
                ofType(
                    BrandLocalActions.updateBrandFiltersForPaginatedListComponent,
                    BrandLocalActions.resetBrandFiltersForPaginatedListComponent
                ),
                filter((action) => action.triggerRemoteFetch),
                withLatestFrom(this.merchantFacade.selectedMerchantId$),
                debounceTime(200),
                map(([action, merchantId]) =>
                    BrandRemoteActions.list.request({
                        merchantId: action.context === Model.BrandPaginatedListComponentContext.MERCHANT_DETAIL ? merchantId : null,
                        pagination: null,
                    })
                )
            )
        )

    listBrands$ = createRemoteEffect(
        this.actions$,
        BrandRemoteActions.list,
        (action) => of(action).pipe(
            withLatestFrom(this.brandFacade.brandFilters$),
            switchMap(([action, filters]) => {
                return this.brandAPI.listBrands(action.merchantId, action.pagination, filters)
            })
        )
    )

    updateBrand$ = createRemoteEffect(
        this.actions$,
        BrandRemoteActions.update,
        (action) => this.brandAPI.updateBrand(action.brandId, action.update)
    )

    deleteBrand$ = createRemoteEffect(
        this.actions$,
        BrandRemoteActions.delete,
        (action) => this.brandAPI.deleteBrand(action.brandId),
        (action) => ({ brandId: action.brandId })

    )

    deleteBrandRoute$ = createEffect(() => this.actions$.pipe(
        ofType(BrandRemoteActions.delete.success),
        map(() => this.routerFacade.navigate(['/merchant-net/brands']))
    ), { dispatch: false })

    createBrandRoute$ = createEffect(() => this.actions$.pipe(
        ofType(BrandRemoteActions.create.success),
        map((action) => this.routerFacade.navigate(['/merchant-net/brands', action.response.id]))
    ), { dispatch: false })

    ngrxOnInitEffects() {
        return BrandLocalActions.initialiseBrandState()
    }
}