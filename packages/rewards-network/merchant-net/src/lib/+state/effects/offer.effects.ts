import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { OfferLocalActions, OfferRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'OfferEffects', options: { skipMethodDebugger: true } })
export class OfferEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private offerAPI = inject(Services.OFFER_API_SERVICE)
    private merchantFacade = inject(Facades.MerchantFacade)
    private brandFacade = inject(Facades.BrandFacade)
    private routerFacade = inject(ZWPRouterFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...OfferRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(OfferRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...OfferRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(OfferRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...OfferRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(OfferRemoteActions.identifiers)({ error: action.error }))
    ))

    createOffer$ = createRemoteEffect(
        this.actions$,
        OfferRemoteActions.create,
        (action) => this.offerAPI.createOffer({ merchantId: action.merchantId, brandId: action.brandId }, action.request)
    )

    getOffer$ = createRemoteEffect(
        this.actions$,
        OfferRemoteActions.get,
        (action) => this.offerAPI.getOffer(action.offerId)
    )

    selectOffer$ = createEffect(() => this.actions$.pipe(
        ofType(OfferLocalActions.selectOffer),
        map((action) => OfferRemoteActions.get.request({ offerId: action.offerId }))
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            OfferLocalActions.updateOfferFilters, 
            OfferLocalActions.resetOfferFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => OfferRemoteActions.list.request({ merchantId: 'auto', brandId: 'auto', pagination: null }))
    ))

    listOffers$ = createRemoteEffect(
        this.actions$,
        OfferRemoteActions.list,
        (action) => of(action).pipe(
            withLatestFrom(
                this.brandFacade.selectedBrandId$,
                this.merchantFacade.selectedMerchantId$
            ),
            switchMap(([action, brandId, merchantId]) => {
                return this.offerAPI.listOffers({ 
                    brandId: action.brandId === 'auto' ? brandId : action.brandId, 
                    merchantId: action.merchantId === 'auto' ? merchantId : action.merchantId
                }, action.pagination)
            })
        )
    )

    updateOffer$ = createRemoteEffect(
        this.actions$,
        OfferRemoteActions.update,
        (action) => this.offerAPI.updateOffer(action.offerId, action.update)
    )

    deleteOffer$ = createRemoteEffect(
        this.actions$,
        OfferRemoteActions.delete,
        (action) => this.offerAPI.deleteOffer(action.offerId),
        (action) => ({ offerId: action.offerId })

    )

    deleteOfferRoute$ = createEffect(() => this.actions$.pipe(
        ofType(OfferRemoteActions.delete.success),
        map(() => this.routerFacade.navigate(['/merchant-net/offers']))
    ), { dispatch: false })

    // createMerchantRoute$ = createEffect(() => this.actions$.pipe(
    //     ofType(OfferRemoteActions.create.success),
    //     map((action) => this.routerFacade.navigate(['/merchant-net/offers', action.response.id]))
    // ), { dispatch: false })

    ngrxOnInitEffects() {
        return OfferLocalActions.initialiseOfferState()
    }
}