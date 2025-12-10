import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services';
import { BrandLocalActions, BrandRemoteActions } from '../actions';
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades';
import { Action } from '@ngrx/store';

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'TilloBrandEffects', options: { skipMethodDebugger: true }})
export class TilloBrandEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private brandAPI = inject(Services.BRAND_API_SERVICE)
    private brandFacade = inject(Facades.TilloBrandFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...BrandRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(BrandRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...BrandRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(BrandRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() =>  this.actions$.pipe(
        ofType(...BrandRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(BrandRemoteActions.identifiers)({ error: action.error }))
    ))

    getBrand$ = createRemoteEffect(
        this.actions$,
        BrandRemoteActions.getBrand,
        (action) => this.brandAPI.getBrand(action.brandId)
    )

    selectBrand$ = createEffect(() => this.actions$.pipe(
        ofType(BrandLocalActions.selectBrand),
        map((action) => BrandRemoteActions.getBrand.request({ brandId: action.brandId}))
    ))

    updateOrResetFilter$ = createEffect(() => this.actions$.pipe(
        ofType(
            BrandLocalActions.updateBrandFilters,
            BrandLocalActions.resetBrandFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => BrandRemoteActions.listBrands.request({ pagination: null}))
    ))

    listBrands$ = createRemoteEffect(
        this.actions$,
        BrandRemoteActions.listBrands,
        (action) => this.brandAPI.listBrands(action.pagination, null)
    )

    restoreBrand$ = createRemoteEffect(
        this.actions$,
        BrandRemoteActions.restoreBrand,
        (action) => this.brandAPI.restoreBrand(action.brandId)
    )

    deleteBrand$ = createRemoteEffect(
        this.actions$,
        BrandRemoteActions.deleteBrand,
        (action) => this.brandAPI.deleteBrand(action.brandId),
        (action) => ({brandId: action.brandId})        
    )

    ngrxOnInitEffects() {
        return BrandLocalActions.initialiseBrandState()
    }


}