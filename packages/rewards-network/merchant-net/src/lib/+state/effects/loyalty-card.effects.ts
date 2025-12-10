import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { LoyaltyCardLocalActions, LoyaltyCardRemoteActions } from '../actions'
import { debounceTime, EMPTY, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { CDPUsers } from '@zwp/cdp.users'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'LoyaltyCardEffects', options: { skipMethodDebugger: true } })
export class LoyaltyCardEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private loyaltyAPI = inject(Services.LOYALTY_API_SERVICE)
    private enduserFacade = inject(CDPUsers.State.EnduserFacade)
    private loyaltyCardFacade = inject(Facades.LoyaltyCardFacade)
    private loyaltyCardSchemeFacade = inject(Facades.LoyaltyCardSchemeFacade)
    private brandFacade = inject(Facades.BrandFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...LoyaltyCardRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(LoyaltyCardRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...LoyaltyCardRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(LoyaltyCardRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...LoyaltyCardRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(LoyaltyCardRemoteActions.identifiers)({ error: action.error }))
    ))

    createLoyaltyCard$ = createRemoteEffect(
        this.actions$,
        LoyaltyCardRemoteActions.create,
        (action) => this.loyaltyAPI.createLoyaltyCard(action.enduserId, action.request)
    )

    getLoyaltyCard$ = createRemoteEffect(
        this.actions$,
        LoyaltyCardRemoteActions.get,
        (action) => this.loyaltyAPI.getLoyaltyCard(action.loyaltyCardId)
    )

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            LoyaltyCardLocalActions.updateLoyaltyCardFilters, 
            LoyaltyCardLocalActions.resetLoyaltyCardFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => LoyaltyCardRemoteActions.list.request({ cardSchemeId: 'auto', enduserId: 'auto', pagination: null }))
    ))

    listLoyaltyCards$ = createRemoteEffect(
        this.actions$,
        LoyaltyCardRemoteActions.list,
        (action) => of(action).pipe(
            withLatestFrom(this.enduserFacade.selectedEnduserId$, this.brandFacade.selectedBrandId$, this.loyaltyCardSchemeFacade.selectedLoyaltyCardSchemeId$),
            switchMap(([action, enduserId, brandId, cardSchemeId]) => {
                return this.loyaltyAPI.listLoyaltyCards(action.parent, action.pagination)
            })
        )
    )

    updateLoyaltyCard$ = createRemoteEffect(
        this.actions$,
        LoyaltyCardRemoteActions.update,
        (action) => this.loyaltyAPI.updateLoyaltyCard(action.loyaltyCardId, action.update)
    )

    deleteLoyaltyCard$ = createRemoteEffect(
        this.actions$,
        LoyaltyCardRemoteActions.delete,
        (action) => this.loyaltyAPI.deleteLoyaltyCard(action.loyaltyCardId, action.force),
        (action) => ({ loyaltyCardId: action.loyaltyCardId })
    )

    ngrxOnInitEffects() {
        return LoyaltyCardLocalActions.initialiseLoyaltyCardState()
    }
}