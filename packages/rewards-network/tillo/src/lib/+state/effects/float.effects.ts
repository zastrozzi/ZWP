import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services';
import { FloatLocalActions, FloatRemoteActions } from '../actions';
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Facades } from '../facades';
import { Action } from '@ngrx/store';

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'TilloFloatEffects', options: { skipMethodDebugger: true }})
export class TilloFloatEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private floatsAPI = inject(Services.FLOAT_API_SERVICE)
    private floatsFacade = inject(Facades.TilloFloatFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...FloatRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(FloatRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...FloatRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(FloatRemoteActions.identifiers)())
    ))

   updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...FloatRemoteActions.failureActions),
        map((actions) => remoteStateUpdateFailure(FloatRemoteActions.identifiers)({error: actions.error}))
    ))

    getFloats$ = createRemoteEffect(
        this.actions$,
        FloatRemoteActions.getFloat,
        (action) => this.floatsAPI.getFloat(action.floatId)
    )

    selectFloat$ = createEffect(() => this.actions$.pipe(
        ofType(FloatLocalActions.selectFloat),
        map((action) => FloatRemoteActions.getFloat.request({floatId: action.floatId}))
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            FloatLocalActions.updateFloatFilters,
            FloatLocalActions.resetFloatFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => FloatRemoteActions.listFloats.request({ pagination: null}))
    ))

    listFloats$ = createRemoteEffect(
        this.actions$,
        FloatRemoteActions.listFloats,
        (action) => this.floatsAPI.listFloats(action.pagination, null)
    )

    deleteFloat$ = createRemoteEffect(
        this.actions$,
        FloatRemoteActions.deleteFloat,
        (action) => this.floatsAPI.deleteFloat(action.floatId)
    )

    ngrxOnInitEffects() {
        return FloatLocalActions.initialiseFloatState()
    }
}