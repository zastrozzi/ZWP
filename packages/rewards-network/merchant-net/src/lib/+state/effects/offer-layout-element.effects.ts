import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { OfferLayoutElementLocalActions, OfferLayoutElementRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'OfferLayoutElementEffects', options: { skipMethodDebugger: true } })
export class OfferLayoutElementEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private offerAPI = inject(Services.OFFER_API_SERVICE)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...OfferLayoutElementRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(OfferLayoutElementRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...OfferLayoutElementRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(OfferLayoutElementRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...OfferLayoutElementRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(OfferLayoutElementRemoteActions.identifiers)({ error: action.error }))
    ))

    createOfferLayoutElement$ = createRemoteEffect(
        this.actions$,
        OfferLayoutElementRemoteActions.create,
        (action) => this.offerAPI.createOfferLayoutElement(action.offerLayoutId, action.request)
    )

    getOfferLayoutElement$ = createRemoteEffect(
        this.actions$,
        OfferLayoutElementRemoteActions.get,
        (action) => this.offerAPI.getOfferLayoutElement(action.offerLayoutElementId)
    )

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            OfferLayoutElementLocalActions.updateOfferLayoutElementFilters, 
            OfferLayoutElementLocalActions.resetOfferLayoutElementFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => OfferLayoutElementRemoteActions.list.request({ offerLayoutId: null, pagination: null }))
    ))

    listOfferLayoutElements$ = createRemoteEffect(
        this.actions$,
        OfferLayoutElementRemoteActions.list,
        (action) => this.offerAPI.listOfferLayoutElements(action.offerLayoutId, action.pagination)
    )

    updateOfferLayoutElement$ = createRemoteEffect(
        this.actions$,
        OfferLayoutElementRemoteActions.update,
        (action) => this.offerAPI.updateOfferLayoutElement(action.offerLayoutElementId, action.update)
    )

    deleteOfferLayoutElement$ = createRemoteEffect(
        this.actions$,
        OfferLayoutElementRemoteActions.delete,
        (action) => this.offerAPI.deleteOfferLayoutElement(action.offerLayoutElementId),
        (action) => ({ offerLayoutElementId: action.offerLayoutElementId })

    )

    ngrxOnInitEffects() {
        return OfferLayoutElementLocalActions.initialiseOfferLayoutElementState()
    }
}