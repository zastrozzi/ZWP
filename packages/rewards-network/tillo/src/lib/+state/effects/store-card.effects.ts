import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services';
import { StoreCardLocalActions, StoreCardRemoteActions } from '../actions';
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades';

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'TilloStoreCardEffects', options: { skipMethodDebugger: true }})
export class TilloStoreCardEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private storeCardAPI = inject(Services.STORE_CARD_API_SERVICE)
    private brandFacade = inject(Facades.TilloBrandFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...StoreCardRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(StoreCardRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...StoreCardRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(StoreCardRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() =>  this.actions$.pipe(
        ofType(...StoreCardRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(StoreCardRemoteActions.identifiers)({ error: action.error }))
    ))

    getStoreCard$ = createRemoteEffect(
        this.actions$,
        StoreCardRemoteActions.getStoreCard,
        (action) => this.storeCardAPI.getStoreCard(action.storeCardId)
    )

    selectStoreCard$ = createEffect(() => this.actions$.pipe(
        ofType(StoreCardLocalActions.selectStoreCard),
        map((action) => StoreCardRemoteActions.getStoreCard.request({storeCardId: action.storeCardId}))
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            StoreCardLocalActions.updateStoreCardFilters,
            StoreCardLocalActions.resetStoreCardFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => StoreCardRemoteActions.listStoreCards.request({brandId: null, enduserId: null,  pagination: null}))
    ))

    listStoreCard$ = createRemoteEffect(
        this.actions$,
        StoreCardRemoteActions.listStoreCards,
        (action) => of(action).pipe(
            withLatestFrom(
                this.brandFacade.selectedBrandId$
            ),
            switchMap(([action, brandId]) => {
                return this.storeCardAPI.listStoreCards({
                    brandId: action.brandId === 'auto' ? brandId: action.brandId,
                    enduserId: action.enduserId === 'auto' ? null : action.enduserId
                }, action.pagination, null)
            })
        )  
    )

    
    updateStoreCard$ = createRemoteEffect(
        this.actions$,
        StoreCardRemoteActions.updateStoreCard,
        (action) => this.storeCardAPI.updateStoreCard(action.storeCardId, action.update)
    )

    deleteStoreCard$ = createRemoteEffect(
        this.actions$,
        StoreCardRemoteActions.deleteStoreCard,
        (action) => this.storeCardAPI.deleteStoreCard(action.storeCardId)
    )

    ngrxOnInitEffects() {
        return StoreCardLocalActions.initialiseStoreCardState()
    }
}