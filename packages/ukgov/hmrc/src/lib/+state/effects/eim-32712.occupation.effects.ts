import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { EIM32712OccupationLocalActions, EIM32712OccupationRemoteActions } from '../actions'
import { debounceTime, map } from 'rxjs'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EIM32712OccupationEffects', options: { skipMethodDebugger: true } })
export class EIM32712OccupationEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private eim32712API = inject(Services.EIM32712_API_SERVICE)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...EIM32712OccupationRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(EIM32712OccupationRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...EIM32712OccupationRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(EIM32712OccupationRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...EIM32712OccupationRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(EIM32712OccupationRemoteActions.identifiers)({ error: action.error }))
    ))

    createOccupation$ = createRemoteEffect(
        this.actions$,
        EIM32712OccupationRemoteActions.createEIM32712Occupation,
        (action) => this.eim32712API.createEIM32712Occupation(action)
    )

    getOccupation$ = createRemoteEffect(
        this.actions$,
        EIM32712OccupationRemoteActions.getEIM32712Occupation,
        (action) => this.eim32712API.getEIM32712Occupation(action.occupationId)
    )

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            EIM32712OccupationLocalActions.updateEIM32712OccupationFilters, 
            EIM32712OccupationLocalActions.resetEIM32712OccupationFilters,
            EIM32712OccupationLocalActions.addEIM327120OccupationFiltersIndustryInValue,
            EIM32712OccupationLocalActions.removeEIM327120OccupationFiltersIndustryInValue
        ),
        debounceTime(200),
        map(() => EIM32712OccupationRemoteActions.listEIM32712Occupations.request({ pagination: null }))
    ))

    listOccupations$ = createRemoteEffect(
        this.actions$,
        EIM32712OccupationRemoteActions.listEIM32712Occupations,
        (action) => this.eim32712API.listEIM32712Occupations(action.pagination)
    )

    updateOccupation$ = createRemoteEffect(
        this.actions$,
        EIM32712OccupationRemoteActions.updateEIM32712Occupation,
        (action) => this.eim32712API.updateEIM32712Occupation(action.occupationId, action.request)
    )

    deleteOccupation$ = createRemoteEffect(
        this.actions$,
        EIM32712OccupationRemoteActions.deleteEIM32712Occupation,
        (action) => this.eim32712API.deleteEIM32712Occupation(action.occupationId),
        (action) => ({ occupationId: action.occupationId })

    )

    ngrxOnInitEffects() {
        return EIM32712OccupationLocalActions.initialiseEIM32712OccupationState()
    }
}