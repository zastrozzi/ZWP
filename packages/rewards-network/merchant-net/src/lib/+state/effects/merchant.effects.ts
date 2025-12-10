import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { MerchantLocalActions, MerchantRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'MerchantEffects', options: { skipMethodDebugger: true } })
export class MerchantEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private merchantFacade = inject(Facades.MerchantFacade)
    private merchantAPI = inject(Services.MERCHANT_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)

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

    createMerchant$ = createRemoteEffect(
        this.actions$,
        MerchantRemoteActions.create,
        (action) => this.merchantAPI.createMerchant(action.request)
    )

    getMerchant$ = createRemoteEffect(
        this.actions$,
        MerchantRemoteActions.get,
        (action) => this.merchantAPI.getMerchant(action.merchantId)
    )

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            MerchantLocalActions.updateMerchantFilters, 
            MerchantLocalActions.resetMerchantFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => MerchantRemoteActions.list.request({ pagination: null }))
    ))

    selectMerchant$ = createEffect(() => this.actions$.pipe(
        ofType(MerchantLocalActions.selectMerchant),
        map((action) => MerchantRemoteActions.get.request({ merchantId: action.merchantId }))
    ))

    listMerchants$ = createRemoteEffect(
        this.actions$,
        MerchantRemoteActions.list,
        (action) => of(action).pipe(
            withLatestFrom(this.merchantFacade.merchantFilters$),
            switchMap(([action, filters]) => {
                return this.merchantAPI.listMerchants(action.pagination, filters)
            })
        )
    )

    updateMerchant$ = createRemoteEffect(
        this.actions$,
        MerchantRemoteActions.update,
        (action) => this.merchantAPI.updateMerchant(action.merchantId, action.update)
    )

    deleteMerchant$ = createRemoteEffect(
        this.actions$,
        MerchantRemoteActions.delete,
        (action) => this.merchantAPI.deleteMerchant(action.merchantId),
        (action) => ({ merchantId: action.merchantId })
    )

    deleteMerchantRoute$ = createEffect(() => this.actions$.pipe(
        ofType(MerchantRemoteActions.delete.success),
        map(() => this.routerFacade.navigate(['/merchant-net/merchants']))
    ), { dispatch: false })

    createMerchantRoute$ = createEffect(() => this.actions$.pipe(
        ofType(MerchantRemoteActions.create.success),
        map((action) => this.routerFacade.navigate(['/merchant-net/merchants', action.response.id]))
    ), { dispatch: false })

    ngrxOnInitEffects() {
        return MerchantLocalActions.initialiseMerchantState()
    }
}