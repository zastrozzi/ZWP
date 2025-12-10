import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services';
import { DigitalCodeLocalActions, DigitalCodeRemoteActions } from '../actions';
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Facades } from '../facades';

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'TilloDigitalCodeEffects', options: {skipMethodDebugger: true}})
export class TilloDigitalCodeEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private digitalCodeAPI = inject(Services.DIGITAL_CODE_API_SERVICE)
    private digitalCodeFacade = inject(Facades.TilloDigitalCodeFacade)

    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...DigitalCodeRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(DigitalCodeRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...DigitalCodeRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(DigitalCodeRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...DigitalCodeRemoteActions.failureActions),
        map((actions) => remoteStateUpdateFailure(DigitalCodeRemoteActions.identifiers)({error: actions.error}))
    ))

    getDigitalCode$ = createRemoteEffect(
        this.actions$,
        DigitalCodeRemoteActions.getDigitalCode,
        (action) => this.digitalCodeAPI.getDigitalCode(action.digitalCodeId)
    )

    selectDigtialCode$ = createEffect(() => this.actions$.pipe(
        ofType(DigitalCodeLocalActions.selectDigitalCode),
        map((action) => DigitalCodeRemoteActions.getDigitalCode.request({digitalCodeId: action.digitalCodeId}))
    ))

    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            DigitalCodeLocalActions.updateDigitalCodeFilters,
            DigitalCodeLocalActions.resetDigitalCodeFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => DigitalCodeRemoteActions.listDigitalCodes.request({digitalCodeId: 'auto', pagination: null}))
    ))

    listDigitalCode$ = createRemoteEffect(
        this.actions$,
        DigitalCodeRemoteActions.listDigitalCodes,
        (action) =>
            action.digitalCodeId === 'auto' ? this.digitalCodeFacade.selectedDigitialCodeId$.pipe(
                switchMap((digitalCodeId) => this.digitalCodeAPI.listDigitalCodes(digitalCodeId, action.pagination, null))
            ) : this.digitalCodeAPI.listDigitalCodes(action.digitalCodeId, action.pagination, null)   
    )

    topupDigitalCode$ = createRemoteEffect(
        this.actions$,
        DigitalCodeRemoteActions.topupDigitalCode,
        (action) => this.digitalCodeAPI.topupDigitalCode(action.digitalCodeId)
    )
    
    cancelDigitalCode$ = createRemoteEffect(
        this.actions$,
        DigitalCodeRemoteActions.cancelDigitalCode,
        (action) => this.digitalCodeAPI.cancelDigitalCode(action.digitalCodeId)
    )

    deleteDigitalCode$ = createRemoteEffect(
        this.actions$,
        DigitalCodeRemoteActions.deleteDigitalCode,
        (action) => this.digitalCodeAPI.deleteDigitalCode(action.digitalCodeId)
    )

    ngrxOnInitEffects() {
        return DigitalCodeLocalActions.initialiseDigitalCodeState()
    }
}

