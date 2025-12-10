import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { OfferLayoutLocalActions, OfferLayoutRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'OfferLayoutEffects', options: { skipMethodDebugger: true } })
export class OfferLayoutEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private offerAPI = inject(Services.OFFER_API_SERVICE)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...OfferLayoutRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(OfferLayoutRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...OfferLayoutRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(OfferLayoutRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...OfferLayoutRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(OfferLayoutRemoteActions.identifiers)({ error: action.error }))
    ))

    createOfferLayout$ = createRemoteEffect(
        this.actions$,
        OfferLayoutRemoteActions.create,
        (action) => this.offerAPI.createOfferLayout(action.offerId, action.request)
    )

    getOfferLayout$ = createRemoteEffect(
        this.actions$,
        OfferLayoutRemoteActions.get,
        (action) => this.offerAPI.getOfferLayout(action.offerLayoutId)
    )

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            OfferLayoutLocalActions.updateOfferLayoutFilters, 
            OfferLayoutLocalActions.resetOfferLayoutFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => OfferLayoutRemoteActions.list.request({ offerId: null, pagination: null }))
    ))

    listOfferLayouts$ = createRemoteEffect(
        this.actions$,
        OfferLayoutRemoteActions.list,
        (action) => this.offerAPI.listOfferLayouts(action.offerId, action.pagination)
    )

    updateOfferLayout$ = createRemoteEffect(
        this.actions$,
        OfferLayoutRemoteActions.update,
        (action) => this.offerAPI.updateOfferLayout(action.offerLayoutId, action.update)
    )

    deleteOfferLayout$ = createRemoteEffect(
        this.actions$,
        OfferLayoutRemoteActions.delete,
        (action) => this.offerAPI.deleteOfferLayout(action.offerLayoutId),
        (action) => ({ offerLayoutId: action.offerLayoutId })

    )

    ngrxOnInitEffects() {
        return OfferLayoutLocalActions.initialiseOfferLayoutState()
    }
}