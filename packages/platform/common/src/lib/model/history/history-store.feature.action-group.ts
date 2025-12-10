import { Action } from "@ngrx/store"

export interface HistoryStoreFeatureActionGroup {
    featureName: string
    actions: Array<Action>
}

