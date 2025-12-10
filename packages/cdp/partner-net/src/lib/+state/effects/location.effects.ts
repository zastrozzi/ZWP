import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import {
    ZWPDebuggableInjectable,
    ZWPRouterFacade,
    createRemoteEffect,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteStateUpdateFailure,
} from '@zwp/platform.common'
import { Services } from '../../services'
import { LocationLocalActions, LocationRemoteActions } from '../actions'
import { of, debounceTime, map, withLatestFrom, switchMap, filter } from 'rxjs'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetLocationEffects', options: { skipMethodDebugger: true } })
export class PartnerNetLocationEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private locationAPI = inject(Services.LOCATION_API_SERVICE)
    private locationFacade = inject(Facades.PartnerNetLocationFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...LocationRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(LocationRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...LocationRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(LocationRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...LocationRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(LocationRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects - trigger list when filters update or reset and immediate remote fetch is requested
    updateOrResetFilters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LocationLocalActions.updateLocationFilters, LocationLocalActions.resetLocationFilters),
            filter((action) => action.triggerRemoteFetch),
            debounceTime(200),
            map(() => LocationRemoteActions.list.request({ pagination: null }))
        )
    )

    // Remote Action CRUD Effects
    createLocation$ = createRemoteEffect(this.actions$, LocationRemoteActions.create, (action) =>
        this.locationAPI.createLocation(action.parentId, action.parentType, action.request)
    )

    getLocation$ = createRemoteEffect(this.actions$, LocationRemoteActions.get, (action) =>
        this.locationAPI.getLocation(action.locationId)
    )

    listLocations$ = createRemoteEffect(this.actions$, LocationRemoteActions.list, (action) => of(action).pipe(
        
            withLatestFrom(this.locationFacade.locationFilters$),
            switchMap(([requestAction, filters]) =>
                this.locationAPI.listLocations(
                    requestAction.parentId,
                    requestAction.parentType,
                    requestAction.pagination,
                    filters
                )
            )
        )
    )

    updateLocation$ = createRemoteEffect(this.actions$, LocationRemoteActions.update, (action) =>
        this.locationAPI.updateLocation(action.locationId, action.update)
    )

    deleteLocation$ = createRemoteEffect(this.actions$, LocationRemoteActions.delete, (action) =>
        this.locationAPI.deleteLocation(action.locationId, action.force)
    )

    ngrxOnInitEffects() {
        return LocationLocalActions.initialiseLocationState()
    }
}
