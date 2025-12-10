import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Action, ActionCreator } from "@ngrx/store"
import { catchError, map, mergeMap, Observable, of, switchMap } from "rxjs"
import { RemoteActionGroup } from "./ngrx.remote-actions"

export const createRemoteEffect = <
    RemoteRequestAction extends ActionCreator,
    RemoteSuccessAction extends ActionCreator,
    RemoteFailureAction extends ActionCreator
>(
    actions: Actions<Action>,
    actionGroup: RemoteActionGroup<RemoteRequestAction, RemoteSuccessAction, RemoteFailureAction>,
    remoteCall: (requestAction: ReturnType<RemoteRequestAction>) => Observable<any>,
    successAdditions: (requestAction: ReturnType<RemoteRequestAction>) => any = () => { return }
) => createEffect(() => actions.pipe(
        ofType(actionGroup.request),
        mergeMap((action) => remoteCall({...action, type: undefined}).pipe(
            map((response) => actionGroup.success({ ...successAdditions(action), response: response }) as any),
            catchError((error: Error) => of(actionGroup.failure({ error: error.message })) as Observable<Action>)
        ))
    )
) 

