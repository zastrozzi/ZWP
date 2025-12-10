import { Action, ActionCreator, ActionCreatorProps, createAction, on, props, ReducerTypes } from "@ngrx/store"
import { createActionType } from "./ngrx.common-utils"
import { BaseRemoteFeatureState } from "./ngrx.remote-state"

export interface RemoteActionGroup<RequestAction extends ActionCreator, SuccessAction extends ActionCreator, FailureAction extends ActionCreator> {
    request: RequestAction
    success: SuccessAction
    failure: FailureAction
}

export interface TypedRemoteAction<T extends string> extends Action {
    readonly type: T;
}

export interface RemoteFailureAction {
    error: unknown
}

export interface RemoteSuccessAction<Response> {
    response: Response
}

export interface UpdateRemoteFilters<Filters> {
    filters: Partial<Filters>
    triggerRemoteFetch: boolean
}

export type UpdateRemoteFiltersWithContext<Filters, Context> = UpdateRemoteFilters<Filters> & { context: Context }

export interface ResetRemoteFilters {
    triggerRemoteFetch: boolean
}

export type ResetRemoteFiltersWithContext<Context> = ResetRemoteFilters & { context: Context }

export type RemoteActionMap = {
    requestActions: ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>[],
    successActions: ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>[],
    failureActions: ActionCreator<string, (props: RemoteFailureAction) => RemoteFailureAction & TypedRemoteAction<string>>[],
    identifiers: string[]
}

const arraysAreNotAllowedMsg = 'action creator cannot return an array'
type RemoteArraysAreNotAllowed = typeof arraysAreNotAllowedMsg

const typePropertyIsNotAllowedMsg = 'action creator cannot return an object with a property named `type`'
type RemoteTypePropertyIsNotAllowed = typeof typePropertyIsNotAllowedMsg

const emptyObjectsAreNotAllowedMsg = 'action creator cannot return an empty object'
type RemoteEmptyObjectsAreNotAllowed = typeof emptyObjectsAreNotAllowedMsg

type RemoteNotAllowedCheck<T extends object> = T extends any[]
    ? RemoteArraysAreNotAllowed
    : T extends { type: any }
    ? RemoteTypePropertyIsNotAllowed
    : keyof T extends never
    ? RemoteEmptyObjectsAreNotAllowed
    : unknown


export function onRemoteRequestActions<State extends BaseRemoteFeatureState, RemoteRequestActions extends readonly ActionCreator[]>(
    remoteRequestActions: RemoteRequestActions
): ReducerTypes<State, RemoteRequestActions> {
    const internalReducer = (state: State) => ({ ...state, apiIsBusy: true, error: null }) as any
    return on(...remoteRequestActions, (state: any) => internalReducer(state))
}

export function onRemoteFailureActions<State extends BaseRemoteFeatureState, FailureActions extends readonly ActionCreator[]>(
    failureActions: FailureActions
): ReducerTypes<State, FailureActions> {
    const internalReducer = (state: State, error: any) => ({ ...state, apiIsBusy: false, loaded: false, error: error?.error?.message?.reason ?? `${error}` }) as any
    // const reducer: OnReducer<State, FailureActions, State, State> = (state, action) => ({...state, apiIsBusy: false, loaded: false, error: (action as unknown as RemoteFailureAction).error?.error?.message?.reason ?? `${(action as unknown as RemoteFailureAction).error}` })
    return on(...failureActions, (state: any, { error }: any) => internalReducer(state, error))
}

export const createRemoteActionGroup = <RequestProps extends object, SuccessProps extends object>(actionName: string, ...actionCat: string[]) => {
    const REQUEST = createActionType([...actionCat, 'REQUEST'], actionName)
    const SUCCESS = createActionType([...actionCat, 'SUCCESS'], actionName)
    const FAILURE = createActionType([...actionCat, 'FAILURE'], actionName)
    const request = createAction<string, RequestProps>(REQUEST, props<any>() as ActionCreatorProps<RequestProps> & RemoteNotAllowedCheck<RequestProps>)
    const success = createAction<string, SuccessProps & RemoteSuccessAction<SuccessProps>>(SUCCESS, props<any>() as ActionCreatorProps<SuccessProps & RemoteSuccessAction<SuccessProps>> & RemoteNotAllowedCheck<SuccessProps & RemoteSuccessAction<SuccessProps>>)
    const failure = createAction(FAILURE, props<RemoteFailureAction>())
    return { request, success, failure }
}

type RemoteActionGroupArray = Array<
    RemoteActionGroup<
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: RemoteFailureAction) => RemoteFailureAction & TypedRemoteAction<string>>
    >
>

// export function extractRemoteFailureActions(
//     remoteActionGroups: RemoteActionGroupArray
// ): ActionCreator<string, (props: RemoteFailureAction) => RemoteFailureAction & TypedRemoteAction<string>>[] {
//     return remoteActionGroups.map((group) => group.failure)
// }


// export function extractRemoteRequestActions(
//     remoteActionGroups: RemoteActionGroupArray
// ): ActionCreator<string, (props: RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>[] {
//     return remoteActionGroups.map((group) => group.request)
// }

export interface RemoteActionGroupMap {
    [groupName: string]: RemoteActionGroup<
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: RemoteFailureAction) => RemoteFailureAction & TypedRemoteAction<string>>
    >
}

export interface RemoteActionGroupCRUDMap extends RemoteActionGroupMap {
    create: RemoteActionGroup<
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: RemoteFailureAction) => RemoteFailureAction & TypedRemoteAction<string>>
    >
    get: RemoteActionGroup<
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: RemoteFailureAction) => RemoteFailureAction & TypedRemoteAction<string>>
    >
    list: RemoteActionGroup<
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: RemoteFailureAction) => RemoteFailureAction & TypedRemoteAction<string>>
    >
    update: RemoteActionGroup<
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: RemoteFailureAction) => RemoteFailureAction & TypedRemoteAction<string>>
    >
    delete: RemoteActionGroup<
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: any & RemoteNotAllowedCheck<object>) => object & TypedRemoteAction<string>>, 
        ActionCreator<string, (props: RemoteFailureAction) => RemoteFailureAction & TypedRemoteAction<string>>
    >
}

export const extractRemoteRequestActions = (remoteActionGroups: RemoteActionGroupArray) => remoteActionGroups.map((group) => group.request)
export const extractRemoteFailureActions = (remoteActionGroups: RemoteActionGroupArray) => remoteActionGroups.map((group) => group.failure)
export const extractRemoteSuccessActions = (remoteActionGroups: RemoteActionGroupArray) => remoteActionGroups.map((group) => group.success)

export const createRemoteActionMap = <T extends RemoteActionGroupMap>(actionIdentifiers: string[], actions: T): RemoteActionGroupMap & RemoteActionMap & T => {
    const actionGroups = Object.values(actions)
    const requestActions = extractRemoteRequestActions(actionGroups)
    const failureActions = extractRemoteFailureActions(actionGroups)
    const successActions = extractRemoteSuccessActions(actionGroups)
    return { requestActions, failureActions, successActions, identifiers: actionIdentifiers, ...actions }
}

export const createRemoteActionCRUDMap = <T extends RemoteActionGroupCRUDMap>(actionIdentifiers: string[], actions: T): RemoteActionGroupCRUDMap & RemoteActionMap & T => {
    const actionGroups = Object.values(actions)
    const requestActions = extractRemoteRequestActions(actionGroups)
    const failureActions = extractRemoteFailureActions(actionGroups)
    const successActions = extractRemoteSuccessActions(actionGroups)
    return { requestActions, failureActions, successActions, identifiers: actionIdentifiers, ...actions }
}

export const remoteStateUpdateSuccess = (actionIdentifiers: string[]) => createAction(createActionType([...actionIdentifiers, 'SUCCESS'], 'Update Remote State'))
export const remoteStateUpdateRequest = (actionIdentifiers: string[]) => createAction(createActionType([...actionIdentifiers, 'REQUEST'], 'Update Remote State'))
export const remoteStateUpdateFailure = (actionIdentifiers: string[]) => createAction(createActionType([...actionIdentifiers, 'FAILURE'], 'Update Remote State'), props<{ error: any }>())