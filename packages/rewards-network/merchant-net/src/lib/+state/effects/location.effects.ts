import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { LocationLocalActions, LocationRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'LocationEffects', options: { skipMethodDebugger: true } })
export class LocationEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private locationAPI = inject(Services.LOCATION_API_SERVICE)
    private merchantFacade = inject(Facades.MerchantFacade)
    private brandFacade = inject(Facades.BrandFacade)
    private routerFacade = inject(ZWPRouterFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...LocationRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(LocationRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...LocationRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(LocationRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...LocationRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(LocationRemoteActions.identifiers)({ error: action.error }))
    ))

    createLocation$ = createRemoteEffect(
        this.actions$,
        LocationRemoteActions.create,
        (action) => this.locationAPI.createLocation({ merchantId: action.merchantId, brandId: action.brandId }, action.request)
    )

    getLocation$ = createRemoteEffect(
        this.actions$,
        LocationRemoteActions.get,
        (action) => this.locationAPI.getLocation(action.locationId)
    )

    selectLocation$ = createEffect(() => this.actions$.pipe(
        ofType(LocationLocalActions.selectLocation),
        map((action) => LocationRemoteActions.get.request({ locationId: action.locationId }))
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            LocationLocalActions.updateLocationFilters, 
            LocationLocalActions.resetLocationFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => LocationRemoteActions.list.request({ merchantId: 'auto', brandId: 'auto', pagination: null }))
    ))

    listLocations$ = createRemoteEffect(
        this.actions$,
        LocationRemoteActions.list,
        (action) => of(action).pipe(
            withLatestFrom(
                this.brandFacade.selectedBrandId$,
                this.merchantFacade.selectedMerchantId$
            ),
            switchMap(([action, brandId, merchantId]) => {
                return this.locationAPI.listLocations({ 
                    brandId: action.brandId === 'auto' ? brandId : action.brandId, 
                    merchantId: action.merchantId === 'auto' ? merchantId : action.merchantId
                }, action.pagination)
            })
        )
    )

    updateLocation$ = createRemoteEffect(
        this.actions$,
        LocationRemoteActions.update,
        (action) => this.locationAPI.updateLocation(action.locationId, action.update)
    )

    deleteLocation$ = createRemoteEffect(
        this.actions$,
        LocationRemoteActions.delete,
        (action) => this.locationAPI.deleteLocation(action.locationId),
        (action) => ({ locationId: action.locationId })
    )

    deleteLocationRoute$ = createEffect(() => this.actions$.pipe(
        ofType(LocationRemoteActions.delete.success),
        map(() => this.routerFacade.navigate(['/merchant-net/locations']))
    ), { dispatch: false })

    createLocationRoute$ = createEffect(() => this.actions$.pipe(
        ofType(LocationRemoteActions.create.success),
        map((action) => this.routerFacade.navigate(['/merchant-net/locations', action.response.id]))
    ), { dispatch: false })

    

    ngrxOnInitEffects() {
        return LocationLocalActions.initialiseLocationState()
    }
}