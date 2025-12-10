import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { MerchantLocalActions, MerchantRemoteActions } from '../actions/merchant.actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TinkMerchantEffects', options: { skipMethodDebugger: true } })
export class TinkMerchantEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private merchantAPI = inject(Services.TINK_MERCHANT_API_SERVICE)
    private merchantFacade = inject(Facades.TinkMerchantFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...MerchantRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(MerchantRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...MerchantRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(MerchantRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...MerchantRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(MerchantRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            MerchantLocalActions.updateMerchantFilters, 
            MerchantLocalActions.resetMerchantFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => MerchantRemoteActions.listMerchants.request({ pagination: null }))
    ))

    selectMerchant$ = createEffect(() => this.actions$.pipe(
        ofType(MerchantLocalActions.selectMerchant),
        map((action) => MerchantRemoteActions.getMerchant.request({ merchantId: action.merchantId }))
    ))

    createMerchant$ = createRemoteEffect(this.actions$, MerchantRemoteActions.createMerchant, (action) =>
        this.merchantAPI.createMerchant(action.request)
    )

    getMerchant$ = createRemoteEffect(this.actions$, MerchantRemoteActions.getMerchant, (action) =>
        this.merchantAPI.getMerchant(action.merchantId)
    )

    listMerchants$ = createRemoteEffect(this.actions$, MerchantRemoteActions.listMerchants, (action) =>
        of(action).pipe(
            withLatestFrom(this.merchantFacade.merchantFilters$),
            mergeMap(([action, filters]) => this.merchantAPI.listMerchants(action.pagination, filters))
        )
    )

    deleteMerchant$ = createRemoteEffect(
        this.actions$, 
        MerchantRemoteActions.deleteMerchant, 
        (action) => this.merchantAPI.deleteMerchant(action.merchantId),
        (action) => ({ merchantId: action.merchantId })
    )

    refreshMerchants$ = createRemoteEffect(
        this.actions$, 
        MerchantRemoteActions.refreshMerchants, 
        (action) => this.merchantAPI.refreshMerchants(action.limit),
        (action) => ({ limit: action.limit })
    )

    ngrxOnInitEffects() {
        return MerchantLocalActions.initialiseMerchantState()
    }
}