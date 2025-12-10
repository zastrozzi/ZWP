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
import { LoyaltyCardSchemeLocalActions, LoyaltyCardSchemeRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'LoyaltyCardSchemeEffects', options: { skipMethodDebugger: true } })
export class LoyaltyCardSchemeEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private loyaltyAPI = inject(Services.LOYALTY_API_SERVICE)
    private merchantFacade = inject(Facades.MerchantFacade)
    private brandFacade = inject(Facades.BrandFacade)
    private loyaltyCardSchemeFacade = inject(Facades.LoyaltyCardSchemeFacade)

    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...LoyaltyCardSchemeRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(LoyaltyCardSchemeRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...LoyaltyCardSchemeRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(LoyaltyCardSchemeRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...LoyaltyCardSchemeRemoteActions.failureActions),
            map((action) =>
                remoteStateUpdateFailure(LoyaltyCardSchemeRemoteActions.identifiers)({ error: action.error })
            )
        )
    )

    createLoyaltyCardScheme$ = createRemoteEffect(this.actions$, LoyaltyCardSchemeRemoteActions.create, (action) =>
        this.loyaltyAPI.createLoyaltyCardScheme(
            action.merchantId,
            action.request
        )
    )

    getLoyaltyCardScheme$ = createRemoteEffect(this.actions$, LoyaltyCardSchemeRemoteActions.get, (action) =>
        this.loyaltyAPI.getLoyaltyCardScheme(action.loyaltyCardSchemeId)
    )

    selectLoyaltyCardScheme$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoyaltyCardSchemeLocalActions.selectLoyaltyCardScheme),
            map((action) =>
                LoyaltyCardSchemeRemoteActions.get.request({ loyaltyCardSchemeId: action.loyaltyCardSchemeId })
            )
        )
    )

    updateOrResetFilters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                LoyaltyCardSchemeLocalActions.updateLoyaltyCardSchemeFilters,
                LoyaltyCardSchemeLocalActions.resetLoyaltyCardSchemeFilters
            ),
            filter((action) => action.triggerRemoteFetch),
            withLatestFrom(this.merchantFacade.selectedMerchantId$, this.brandFacade.selectedBrandId$),
            debounceTime(200),
            map(([_, merchantId, brandId]) =>
                LoyaltyCardSchemeRemoteActions.list.request({
                    merchantId: merchantId,
                    brandId: brandId,
                    pagination: null,
                })
            )
        )
    )

    updateOrResetFiltersForPaginatedListComponent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                LoyaltyCardSchemeLocalActions.updateLoyaltyCardSchemeFiltersForPaginatedListComponent,
                LoyaltyCardSchemeLocalActions.resetLoyaltyCardSchemeFiltersForPaginatedListComponent
            ),
            filter((action) => action.triggerRemoteFetch),
            withLatestFrom(this.merchantFacade.selectedMerchantId$, this.brandFacade.selectedBrandId$),
            debounceTime(200),
            map(([action, merchantId, brandId]) =>
                LoyaltyCardSchemeRemoteActions.list.request({
                    merchantId: action.context === Model.LoyaltyCardSchemePaginatedListComponentContext.MERCHANT_DETAIL ? merchantId : null,
                    brandId: action.context === Model.LoyaltyCardSchemePaginatedListComponentContext.BRAND_DETAIL ? brandId : null,
                    pagination: null,
                })
            )
        )
    )

    listLoyaltyCardSchemes$ = createRemoteEffect(this.actions$, LoyaltyCardSchemeRemoteActions.list, (action) =>
        of(action).pipe(
            withLatestFrom(this.loyaltyCardSchemeFacade.loyaltyCardSchemeFilters$),
            switchMap(([action, filters]) =>
                this.loyaltyAPI.listLoyaltyCardSchemes(
                    {
                        merchantId: action.merchantId,
                        brandId: action.brandId
                    },
                    action.pagination,
                    filters
                )
            )
        )
    )

    updateLoyaltyCardScheme$ = createRemoteEffect(this.actions$, LoyaltyCardSchemeRemoteActions.update, (action) =>
        this.loyaltyAPI.updateLoyaltyCardScheme(action.loyaltyCardSchemeId, action.update)
    )

    deleteLoyaltyCardScheme$ = createRemoteEffect(
        this.actions$,
        LoyaltyCardSchemeRemoteActions.delete,
        (action) => this.loyaltyAPI.deleteLoyaltyCardScheme(action.loyaltyCardSchemeId, action.force),
        (action) => ({ loyaltyCardSchemeId: action.loyaltyCardSchemeId })
    )

    ngrxOnInitEffects() {
        return LoyaltyCardSchemeLocalActions.initialiseLoyaltyCardSchemeState()
    }
}
