import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import {
    ZWPDebuggableInjectable,
    createRemoteEffect,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
} from '@zwp/platform.common'
import { Services } from '../../services'
import { LoyaltyCardSchemeBrandLocalActions, LoyaltyCardSchemeBrandRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'LoyaltyCardSchemeBrandEffects', options: { skipMethodDebugger: true } })
export class LoyaltyCardSchemeBrandEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private loyaltyAPI = inject(Services.LOYALTY_API_SERVICE)
    private merchantFacade = inject(Facades.MerchantFacade)
    private brandFacade = inject(Facades.BrandFacade)
    private loyaltyCardSchemeBrandFacade = inject(Facades.LoyaltyCardSchemeBrandFacade)

    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...LoyaltyCardSchemeBrandRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(LoyaltyCardSchemeBrandRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...LoyaltyCardSchemeBrandRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(LoyaltyCardSchemeBrandRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...LoyaltyCardSchemeBrandRemoteActions.failureActions),
            map((action) =>
                remoteStateUpdateFailure(LoyaltyCardSchemeBrandRemoteActions.identifiers)({ error: action.error })
            )
        )
    )

    addBrandToLoyaltyCardScheme$ = createRemoteEffect(this.actions$, LoyaltyCardSchemeBrandRemoteActions.addBrandToLoyaltyCardScheme, (action) =>
        this.loyaltyAPI.addBrandToLoyaltyCardScheme(
            action.loyaltyCardSchemeId,
            action.brandId
        )
    )

    removeBrandFromLoyaltyCardScheme$ = createRemoteEffect(this.actions$, LoyaltyCardSchemeBrandRemoteActions.removeBrandFromLoyaltyCardScheme, (action) =>
        this.loyaltyAPI.removeBrandFromLoyaltyCardScheme(
            action.loyaltyCardSchemeId,
            action.brandId,
            action.force
        ),
        (action) => ({ loyaltyCardSchemeId: action.loyaltyCardSchemeId, brandId: action.brandId })
    )

    getLoyaltyCardSchemeBrand$ = createRemoteEffect(this.actions$, LoyaltyCardSchemeBrandRemoteActions.getLoyaltyCardSchemeBrand, (action) =>
        this.loyaltyAPI.getLoyaltyCardSchemeBrand(action.loyaltyCardSchemeBrandId)
    )

    selectLoyaltyCardSchemeBrand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoyaltyCardSchemeBrandLocalActions.selectLoyaltyCardSchemeBrand),
            map((action) =>
                LoyaltyCardSchemeBrandRemoteActions.getLoyaltyCardSchemeBrand.request({ loyaltyCardSchemeBrandId: action.loyaltyCardSchemeBrandId })
            )
        )
    )

    // updateOrResetFilters$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(
    //             LoyaltyCardSchemeBrandLocalActions.updateLoyaltyCardSchemeBrandFilters,
    //             LoyaltyCardSchemeBrandLocalActions.resetLoyaltyCardSchemeBrandFilters
    //         ),
    //         filter((action) => action.triggerRemoteFetch),
    //         withLatestFrom(this.merchantFacade.selectedMerchantId$, this.brandFacade.selectedBrandId$),
    //         debounceTime(200),
    //         map(([_, merchantId, brandId]) =>
    //             LoyaltyCardSchemeBrandRemoteActions.list.request({
    //                 merchantId: merchantId,
    //                 brandId: brandId,
    //                 pagination: null,
    //             })
    //         )
    //     )
    // )

    // updateOrResetFiltersForPaginatedListComponent$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(
    //             LoyaltyCardSchemeBrandLocalActions.updateLoyaltyCardSchemeBrandFiltersForPaginatedListComponent,
    //             LoyaltyCardSchemeBrandLocalActions.resetLoyaltyCardSchemeBrandFiltersForPaginatedListComponent
    //         ),
    //         filter((action) => action.triggerRemoteFetch),
    //         withLatestFrom(this.merchantFacade.selectedMerchantId$, this.brandFacade.selectedBrandId$),
    //         debounceTime(200),
    //         map(([action, merchantId, brandId]) =>
    //             LoyaltyCardSchemeBrandRemoteActions.list.request({
    //                 merchantId: action.context === Model.LoyaltyCardSchemeBrandPaginatedListComponentContext.MERCHANT_DETAIL ? merchantId : null,
    //                 brandId: action.context === Model.LoyaltyCardSchemeBrandPaginatedListComponentContext.BRAND_DETAIL ? brandId : null,
    //                 pagination: null,
    //             })
    //         )
    //     )
    // )

    listLoyaltyCardSchemeBrands$ = createRemoteEffect(this.actions$, LoyaltyCardSchemeBrandRemoteActions.listLoyaltyCardSchemeBrands, (action) =>
        of(action).pipe(
            withLatestFrom(this.loyaltyCardSchemeBrandFacade.loyaltyCardSchemeBrandFilters$),
            switchMap(([action, filters]) =>
                this.loyaltyAPI.listLoyaltyCardSchemeBrands(
                    {
                        cardSchemeId: action.loyaltyCardSchemeId,
                        brandId: action.brandId
                    },
                    action.pagination,
                    filters
                )
            )
        )
    )

    ngrxOnInitEffects() {
        return LoyaltyCardSchemeBrandLocalActions.initialiseLoyaltyCardSchemeBrandState()
    }
}
