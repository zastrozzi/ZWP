import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { WebLocationLocalActions, WebLocationRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'WebLocationEffects', options: { skipMethodDebugger: true } })
export class WebLocationEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private locationAPI = inject(Services.LOCATION_API_SERVICE)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...WebLocationRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(WebLocationRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...WebLocationRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(WebLocationRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...WebLocationRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(WebLocationRemoteActions.identifiers)({ error: action.error }))
    ))

    createWebLocation$ = createRemoteEffect(
        this.actions$,
        WebLocationRemoteActions.create,
        (action) => this.locationAPI.createWebLocation({ merchantId: action.merchantId, brandId: action.brandId }, action.request)
    )

    getWebLocation$ = createRemoteEffect(
        this.actions$,
        WebLocationRemoteActions.get,
        (action) => this.locationAPI.getWebLocation(action.webLocationId)
    )

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            WebLocationLocalActions.updateWebLocationFilters, 
            WebLocationLocalActions.resetWebLocationFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => WebLocationRemoteActions.list.request({ merchantId: null, brandId: null, pagination: null }))
    ))

    listWebLocations$ = createRemoteEffect(
        this.actions$,
        WebLocationRemoteActions.list,
        (action) => this.locationAPI.listWebLocations({ merchantId: action.merchantId, brandId: action.brandId }, action.pagination)
    )

    updateWebLocation$ = createRemoteEffect(
        this.actions$,
        WebLocationRemoteActions.update,
        (action) => this.locationAPI.updateWebLocation(action.webLocationId, action.update)
    )

    deleteWebLocation$ = createRemoteEffect(
        this.actions$,
        WebLocationRemoteActions.delete,
        (action) => this.locationAPI.deleteWebLocation(action.webLocationId),
        (action) => ({ webLocationId: action.webLocationId })

    )

    ngrxOnInitEffects() {
        return WebLocationLocalActions.initialiseWebLocationState()
    }
}