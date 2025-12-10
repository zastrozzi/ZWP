import { Action } from "@ngrx/store"

export type HistoryStoreActionMap = {
    [featureName: string]: Array<Action> | undefined
}